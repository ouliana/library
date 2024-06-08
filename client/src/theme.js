import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light'
    // primary: {
    //   main: purple[500]
    //   // main: '#1976d2'
    // },
    // secondary: {
    //   main: '#dc004e'
    // }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
    // primary: {
    //   main: '#90caf9'
    // },
    // secondary: {
    //   main: '#f48fb1'
    // }
  }
});
