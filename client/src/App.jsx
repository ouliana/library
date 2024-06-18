import { useState, useEffect, useContext } from 'react';
import TokenContext from './contexts/TokenContext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';
import SecondaryLayout from './components/SecondaryLayout';
import Main from './components/Main';
import Authors from './components/Authors';
import AuthorDetails from './components/AuthorDetails';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import BooksByGenre from './components/BooksByGenre';
import NewBook from './components/NewBook';
import Genres from './components/Genres';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';

import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggleProvider } from './contexts/ThemeToggleContext';

const App = () => {
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
        <ThemeProvider>
          <ThemeToggleProvider>
            <CssBaseline />
            <Header token={token} />
            <Container
              maxWidth='false'
              disableGutters
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100vh',
                  marginTop: '64px'
                }}
              >
                <Routes>
                  <Route
                    path='/'
                    element={
                      <MainLayout>
                        <Main />
                      </MainLayout>
                    }
                  />
                  <Route
                    path='/login'
                    element={
                      <MainLayout>
                        <LoginForm setError={setError} />
                      </MainLayout>
                    }
                  />
                  <Route
                    path='/authors'
                    element={
                      <SecondaryLayout>
                        <Authors token={token} />
                      </SecondaryLayout>
                    }
                  />
                  <Route
                    path='/authors/:id'
                    element={<AuthorDetails />}
                  />
                  <Route
                    path='/books'
                    element={<Books />}
                  />
                  <Route
                    path='/books/:id'
                    element={<BookDetails />}
                  />
                  <Route
                    path='/genres'
                    element={<Genres />}
                  />
                  <Route
                    path='/genres/:id'
                    element={<BooksByGenre />}
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
              </Box>
            </Container>
            <Footer />
          </ThemeToggleProvider>
        </ThemeProvider>
      </Router>
    </TokenContext.Provider>
  );
};

export default App;
