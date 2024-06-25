import { useApolloClient, useQuery } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import { useState, useContext } from 'react';

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

  const [anchorEl, setAnchorEl] = useState(null);
  // const [anchorMenu, setAnchorMenu] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    client.resetStore();
  };

  const open = Boolean(anchorEl);

  const { data, loading, error } = useQuery(ME, {
    skip: !token
  });

  if (error) return `Error! ${error.message}`;
  const user = data?.me;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
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
