import { readAnkiNotes } from './anki_utils';
import { isReadableFile, isWritableDirectory, writeJsonFile } from './file_utils';

/**
 * Reads the Kanji notes.
 * 
 * @param {string} filePath The file path
 * @returns {Promise} An array of kanji notes
 */
const readNotes = async (filePath) => {
  try {
    return await readAnkiNotes(filePath);
  }
  catch {
    console.error(`Unable to read the file ${filePath}`);
    return [];
  }
}

/**
 * Generates the JLPT kanji list.
 * 
 * @param {string} outputDir The output directory
 * @param {string} ankiDir The directory with the Anki files
 */
export const generateJson = async (ankiDir, options) => {

  // Get our output directory
  const outputDir = options['outputDir'];
  const prettyPrint = !!options['prettyPrint'];

  // Create our Kanji list
  const kanjiList = new Map();
  const vocabList = new Map();

  const setLevel = (list, key, level) => {
    if (list.has(key)) {
      console.warn(`Key ${key} already has a level set (${list.get(key)}). Overwriting with level ${level}`);
    }

    list.set(key, level);
  }

  // Kanji files should have the format `n<level>-kanji.apkg`.
  (await readNotes(ankiDir + '/n5-kanji.apkg')).forEach(note => setLevel(kanjiList, note.front, 5));
  (await readNotes(ankiDir + '/n4-kanji.apkg')).forEach(note => setLevel(kanjiList, note.front, 4));
  (await readNotes(ankiDir + '/n3-kanji.apkg')).forEach(note => setLevel(kanjiList, note.front, 3));
  (await readNotes(ankiDir + '/n2-kanji.apkg')).forEach(note => setLevel(kanjiList, note.front, 2));
  (await readNotes(ankiDir + '/n1-kanji.apkg')).forEach(note => setLevel(kanjiList, note.front, 1));

  // Vocab files should have the format `n<level>-vocab.apkg`.
  (await readNotes(ankiDir + '/n5-vocab.apkg')).forEach(note => vocabList.set(note.front, 5));
  (await readNotes(ankiDir + '/n4-vocab.apkg')).forEach(note => vocabList.set(note.front, 4));
  (await readNotes(ankiDir + '/n3-vocab.apkg')).forEach(note => vocabList.set(note.front, 3));
  (await readNotes(ankiDir + '/n2-vocab.apkg')).forEach(note => vocabList.set(note.front, 2));
  (await readNotes(ankiDir + '/n1-vocab.apkg')).forEach(note => vocabList.set(note.front, 1));

  // Create the Kanji JSON file
  if (kanjiList.size > 0) {
    if (isWritableDirectory(outputDir)) {
      writeJsonFile(outputDir + '/jlpt-kanji.json', Object.fromEntries(kanjiList), prettyPrint);
      console.info(`Wrote ${kanjiList.size} kanji to ${outputDir}/jlpt-kanji.json`);
    }
    else {
      console.error(`The output directory ${outputDir} is not writable!`);
    }
  }
  else {
    console.error('No kanji data was loaded!');
  }

  // Create the Vocab JSON file
  if (vocabList.size > 0) {
    if (isWritableDirectory(outputDir)) {
      writeJsonFile(outputDir + '/jlpt-vocab.json', Object.fromEntries(vocabList), prettyPrint);
      console.info(`Wrote ${vocabList.size} kanji to ${outputDir}/jlpt-vocab.json`);
    }
    else {
      console.error(`The output directory ${outputDir} is not writable!`);
    }
  }
  else {
    console.error('No vocab data was loaded!');
  }
}