#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import { program } from 'commander';
import { transferAzureToMiro } from './modules/transfer/transferAzureToMiro';
import { createRelease } from './modules/release/createRelease';

interface TransferOptions {
  theme?: string;
}

interface CreateReleaseOptions {
  path?: string;
  items?: number[];
}

program
  .command('transfer')
  .description('import work items from Azure to Miro boards')
  .argument('<number>', 'Work item id')
  .option('-t|--theme <string>', 'theme of colors to use')
  .action(async (id: number, { theme }: TransferOptions) => {
    await transferAzureToMiro(id, (theme ?? '').toUpperCase());
  });

program
  .command('create-release')
  .description('create a release from Azure sprint or a list of features')
  .argument('<string>', 'release name')
  .option('-p|--path <string>', 'iteration path')
  .option('-i|--items <number...>', 'work item ids')
  .action(async (release: string, { path, items }: CreateReleaseOptions) => {
    await createRelease(release, { path, workItemIds: items });
  });

program.parse();
