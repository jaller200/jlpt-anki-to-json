import { readAnkiNotes } from './anki_utils';
import { isReadableFile, isWritableDirectory, writeJsonFile } from './file_utils';

/**
 * Reads the Kanji notes.
 * 
 * @param {string} filePath The file path
 * @returns {Promise} An array of kanji notes
 */
const readKanjiNotes = async (filePath) => {
  try {
    if (!isReadableFile) {
      console.warn(`Unable to read file ${filePath}`);
      return [];
    }

    return await readAnkiNotes(filePath);
  }
  catch {
    console.error(`An error occurred reading file ${filePath}`);
    return [];
  }
}

/**
 * Generates the JLPT kanji list.
 * 
 * @param {string} outputDir The output directory
 * @param {string} kanjiAnkiDir The directory with the Anki files
 */
export const generateKanjiList = async (outputDir, kanjiAnkiDir) => {

  // Create our Kanji list
  const kanjiList = new Map();

  // Our files should have the format `n<level>-kanji.apkg`.
  (await readKanjiNotes(kanjiAnkiDir + '/n5-kanji.apkg')).forEach(note => kanjiList[note.front] = 5);
  (await readKanjiNotes(kanjiAnkiDir + '/n4-kanji.apkg')).forEach(note => kanjiList[note.front] = 4);
  (await readKanjiNotes(kanjiAnkiDir + '/n3-kanji.apkg')).forEach(note => kanjiList[note.front] = 3);
  (await readKanjiNotes(kanjiAnkiDir + '/n2-kanji.apkg')).forEach(note => kanjiList[note.front] = 2);
  (await readKanjiNotes(kanjiAnkiDir + '/n1-kanji.apkg')).forEach(note => kanjiList[note.front] = 1);

  if (isWritableDirectory(outputDir)) {
    writeJsonFile(outputDir + '/jlpt-kanji.json', {
      kanji: kanjiList
    });
  }
  else {
    console.error(`The output directory ${outputDir} is not writable!`);
  }
}