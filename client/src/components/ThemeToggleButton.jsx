import { useState } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';

import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false);
  const { toggleTheme } = useThemeContext();

  const handleMode = () => {
    setIsDark(!isDark);
    toggleTheme();
  };

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={handleMode}
    >
      {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
