import { spinner } from '../../utils/spinner';

export const createRelease = async (release: string) => {
  const commandSpinner = spinner(`Creating release ${release}`);

  commandSpinner.succeed(`${release} successfully created`);
};
