import { ThemeOptions } from '@mui/material/styles';

export const themeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: { main: '#009688' },
    secondary: { main: '#37474F' },
    ...(mode === 'light'
      ? {
        background: {
          default: '#f9f9f9',
          paper: '#ffffff',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#555555',
        },
      }
      : {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#e3e3e3',
          secondary: '#a3a3a3',
        },
      }),
  },
  typography: {
    fontFamily: '"Source Sans Pro", sans-serif',
  },
});
