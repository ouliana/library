import { useApolloClient } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import ThemeToggleButton from './ThemeToggleButton';

export default function Hader() {
  const [token, dispatch] = useContext(TokenContext);

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const client = useApolloClient();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
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
            <Button
              to='/genres'
              component={RouterLink}
              color='inherit'
            >
              Жанры
            </Button>
          </Box>
          {token ? (
            <>
              <Button
                to='/recommendations'
                component={RouterLink}
                color='inherit'
              >
                Рекомендации
              </Button>
              <Button
                to='/add'
                component={RouterLink}
                color='inherit'
              >
                Добавить книгу
              </Button>
              {/* <Avatar
                alt='Гость'
                src='/cat3.jpg'
                // sx={{ width: 24, height: 24 }}
              /> */}
              <IconButton
                onClick={handleDialogOpen}
                sx={{
                  padding: 0,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  alt='User Avatar'
                  src='/cat3.jpg'
                  sx={{ width: 48, height: 48 }}
                />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                  '& .MuiDialog-paper': {
                    margin: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute'
                  }
                }}
              >
                <DialogTitle>Custom Positioned Dialog</DialogTitle>
                <DialogContent>
                  This dialog is centered both vertically and horizontally.
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
              <Button
                color='inherit'
                onClick={logout}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              to='/login'
              component={RouterLink}
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
