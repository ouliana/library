import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {
  BackgroundContainer,
  OverlaySecondary,
  Content,
  ContentMobile
} from '../styles';

function SecondaryLayout({ children }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <BackgroundContainer>
      <OverlaySecondary />
      {isLargeScreen ? (
        <Content>{children}</Content>
      ) : (
        <ContentMobile>{children}</ContentMobile>
      )}
    </BackgroundContainer>
  );
}

export default SecondaryLayout;
