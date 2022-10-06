const getProject = () =>
  process.argv
    .find((arg) => arg.startsWith('-p') || arg.startsWith('--project'))
    ?.split('=')
    .pop() ?? null;

export const getEnvVariable = (env: string) => {
  const project = getProject()?.toUpperCase();

  const envVariable = project
    ? process.env[`${project}_${env}`]
    : process.env[env];

  return envVariable || process.env[env];
};
