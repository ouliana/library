import { useState, useEffect, useContext } from 'react';
import TokenContext from './contexts/TokenContext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Container } from '@mui/material';
import { ThemeToggleProvider } from './contexts/ThemeContext';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark'
//   }
// });

const App = () => {
  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);

  const [token, dispatch] = useContext(TokenContext);

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token');
    if (storedToken) {
      dispatch({ type: 'LOGIN', payload: storedToken });
    }
  }, [dispatch]);

  return (
    <TokenContext.Provider value={[token, dispatch]}>
      <Router>
        {/* <ThemeProvider theme={darkTheme}> */}
        <ThemeToggleProvider>
          <CssBaseline />
          <Header token={token} />
          <Container maxWidth='false'>
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
          </Container>
          {/* </ThemeProvider> */}
        </ThemeToggleProvider>
      </Router>
    </TokenContext.Provider>
  );
};

export default App;
