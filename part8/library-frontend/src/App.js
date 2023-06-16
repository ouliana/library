import { useState } from 'react';
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
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
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
          element={
            <LoginForm
              setToken={setToken}
              setError={setError}
            />
          }
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
          element={<NewBook />}
        />
        <Route
          path='/recommendations'
          element={<Recommendations />}
        />
      </Routes>
    </Router>
  );
};

export default App;
