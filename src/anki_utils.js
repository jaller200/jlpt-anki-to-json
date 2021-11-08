import fs from 'fs';
import zip from 'node-zip'
import os from 'os';
import sqlite3 from 'sqlite3';

import * as sqlite from 'sqlite';

/**
 * Unpackages an Anki APKG files and convert it to JSON.
 * 
 * This method is adapted from CraigglesO's implementation under the ISC license.
 * See: https://github.com/CraigglesO/anki-to-json.
 * 
 * I have changed it to use the await/async syntax and the sqlite library, as well
 * as to ignore the media files since they aren't super useful here.
 * 
 * @async
 * @param {string} inputFile The input file
 * @returns {Promise} The Anki notes as JSON
 */
export const readAnkiNotes = async (inputFile) => {

    // Create our notes array
    const notes = [];

    // Validate that this actually an APKG file
    if (!inputFile.endsWith('.apkg')) {
        throw new Error(`The file ${ankiFilePath} is not a valid Anki APKG file`);
    }

    // Read our ZIP file
    const zipFile = new zip(fs.readFileSync(inputFile), {
        base64: false,
        checkCRC32: true
    });

    // Make sure we have the data
    const ankiCollection = zipFile.files['collection.anki2'];
    if (!ankiCollection) {
        throw new Error('Unable to read the Anki database');
    }

    // Get our file name
    const tmpDir = os.tmpdir();
    const databaseFile = tmpDir + '/collection.anki2';

    // Write this database
    fs.writeFileSync(databaseFile, ankiCollection._data, {
        encoding: 'binary'
    });

    // Open this database
    const ankiDatabase = await sqlite.open({
        filename: databaseFile,
        driver: sqlite3.Database
    });
    
    // Get our results
    const res = await ankiDatabase.all('SELECT id, flds, sfld FROM notes');
    if (res) {
        res.forEach(value => {
            
            // Replace some characters
            const note = {...value};
            note.front = note.sfld.replace(/\u001f/g, '\n').replace('<div>', '\n').replace('<br>', '\n').replace(/<(?:.|\n)*?>/gm, '');
            note.back = note.flds.replace(/\u001f/g, '\n').replace('<div>', '\n').replace('<br>', '\n').replace(/<(?:.|\n)*?>/gm, '');

            // Get our open and closed bracket indices for the front
            const openBracketIndices = [];
            const closedBrackedIndices = [];
            for (let i = 0; i < note.front.length; ++i) {
                if (note.front[i] === '[') openBracketIndices.push(i);
                if (note.front[i] === ']') closedBrackedIndices.push(i);
            }

            while (openBracketIndices.length) {
                const start = openBracketIndices.shift();
                const end = closedBrackedIndices.shift();
                const bracketString = note.front.slice(start + 1, end);
                if (bracketString.includes(':')) {
                    note.front = note.front.slice(0, start) + note.front.slice(end + 1);
                }
            }

            // Get our open and closed bracket indices for the back
            for (let i = 0; i < note.back.length; ++i) {
                if (note.back[i] === '[') openBracketIndices.push(i);
                if (note.back[i] === ']') closedBrackedIndices.push(i);
            }

            while (openBracketIndices.length) {
                const start = openBracketIndices.shift();
                const end = closedBrackedIndices.shift();
                const bracketString = note.back.slice(start + 1, end);
                if (bracketString.includes(':')) {
                    note.back = note.back.slice(0, start) + note.back.slice(end + 1);
                }
            }

            note.front = note.front.trim();
            note.back = note.back.trim()
            notes.push(note);
        });
    }
    
    // Remove our dictionary
    fs.rmSync(databaseFile);
    return notes;
}