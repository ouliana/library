import { useApolloClient } from '@apollo/client';

import { useEffect, useContext } from 'react';
import TokenContext from './contexts/TokenContext';
// import ErrorContext from './contexts/ErrorContext';
import { ErrorContextProvider } from './contexts/ErrorContext';
import { SuccessContextProvider } from './contexts/SuccessContext';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';
import SecondaryLayout from './components/SecondaryLayout';
import DetailsLayout from './components/DetailsLayout';
import Welcome from './components/Welcome';
import Authors from './components/Authors';
import AuthorDetails from './components/AuthorDetails';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import BooksByGenre from './components/BooksByGenre';
import NewBook from './components/NewBook';
import NewAuthor from './components/NewAuthor';
import EditAuthor from './components/EditAuthor';
import Genres from './components/Genres';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import Error from './components/Error';
import Success from './components/Success';
import { ContentLeft } from './styles';

import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ThemeContextProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  const client = useApolloClient();
  const [token, dispatchToken] = useContext(TokenContext);

  // eslint-disable-next-line no-unused-vars

  const logout = () => {
    localStorage.clear();
    dispatchToken({ type: 'CLEAR' });
    client.resetStore();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token');
    if (storedToken) {
      dispatchToken({ type: 'LOGIN', payload: storedToken });
    }
  }, [dispatchToken]);

  return (
    <ErrorContextProvider>
      <SuccessContextProvider>
        <ThemeContextProvider>
          <TokenContext.Provider value={[token, dispatchToken]}>
            <UserProvider>
              <Router>
                <CssBaseline />
                <Header logout={logout} />
                <Container
                  maxWidth='false'
                  disableGutters
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center'
                    }}
                  >
                    <Error />
                    <Success />
                    <Routes>
                      <Route
                        path='/'
                        element={
                          <MainLayout>
                            <Welcome />
                          </MainLayout>
                        }
                      />
                      <Route
                        path='/login'
                        element={
                          <MainLayout>
                            <LoginForm />
                          </MainLayout>
                        }
                      />
                      <Route
                        path='/authors'
                        element={
                          <SecondaryLayout>
                            <Authors />
                          </SecondaryLayout>
                        }
                      />
                      <Route
                        path='/authors/:id'
                        element={
                          <DetailsLayout>
                            <AuthorDetails />
                          </DetailsLayout>
                        }
                      />
                      <Route
                        path='/authors/:id/edit'
                        element={
                          <SecondaryLayout>
                            <EditAuthor />
                          </SecondaryLayout>
                        }
                      />
                      <Route
                        path='/books'
                        element={
                          <SecondaryLayout>
                            <Books />
                          </SecondaryLayout>
                        }
                      />
                      <Route
                        path='/books/:id'
                        element={
                          <ContentLeft>
                            <BookDetails />
                          </ContentLeft>
                        }
                      />
                      <Route
                        path='/genres'
                        element={
                          <SecondaryLayout>
                            <Genres />
                          </SecondaryLayout>
                        }
                      />
                      <Route
                        path='/genres/:id'
                        element={
                          <SecondaryLayout>
                            <BooksByGenre />
                          </SecondaryLayout>
                        }
                      />
                      <Route
                        path='/new-book'
                        element={
                          token ? (
                            <SecondaryLayout>
                              <NewBook />
                            </SecondaryLayout>
                          ) : (
                            <Navigate
                              replace
                              to='/books'
                            />
                          )
                        }
                      />
                      <Route
                        path='/new-author'
                        element={
                          token ? (
                            <SecondaryLayout>
                              <NewAuthor />
                            </SecondaryLayout>
                          ) : (
                            <Navigate
                              replace
                              to='/authors'
                            />
                          )
                        }
                      />
                      <Route
                        path='/recommendations'
                        element={
                          token ? (
                            <SecondaryLayout>
                              <Recommendations />
                            </SecondaryLayout>
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
                <Divider />
                <Footer />
              </Router>
            </UserProvider>
          </TokenContext.Provider>
        </ThemeContextProvider>
      </SuccessContextProvider>
    </ErrorContextProvider>
  );
};

export default App;
