import { spinner } from '../../utils/spinner';

interface Options {
  path?: string;
  workItemIds?: number[];
}

export const createRelease = async (
  release: string,
  { path, workItemIds }: Options
) => {
  const commandSpinner = spinner(`Creating release ${release}`);
  console.log({ path, workItemIds });

  commandSpinner.succeed(`${release} successfully created`);
};
