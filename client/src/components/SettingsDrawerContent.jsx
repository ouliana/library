import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledToggleButton, StyledToggleButtonGroup } from '../styles';

import { useThemeContext } from '../contexts/ThemeContext';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function SettingsDrawerContent() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const [isDark, setIsDark] = useState(isDarkMode);

  const handleMode = (_event, newMode) => {
    if (newMode !== null && newMode !== isDarkMode) {
      setIsDark(newMode);
      toggleTheme();
    }
  };

  return (
    <Box>
      <StyledToggleButtonGroup
        value={isDark}
        exclusive
        onChange={handleMode}
        aria-label='mode'
      >
        <StyledToggleButton
          value={false}
          aria-label='light mode'
          fullWidth
        >
          <LightModeOutlinedIcon />
          <Typography
            variant='caption'
            display='block'
            sx={{ marginLeft: '0.5rem' }}
          >
            Светлая
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton
          value={true}
          aria-label='dark mode'
          fullWidth
        >
          <DarkModeOutlinedIcon />
          <Typography
            variant='caption'
            display='block'
            sx={{ marginLeft: '0.5rem' }}
          >
            Тёмная
          </Typography>
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  );
}
export default SettingsDrawerContent;
