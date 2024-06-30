import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';

const useAllBooksQuery = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data && !loading && !error) {
      setBooks(data.allBooks);
    }
  }, [data, loading, error]);

  return { books, loading, error };
};

export default useAllBooksQuery;
