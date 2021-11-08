import { program } from 'commander';

import { generateKanjiList } from './generate_kanji_list';

// Create our Kanji command
program.command('kanji <output_path> <n5_path>')
  .description('Generate the JLPT Kanji file')
  .action(generateKanjiList)

program.parse();