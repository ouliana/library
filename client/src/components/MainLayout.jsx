import { BackgroundContainer, Overlay, Content } from '../styles';

function MainLayout({ children }) {
  return (
    <BackgroundContainer>
      <Overlay />
      <Content>{children}</Content>
    </BackgroundContainer>
  );
}

export default MainLayout;
