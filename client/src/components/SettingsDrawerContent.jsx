import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { StyledToggleButton } from '../styles';

import { useThemeToggle } from '../hooks/useThemeToggle';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function SettingsDrawerContent() {
  const [mode, setMode] = useState('light');
  const { toggleTheme } = useThemeToggle();

  const handleMode = (event, newMode) => {
    setMode(newMode);
    toggleTheme(mode);
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleMode}
        aria-label='mode'
        color='primary'
      >
        <StyledToggleButton
          value='light'
          aria-label='light mode'
          fullWidth
        >
          <LightModeOutlinedIcon />
          <Typography
            variant='caption'
            sx={{ marginLeft: '0.5rem' }}
          >
            Светлая
          </Typography>
        </StyledToggleButton>
        <StyledToggleButton
          value='dark'
          aria-label='dark mode'
          fullWidth
        >
          <DarkModeOutlinedIcon />
          <Typography
            variant='caption'
            sx={{ marginLeft: '0.5rem' }}
          >
            Тёмная
          </Typography>
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
export default SettingsDrawerContent;
