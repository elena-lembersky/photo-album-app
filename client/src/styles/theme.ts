import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    spacing: (factor: number) => string | number;
  }
  interface ThemeOptions {
    spacing?: number | ((factor: number) => string | number);
  }
}

const theme = createTheme({
  spacing: 3, // Устанавливаем множитель 3px
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Verdana, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFC5F3',
          color: '#870036',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.8rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 6, // Это эквивалентно theme.spacing(2), так как spacing: 3
          textAlign: 'center',
          color: '#333',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%', // Sets width to 100% for all TextField components
        },
      },
    },
  },
});

export default theme;
