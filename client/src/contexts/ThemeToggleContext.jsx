// ThemeContext.js
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

export const ThemeToggleContext = createContext();

export const ThemeToggleProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = mode => {
    setTheme(mode === 'light' ? darkTheme : lightTheme);
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  );

  return (
    <ThemeToggleContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
