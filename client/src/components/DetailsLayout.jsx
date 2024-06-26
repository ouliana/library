import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DetailsContainer, Content, ContentMobile } from '../styles';

function DetailsLayout({ children }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <DetailsContainer>
      {isLargeScreen ? (
        <Content>{children}</Content>
      ) : (
        <ContentMobile>{children}</ContentMobile>
      )}
    </DetailsContainer>
  );
}

export default DetailsLayout;
