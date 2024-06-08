// import { useContext } from 'react';

import { useThemeToggle } from '../hooks/useThemeToggle';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggleButton = () => {
  const { toggleTheme } = useThemeToggle();
  // const themeToggle = useContext(ThemeToggleContext)
  const theme = useTheme();

  // return <Button onClick={toggleTheme}>Toggle Theme</Button>;
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleTheme}
      color='inherit'
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
