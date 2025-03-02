import { Theme, ThemeOptions, createTheme } from '@mui/material';
import palette from './palette';

export type AppTheme = Theme;
export type AppThemeOptions = ThemeOptions;

const theme: AppTheme = createTheme({
  palette: palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
});

export default theme;
