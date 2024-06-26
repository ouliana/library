import { useApolloClient, useQuery } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import LargeScreenToolbar from './LargeScreenToolbar';
import SmallScreenToolbar from './SmallScreenToolbar';

// import ThemeToggleButton from './ThemeToggleButton';

import { ME } from '../graphql/queries';

export default function Hader() {
  const client = useApolloClient();
  const [token, dispatch] = useContext(TokenContext);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    client.resetStore();
  };

  const { data, error } = useQuery(ME, {
    skip: !token
  });

  if (error) return `Error! ${error.message}`;
  const user = data?.me;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          zIndex: theme =>
            isLargeScreen ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1
        }}
        // color='primary'
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
