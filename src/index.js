import { program } from 'commander';

import { generateKanjiList } from './generate_kanji_list';

program
  .command('kanji')
  .description('Generate the JLPT Kanji file')
  .action(generateKanjiList)