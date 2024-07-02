import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

import { StyledBox, StyledTypographyPrimary } from '../styles';

import BooksTable from './BooksTable';
import BooksTableSkeleton from './BooksTableSkeleton';

import { useAllBooksQuery } from '../hooks/queryHooks';
import { useErrorDispatch } from '../hooks/useError';

function Books() {
  // const client = useApolloClient();

  // useSubscription(BOOK_ADDED, {
  // onData: ({ data }) => {
  // const addedBook = data.data.bookAdded;
  // toast.success(`"${addedBook.title}" by ${addedBook.author} is added`, {
  //   position: toast.POSITION.TOP_RIGHT
  // });

  // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
  //   return {
  //     allBooks: allBooks.concat(addedBook)
  //   };
  // });
  // }
  // });

  // const { loading, error, data } = useQuery(ALL_BOOKS);

  // if (error) return `Error! ${error.message}`;
  const { books, loading, error } = useAllBooksQuery();

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <StyledBox>
      <StyledTypographyPrimary
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : 'Список произведений'}
      </StyledTypographyPrimary>
      {loading && <BooksTableSkeleton />}
      {!!books && <BooksTable books={books} />}
    </StyledBox>
  );
}

export default Books;
