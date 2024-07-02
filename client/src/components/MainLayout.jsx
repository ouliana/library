import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  BackgroundContainer,
  Overlay,
  OverlaySecondary,
  Content,
  ContentMobile
} from '../styles';

import { useErrorDispatch } from '../hooks/useError';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../hooks/useUser';

function MainLayout({ children }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { state } = useUser();
  const { user, loading, error } = state;

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <BackgroundContainer>
      {loading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {user ? <OverlaySecondary /> : <Overlay />}
      {isLargeScreen ? (
        <Content>{children}</Content>
      ) : (
        <ContentMobile>{children}</ContentMobile>
      )}
    </BackgroundContainer>
  );
}

export default MainLayout;
