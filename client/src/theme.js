import { createTheme } from '@mui/material/styles';
import { lime, orange } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lime[500],
      light: '#d7e360',
      dark: '#8f9a27'
    },
    secondary: {
      main: orange[500]
    }
  },
  zIndex: {
    drawer: 10
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    }
  },
  zIndex: {
    drawer: 10
  }
});
