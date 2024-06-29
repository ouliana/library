import { useState, useContext, useEffect } from 'react';
import TokenContext from '../contexts/TokenContext';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Panel } from '../styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import { useUser } from '../hooks/useUser';

function LoginForm({ setError }) {
  const [token, dispatch] = useContext(TokenContext);
  // const { dispatchUser } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [login, result] = useMutation(LOGIN, {
    extentions: {
      onerror: error => setError(error.graphQLErrors[0].message)
    }
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = event => event.preventDefault();

  const handleSubmit = event => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const tokenValue = result.data.login.value;
      dispatch({ type: 'LOGIN', payload: tokenValue });
      localStorage.setItem('library-user-token', tokenValue);
      navigate('/');
    }
  }, [result.data]); // eslint-disable-line

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Panel elevation={1}>
      <Typography
        variant='h5'
        gutterBottom
      >
        Авторизация
      </Typography>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '38ch' }
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Логин'
          autoComplete='current-username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label='Пароль'
          type={showPassword ? 'text' : 'password'}
          autoComplete='current-password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type='submit'>Войти</Button>
      </Box>
    </Panel>
  );
}

export default LoginForm;
