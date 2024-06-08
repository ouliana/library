import { useState, useContext, useEffect } from 'react';
import TokenContext from '../contexts/TokenContext';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setError }) {
  // eslint-disable-next-line no-unused-vars
  const [token, dispatch] = useContext(TokenContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    extentions: {
      onerror: error => setError(error.graphQLErrors[0].message)
    }
  });
  const navigate = useNavigate();

  const submit = event => {
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

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
}

export default LoginForm;
