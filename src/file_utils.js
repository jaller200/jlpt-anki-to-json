import fs from 'fs';

/**
 * Checks if a file is readable.
 * 
 * @param {string} filePath The file path
 * @returns {bool} Whether the file is readable
 */
export const isReadableFile = (filePath) => {
  try {
    if (!(fs.existsSync(filePath) && fs.lstatSync(filePath).isFile())) {
      return false;
    }
    
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  }
  catch {
    return false;
  }
}

/**
 * Checks if the directory is writable.
 * 
 * @param {string} dirPath The directory path
 * @returns {bool} Whether the directory is writable
 */
export const isWritableDirectory = (dirPath) => {
  try {
    if (!(fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory())) {
      return false;
    }

    fs.accessSync(dirPath, fs.constants.W_OK);
    return true;
  }
  catch {
    return false;
  }
}

/**
 * Reads JSON from a file.
 * 
 * @param {string} filePath The file path
 * @returns {object} The JSON data
 */
export const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  catch (error) {
    console.error('Unable to read the JSON file: ', error);
    return null;
  }
}

/**
 * Writes JSON data to a file.
 * 
 * @param {string} filePath The file path
 * @param {object} data The data
 * @returns {bool} Whether the data was written successfully
 */
export const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data));
    return true;
  }
  catch (error) {
    console.error('Unable to write the JSON file: ', error);
    return false;
  }
}