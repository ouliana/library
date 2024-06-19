import WelcomeText from './WelcomeText';
import { BackgroundContainer, Overlay, Content } from '../styles';

function Welcome() {
  return (
    <BackgroundContainer>
      <Overlay />
      <Content>
        <WelcomeText />
      </Content>
    </BackgroundContainer>
  );
}

export default Welcome;
