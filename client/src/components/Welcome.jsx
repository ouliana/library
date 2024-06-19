import { useContext } from 'react';

import { useQuery } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import WelcomeText from './WelcomeText';
import UserFavorites from './UserFavorites';
import {
  BackgroundContainer,
  Overlay,
  OverlaySecondary,
  Content
} from '../styles';

import { ME } from '../graphql/queries';

function Welcome() {
  // eslint-disable-next-line no-unused-vars
  const [token, dispatch] = useContext(TokenContext);
  const { data, error } = useQuery(ME, {
    skip: !token // Skip the query if userId is null
  });

  if (error) return `Error! ${error.message}`;
  if (data) {
    console.log(data);
  }
  const user = data?.me;

  return (
    <BackgroundContainer>
      {user ? <OverlaySecondary /> : <Overlay />}
      <Content>
        {user ? <UserFavorites user={user} /> : <WelcomeText />}
      </Content>
    </BackgroundContainer>
  );
}

export default Welcome;
