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
  spacing: 3,
  palette: {
    primary: {
      main: '#870036',
    },
    secondary: {
      main: '#FFC5F3',
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
          padding: 6,
          textAlign: 'center',
          color: '#333',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
  },
});

export default theme;
