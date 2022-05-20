import dotenv from 'dotenv';
dotenv.config();

type Status = 'TODO' | 'DONE' | 'BUG';

export const getThemeColor = (theme: string, status: Status) => {
  const color =
    (theme
      ? process.env[`ATM_THEME_${theme}_${status}`]
      : process.env[`ATM_THEME_${status}`]) || defaultColors(status);

  return color;
};

const defaultColors = (status: Status) => {
  switch (status) {
    case 'TODO':
      return '#2D9BF0';
    case 'DONE':
      return '#7bed9f';
    case 'BUG':
      return '#e84118';
  }
};
