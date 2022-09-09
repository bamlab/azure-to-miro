#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import { program } from 'commander';
import { transferAzureToMiro } from './modules/transfer/transferAzureToMiro';

interface ProgramOptions {
  theme?: string;
}

program
  .command('transfer')
  .description('import work items from Azure to Miro boards')
  .argument('<number>', 'Work item id')
  .option('-t|--theme <string>', 'theme of colors to use')
  .action(async (id: number, { theme }: ProgramOptions) => {
    await transferAzureToMiro(id, (theme ?? '').toUpperCase());
  });

program.parse();
