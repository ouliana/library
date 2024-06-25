import { useState } from 'react';
import { useThemeToggle } from '../hooks/useThemeToggle';

import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false);
  const { toggleTheme } = useThemeToggle();

  const handleMode = () => {
    setIsDark(!isDark);
    toggleTheme(isDark);
  };

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={handleMode}
    >
      {isDark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
