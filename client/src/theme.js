import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#82b1ff',
      light: '#9bc0ff',
      dark: '#5b7bb2',
      contrastText: 'rgba(2 6 32)'
    },
    secondary: {
      main: '#ff9100',
      light: '#ffa733',
      dark: '#b26500'
    },
    overlay: {
      main: '#ffffff'
    },
    text: {
      primary: grey[900],
      secondary: grey[800]
    },
    background: {
      default: '#fafafa', // Default background color
      paper: '#ffffff' // Background color for Paper components
    }
  },
  zIndex: {
    drawer: 10,
    overlay: 1
  },
  typography: {
    h4: {
      color: '#212121'
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82b1ff',
      light: blue[400],
      dark: 'rgba(2 6 32)',
      contrastText: '#fafafa'
    },
    secondary: {
      main: grey[500],
      light: grey[400],
      dark: grey[600]
    },
    overlay: {
      main: 'rgba(2 6 32)'
    },
    text: {
      primary: grey[100],
      secondary: grey[400]
    },
    background: {
      default: 'rgba(2 6 32)', // Default background color
      paper: '#212121' // Background color for Paper components
    }
  },
  zIndex: {
    drawer: 10
  },
  typography: {
    h4: {
      color: '#f5f5f5'
    }
  }
});
