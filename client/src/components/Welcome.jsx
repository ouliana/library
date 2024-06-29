import { useContext } from 'react';

import WelcomeText from './WelcomeText';
import UserFavorites from './UserFavorites';
import TokenContext from '../contexts/TokenContext';

import { useUser } from '../hooks/useUser';

function Welcome() {
  const [token] = useContext(TokenContext);

  const { state } = useUser();

  if (!token) {
    return <WelcomeText />;
  }

  const { user, loading, error } = state;

  if (error) return `Error! ${error.message}`;

  if (loading) return <div>Loading...</div>;

  return <>{!!user && <UserFavorites user={user} />}</>;
}

export default Welcome;
