import { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import ContactPageOutlined from '@mui/icons-material/ContactPageOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { Link as RouterLink } from 'react-router-dom';
import SettingsDrawerContent from './SettingsDrawerContent';
import { StyledIconButton, StyledDrawer } from '../styles';
import { useTheme } from '@mui/material/styles';

import CustomIcon from '../assets/github-mark.svg?react';
import CustomIconInv from '../assets/github-mark-white.svg?react';

import { StyledToolbarButton, StyledToolbarIconButton } from '../styles';
import { useErrorDispatch } from '../hooks/useError';

function LargeScreenToolbar({ logout }) {
  const { state, dispatch } = useUser();
  const { user, loading, error } = state;

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  const errorDispatch = useErrorDispatch();

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
    dispatch({ type: 'LOGOUT' });
  };

  const open = Boolean(anchorEl);

  const handleGitHubClick = () => {
    window.open(
      'https://github.com/ouliana/library.git',
      '_blank',
      'noopener,noreferrer'
    );
  };

  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <Toolbar>
      <StyledToolbarIconButton
        size='large'
        edge='start'
        aria-label='home'
        sx={{ mr: 2 }}
        component={RouterLink}
        to='/'
      >
        <HomeOutlined />
      </StyledToolbarIconButton>

      <Box sx={{ flexGrow: 1 }}>
        <StyledToolbarButton
          component={RouterLink}
          to='/authors'
        >
          Авторы
        </StyledToolbarButton>
        <StyledToolbarButton
          to='/books'
          component={RouterLink}
        >
          Книги
        </StyledToolbarButton>
        <StyledToolbarButton
          to='/genres'
          component={RouterLink}
        >
          Жанры
        </StyledToolbarButton>
      </Box>
      <Stack
        direction='row'
        spacing={2}
        sx={{ visibility: user ? 'visible' : 'hidden' }}
      >
        <StyledToolbarButton
          to='/recommendations'
          component={RouterLink}
        >
          Рекомендации
        </StyledToolbarButton>
        <StyledToolbarButton
          to='/new-book'
          component={RouterLink}
        >
          Добавить книгу
        </StyledToolbarButton>
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
          {loading && (
            <Skeleton
              variant='circular'
              width={40}
              height={40}
            />
          )}
          {user && (
            <Avatar
              alt='Аватар пользователя'
              src={user ? user.avatar : ''}
            />
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
            <Box>
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
            </Box>
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
          aria-label='GitHub'
          style={{ width: 40, height: 40 }}
          onClick={handleGitHubClick}
        >
          {theme.palette.mode === 'light' ? (
            <CustomIcon style={{ width: '100%', height: '100%' }} />
          ) : (
            <CustomIconInv style={{ width: '100%', height: '100%' }} />
          )}
        </IconButton>
      </Stack>
      {/* Login */}
      {!user && (
        <StyledToolbarButton
          to='/login'
          component={RouterLink}
        >
          Войти
        </StyledToolbarButton>
      )}
      {/* Settings */}
      <StyledToolbarIconButton
        // sx={{ ml: 1 }}
        onClick={toggleDrawer(true)}
      >
        <SettingsOutlinedIcon />
      </StyledToolbarIconButton>
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
          <StyledToolbarIconButton
            aria-label='close'
            size='small'
            onClick={() => setOpenDrawer(false)}
          >
            <CloseOutlinedIcon fontSize='inherit' />
          </StyledToolbarIconButton>
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
    </Toolbar>
  );
}

export default LargeScreenToolbar;
