import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import LargeScreenToolbar from './LargeScreenToolbar';
import SmallScreenToolbar from './SmallScreenToolbar';

export default function Hader({ user, logout }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme =>
            isLargeScreen ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1
        }}
      >
        {isLargeScreen ? (
          <LargeScreenToolbar
            user={user}
            logout={logout}
          />
        ) : (
          <SmallScreenToolbar
            user={user}
            logout={logout}
          />
        )}
      </AppBar>
    </Box>
  );
}
