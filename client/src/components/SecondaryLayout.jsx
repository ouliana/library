import {
  BackgroundContainer,
  OverlaySecondary,
  ContentSecondary
} from '../styles';

function SecondaryLayout({ children }) {
  return (
    <BackgroundContainer>
      <OverlaySecondary />
      <ContentSecondary>{children}</ContentSecondary>
    </BackgroundContainer>
  );
}

export default SecondaryLayout;
