import ora from 'ora';
import cliSpinners from 'cli-spinners';

export const spinner = (text: string) => {
  return ora({
    text,
    spinner: cliSpinners.line,
  }).start();
};
