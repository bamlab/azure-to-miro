import dotenv from 'dotenv';
dotenv.config();

import { fetchFeature } from './modules/azure/infra/azureFetch';
import { program } from 'commander';

interface ProgramOptions {
  theme: string;
}

program
  .name('azure to miro cli')
  .description('import work items from Azure to Miro boards')
  .argument('<number>', 'Work item id')
  .option('-t|--theme <string>', 'theme of colors to use')
  .action(async (id: number, { theme }: ProgramOptions) => {
    const cards = await fetchFeature(`${id}`);
    console.log(JSON.stringify({ cards, theme }));
  });

program.parse();
