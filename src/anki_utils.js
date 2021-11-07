import { isReadableFile, readJsonFile } from './file_utils';

import ankiToJson from 'anki-to-json';

export const readAnkiJson = (ankiFilePath, outputPath) => {

    if (!isReadableFile(ankiFilePath)) {
        console.error(`Unable to read the Anki file ${ankiFilePath}`);
        return null;
    }

    if (!ankiFilePath.endsWith('.apkg')) {
        console.error(`The file ${ankiFilePath} is not a valid Anki APKG file`);
        return null;
    }

    // Read the Anki file
    ankiToJson(ankiFilePath, outputPath);

    // Try to read the JSON file
    return readJsonFile(outputPath + '/notes.json');
}
