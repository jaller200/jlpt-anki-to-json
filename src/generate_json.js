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
    if (!isReadableFile(filePath)) {
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
 * @param {string} ankiDir The directory with the Anki files
 */
export const generateJson = async (outputDir, ankiDir) => {

  // Create our Kanji list
  const kanjiList = new Map();
  const vocabList = new Map();

  // Kanji files should have the format `n<level>-kanji.apkg`.
  (await readNotes(ankiDir + '/n5-kanji.apkg')).forEach(note => kanjiList.set(note.front, 5));
  (await readNotes(ankiDir + '/n4-kanji.apkg')).forEach(note => kanjiList.set(note.front, 4));
  (await readNotes(ankiDir + '/n3-kanji.apkg')).forEach(note => kanjiList.set(note.front, 3));
  (await readNotes(ankiDir + '/n2-kanji.apkg')).forEach(note => kanjiList.set(note.front, 2));
  (await readNotes(ankiDir + '/n1-kanji.apkg')).forEach(note => kanjiList.set(note.front, 1));

  // Vocab files should have the format `n<level>-vocab.apkg`.
  (await readNotes(ankiDir + '/n5-vocab.apkg')).forEach(note => vocabList.set(note.front, 5));
  (await readNotes(ankiDir + '/n4-vocab.apkg')).forEach(note => vocabList.set(note.front, 4));
  (await readNotes(ankiDir + '/n3-vocab.apkg')).forEach(note => vocabList.set(note.front, 3));
  (await readNotes(ankiDir + '/n2-vocab.apkg')).forEach(note => vocabList.set(note.front, 2));
  (await readNotes(ankiDir + '/n1-vocab.apkg')).forEach(note => vocabList.set(note.front, 1));

  // Write a new line
  console.log();

  // Create the Kanji JSON file
  if (kanjiList.size > 0) {
    if (isWritableDirectory(outputDir)) {
      writeJsonFile(outputDir + '/jlpt-kanji.json', {
        kanji: kanjiList
      });
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
      writeJsonFile(outputDir + '/jlpt-vocab.json', {
        vocab: vocabList
      });
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