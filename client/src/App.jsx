import { useState, useEffect, useContext } from 'react';
import TokenContext from './contexts/TokenContext';
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
import Genres from './components/Genres';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { ContentLeft } from './styles';

import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { ThemeContextProvider } from './contexts/ThemeContext';

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
    <ThemeContextProvider>
      <TokenContext.Provider value={[token, dispatch]}>
        <Router>
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
                alignItems: 'center'
              }}
            >
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
                      <LoginForm setError={setError} />
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
      </TokenContext.Provider>
    </ThemeContextProvider>
  );
};

export default App;
