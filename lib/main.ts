import dotenv from 'dotenv';
import { fetchFeature } from './infra/azureFetch';
import { program } from 'commander';

dotenv.config();

program
  .name('azure to miro cli')
  .description('import work items from Azure to Miro boards')
  .argument('<number>', 'Work item id')
  .option('-t|--template', 'template of colors to use')
  .action(async (id: number) => {
    const cards = await fetchFeature(`${id}`);
    console.log(JSON.stringify({ cards }));
  });

program.parse();
