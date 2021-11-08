import fs from 'fs';

// Checks if this is a readable file
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

// Checks if this is a writable directory
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

// Reads a JSON file
export const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  catch (error) {
    console.error('Unable to read JSON file: ', error);
    return null;
  }
}