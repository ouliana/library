import { useContext } from 'react';

import { useQuery } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';
import {
  BackgroundContainer,
  Overlay,
  OverlaySecondary,
  Content,
  ContentMobile
} from '../styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ME } from '../graphql/queries';

function MainLayout({ children }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [token] = useContext(TokenContext);
  const { data, error } = useQuery(ME, {
    skip: !token
  });

  if (error) return `Error! ${error.message}`;
  const user = data?.me;

  return (
    <BackgroundContainer>
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
