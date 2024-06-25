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
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import ContactPageOutlined from '@mui/icons-material/ContactPageOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { deepOrange } from '@mui/material/colors';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { Link as RouterLink } from 'react-router-dom';
import SettingsDrawerContent from './SettingsDrawerContent';
import { StyledIconButton, StyledDrawer } from '../styles';

function LargeScreenToolbar({ user, logout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = newOpen => () => {
    setOpenDrawer(newOpen);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const open = Boolean(anchorEl);

  return (
    <Toolbar>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='home'
        sx={{ mr: 2 }}
        component={RouterLink}
        to='/'
      >
        <HomeOutlined />
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
          Книги
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
        sx={{ visibility: user ? 'visible' : 'hidden' }}
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
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
        />
        <StyledIconButton
          aria-controls={open ? 'menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {user ? (
            <Avatar
              alt='Аватар пользователя'
              src={user ? user.avatar : ''}
            />
          ) : (
            <Avatar sx={{ bgcolor: deepOrange[500] }}>Г</Avatar>
          )}
        </StyledIconButton>
        <Menu
          id='menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
        </Menu>
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleDrawer(true)}
          color='inherit'
        >
          <SettingsOutlinedIcon fontSize='small' />
        </IconButton>
        <StyledDrawer
          anchor='right'
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              p: '1rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle1'
              align='left'
            >
              Настройка
            </Typography>
            <IconButton
              aria-label='delete'
              size='small'
              onClick={() => setOpenDrawer(false)}
            >
              <CloseOutlinedIcon fontSize='inherit' />
            </IconButton>
          </Box>
          <Divider flexItem />
          <Box
            sx={{
              p: '1rem',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='subtitle2'
              lign='left'
              gutterBottom
            >
              Тема
            </Typography>
            <SettingsDrawerContent />
          </Box>
        </StyledDrawer>
      </Stack>
      {!user && (
        <Button
          to='/login'
          component={RouterLink}
          color='inherit'
        >
          Войти
        </Button>
      )}
    </Toolbar>
  );
}

export default LargeScreenToolbar;
