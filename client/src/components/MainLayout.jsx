import {
  BackgroundContainer,
  Overlay,
  OverlaySecondary,
  Content,
  ContentMobile
} from '../styles';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../hooks/useUser';

function MainLayout({ children }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { state } = useUser();
  const { user, loading, error } = state;

  if (error) return `Error! ${error.message}`;

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
