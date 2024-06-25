import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import ContactPageOutlined from '@mui/icons-material/ContactPageOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import { Link as RouterLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';

function SmallScreenToolbar({ user, logout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };
  return (
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'Аватар пользователя'
        }}
      >
        {user && (
          <>
            <Stack
              justifyContent='center'
              alignItems='center'
              sx={{ padding: '1rem' }}
            >
              <Avatar
                alt='Аватар пользователя'
                src={user ? user.avatar : ''}
                sx={{ width: 48, height: 48 }}
              />

              <Stack
                justifyContent='center'
                alignItems='center'
                spacing={-0.5}
              >
                <Typography variant='subtitle2'>{user?.name}</Typography>
                <Typography
                  variant='caption'
                  gutterBottom
                >
                  {user?.username}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
          </>
        )}
        <MenuItem
          component={RouterLink}
          to='/'
        >
          <ListItemIcon>
            <HomeOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText>Главная</ListItemText>
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to='/authors'
        >
          <ListItemIcon>
            <PeopleAltOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Авторы</ListItemText>
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to='/books'
        >
          <ListItemIcon>
            <LibraryBooksOutlinedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Книги</ListItemText>
        </MenuItem>

        {user && (
          <>
            <Divider />
            <MenuItem
              component={RouterLink}
              to='/recommendations'
            >
              <ListItemIcon>
                <RecommendOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Может быть интересно</ListItemText>
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to='/'
            >
              <ListItemIcon>
                <PostAddOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Добавить книгу</ListItemText>
            </MenuItem>
            <Divider />
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
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText>Выход</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
    </Toolbar>
  );
}

export default SmallScreenToolbar;
