import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';

const useMeQuery = token => {
  const { data, loading, error } = useQuery(CURRENT_USER, {
    skip: !token
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
      console.error('GraphQL query error:', error);
    } else {
      setHasError(false);
    }
  }, [error]);

  return { data, loading, hasError };
};

export default useMeQuery;
