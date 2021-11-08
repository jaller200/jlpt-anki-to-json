import { readAnkiNotes } from "./anki_utils";

/**
 * Generates the JLPT kanji list.
 * 
 * @param {string} outputDir The output directory
 * @param {string} pathN5 The N5 Anki path
 * @param {string} pathN4 The N5 Anki path
 * @param {string} pathN3 The N3 Anki path
 * @param {string} pathN2 The N2 Anki path
 * @param {string} pathN1 The N1 Anki path
 */
export const generateKanjiList = async (outputDir, pathN5, pathN4, pathN3, pathN2, pathN1) => {

  // Create our Kanji list
  const kanjiList = new Map();

  // Read our N5 Kanji
  try {
    const notes = await readAnkiNotes(pathN5);
    notes.forEach(entry => {
      kanjiList[entry.front] = 5;
    });
  }
  catch {
    console.error('Unable to read the N5 Kanji');
  }

  console.log(kanjiList);
}