import { useState, useEffect, useContext } from 'react';
import TokenContext from './TokenContext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import Main from './components/Main';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

const App = () => {
  const padding = {
    padding: 5,
  };

  const [token, dispatch] = useContext(TokenContext);

  const [error, setError] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    client.resetStore();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token');
    if (storedToken) {
      dispatch({ type: 'LOGIN', payload: storedToken });
    }
  }, []);

  return (
    <TokenContext.Provider value={[token, dispatch]}>
      <Router>
        <div>
          <Link
            style={padding}
            to='/authors'
          >
            authors
          </Link>
          <Link
            style={padding}
            to='/books'
          >
            books
          </Link>
          {token ? (
            <>
              <Link
                style={padding}
                to='/recommendations'
              >
                recommendations
              </Link>{' '}
              <Link
                style={padding}
                to='/add'
              >
                add book
              </Link>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <Link
              style={padding}
              to='/login'
            >
              login
            </Link>
          )}
        </div>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          />
          <Route
            path='/login'
            element={<LoginForm setError={setError} />}
          />
          <Route
            path='/authors'
            element={<Authors token={token} />}
          />
          <Route
            path='/books'
            element={<Books />}
          />
          <Route
            path='/add'
            element={
              token ? (
                <NewBook />
              ) : (
                <Navigate
                  replace
                  to='/books'
                />
              )
            }
          />
          <Route
            path='/recommendations'
            element={
              token ? (
                <Recommendations />
              ) : (
                <Navigate
                  replace
                  to='/books'
                />
              )
            }
          />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
};

export default App;
