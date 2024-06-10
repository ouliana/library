import { useApolloClient } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import ThemeToggleButton from './ThemeToggleButton';

export default function Hader() {
  const [token, dispatch] = useContext(TokenContext);

  const client = useApolloClient();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={RouterLink}
              color='inherit'
              to='/authors'
            >
              Авторы
            </Button>
            <Button
              to='/books'
              component={RouterLink}
              color='inherit'
            >
              Произведения
            </Button>
          </Box>
          {token ? (
            <>
              <Link to='/recommendations'>recommendations</Link>{' '}
              <Link to='/add'>add book</Link>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <Button
              to='/login'
              color='inherit'
            >
              Войти
            </Button>
          )}

          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
    </Box>
  );

  function logout() {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    client.resetStore();
  }
}
