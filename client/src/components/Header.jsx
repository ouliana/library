import { useApolloClient } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import { useState, useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ContactPageOutlined from '@mui/icons-material/ContactPageOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { Stack } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import ThemeToggleButton from './ThemeToggleButton';

export default function Hader() {
  const [token, dispatch] = useContext(TokenContext);

  const [anchorEl, setAnchorEl] = useState(null);

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
    handleClose();
  };

  const open = Boolean(anchorEl);

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
          <Stack
            direction='row'
            spacing={2}
            sx={{ visibility: token ? 'visible' : 'hidden' }}
          >
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
            <IconButton
              aria-controls={open ? 'menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                padding: 0,
                borderRadius: '50%'
              }}
            >
              <Avatar
                alt='Аватар пользователя'
                src='/cat3.jpg'
                sx={{ width: 48, height: 48 }}
              />
            </IconButton>
            <Menu
              id='menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleOutlined fontSize='small' />
                </ListItemIcon>
                <ListItemText>Профиль</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContactPageOutlined fontSize='small' />
                </ListItemIcon>
                <ListItemText>Мой аккаунт</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutOutlined fontSize='small' />
                </ListItemIcon>
                <ListItemText>Выйти</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
          {!token && (
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

  // function logout() {
  //   localStorage.clear();
  //   dispatch({ type: 'CLEAR' });
  //   client.resetStore();
  // }
}
