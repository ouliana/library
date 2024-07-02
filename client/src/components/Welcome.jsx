import { useEffect } from 'react';
import WelcomeText from './WelcomeText';
import UserFavorites from './UserFavorites';
import BooksTableSkeleton from './BooksTableSkeleton';

import { useUser } from '../hooks/useUser';
import { useTokenValue } from '../hooks/useToken';
import { useErrorDispatch } from '../hooks/useError';

function Welcome() {
  const errorDispatch = useErrorDispatch();

  const token = useTokenValue();

  const { state } = useUser();
  const { user, loading, error } = state;

  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <>
      {token && loading && <BooksTableSkeleton />}
      {user ? <UserFavorites user={user} /> : <WelcomeText />}
    </>
  );
}

export default Welcome;
