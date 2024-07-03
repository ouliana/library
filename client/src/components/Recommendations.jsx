import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useAllBooksByGenresQuery } from '../hooks/queries';

import BooksTableSkeleton from './BooksTableSkeleton';

import BooksTable from './BooksTable';
import { StyledBox, StyledTypographyPrimary } from '../styles';

import { useErrorDispatch } from '../hooks/useError';

function Recommendations() {
  const { state } = useUser();
  const { user, loading: userLoading, error: userError } = state;
  const favoriteGenres = user?.favoriteGenres || [];
  const {
    books,
    loading: booksLoading,
    error: booksError
  } = useAllBooksByGenresQuery(favoriteGenres);

  const errorDispatch = useErrorDispatch();

  useEffect(() => {
    if (userError) {
      errorDispatch({ type: 'SET', payload: userError });
    }
    if (booksError) {
      errorDispatch({ type: 'SET', payload: booksError });
    }
  }, [userError, booksError, errorDispatch]);

  return (
    <StyledBox>
      <StyledTypographyPrimary
        variant='h2'
        gutterBottom
      >
        Рекомендации
      </StyledTypographyPrimary>
      {userLoading || (booksLoading && <BooksTableSkeleton />)}
      {booksLoading && <BooksTableSkeleton />}
      {!!books && !!user && (
        <BooksTable
          books={books.filter(
            book => !user.favoriteBooks.find(fb => fb.id === book.id)
          )}
        />
      )}
    </StyledBox>
  );
}

export default Recommendations;
