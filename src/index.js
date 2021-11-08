import { program } from 'commander';

import { generateJson } from './generate_json';

// Create our Kanji command
program.command('generate <output_dir_path> <anki_file_dir_path>')
  .description('Generate the JLPT Kanji file')
  .action(generateJson)

program.parse();