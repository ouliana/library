import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledToggleButton, StyledToggleButtonGroup } from '../styles';

import { useTheme } from '@mui/material/styles';
import { useThemeToggle } from '../hooks/useThemeToggle';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function SettingsDrawerContent() {
  const theme = useTheme();
  const [mode, setMode] = useState(theme.palette.mode);
  const { toggleTheme } = useThemeToggle();

  console.log();

  const handleMode = (event, newMode) => {
    setMode(newMode);
    toggleTheme(mode === 'dark');
  };

  return (
    <Box>
      <StyledToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleMode}
        aria-label='mode'
        // color='secondary'
      >
        <StyledToggleButton
          value='light'
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
          value='dark'
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
