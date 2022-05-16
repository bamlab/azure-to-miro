import dotenv from 'dotenv';
import { fetchFeature } from './infra/azureFetch';

dotenv.config();

const main = async () => {
  console.log(JSON.stringify(await fetchFeature('17120')));
};

main();
