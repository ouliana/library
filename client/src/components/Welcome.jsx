import { useContext } from 'react';

import { useQuery } from '@apollo/client';
import TokenContext from '../contexts/TokenContext';

import WelcomeText from './WelcomeText';
import UserFavorites from './UserFavorites';

import { ME } from '../graphql/queries';

function Welcome() {
  const [token] = useContext(TokenContext);
  const { data, error } = useQuery(ME, {
    skip: !token
  });

  if (error) return `Error! ${error.message}`;
  const user = data?.me;

  return <>{user ? <UserFavorites user={user} /> : <WelcomeText />}</>;
}

export default Welcome;
