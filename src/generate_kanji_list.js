import { readAnkiJson } from "./anki_utils";

// Generates the Kanji list
export function generateKanjiList(outputDir, pathN5, pathN4, pathN3, pathN2, pathN1) {

  // Create our Kanji list
  const kanjiList = new Map();

  // Read our N5 Kanji
  const n5Kanji = readAnkiJson(pathN5, outputDir + '/n5-kanji');
  if (!n5Kanji) {
    console.error(`Unable to read the N5 Kanji from ${pathN5}`);
  }
  else {
    console.log(n5Kanji);
  }
}