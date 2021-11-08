import fs from 'fs';
import zip from 'node-zip'
import sqlite3 from 'sqlite3';

import { open } from 'sqlite';

import { isReadableFile } from './file_utils';

/**
 * Unpackages an Anki APKG files and convert it to JSON.
 * 
 * This method is adapted from CraigglesO's implementation under the ISC license.
 * See: https://github.com/CraigglesO/anki-to-json.
 * 
 * I have changed it to use the await/async syntax and the sqlite library.
 */
const convertAnkiToJson = async (inputFile, outputDir) => {

    // Validate our data
    if (!inputFile) {
        throw new Error('An input file must be specified!');
    }

    // Get the file name
    const name = inputFile.split('/').pop().split('.')[0];
    const dir = (outputDir) ? outputDir : './' + name;

    // Create our output directory if necessary
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
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

    // Write this database
    fs.writeFileSync(dir + '/collection.anki2', ankiCollection._data, {
        encoding: 'binary'
    });

    // Open this database
    const ankiDatabase = await open({
        filename: dir + '/collection.anki2',
        driver: sqlite3.Database
    });
    
    // Get our results
    const res = await ankiDatabase.all('SELECT id, flds, sfld FROM notes');
    const notes = res.map(value => {
        
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
        return note;
    });
    
    // Remove our dictionary
    fs.rmSync(dir + '/collection.anki2');

    return '';
}

export const readAnkiJson = async (ankiFilePath, outputPath) => {

    if (!isReadableFile(ankiFilePath)) {
        console.error(`Unable to read the Anki file ${ankiFilePath}`);
        return null;
    }

    if (!ankiFilePath.endsWith('.apkg')) {
        console.error(`The file ${ankiFilePath} is not a valid Anki APKG file`);
        return null;
    }

    const json = await convertAnkiToJson(ankiFilePath, outputPath);
    return '{}';
}
