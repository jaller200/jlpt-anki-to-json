import { program } from 'commander';

import { generateJson } from './generate_json';

// Create our Kanji command
program
  .argument('<anki_file_dir_path>')
  .option('-o, --output-dir <output_dir>', 'output folder for the generated JSON', './')
  .description('Generate the JLPT Kanji file')
  .action(generateJson)

program.parse();