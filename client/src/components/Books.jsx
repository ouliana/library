import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';
// import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
// import { ALL_BOOKS, BOOK_ADDED } from '../graphql/queries';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import BooksTable from './BooksTable';
import BooksTableSkeleton from './BooksTableSkeleton';

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

  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (error) return `Error! ${error.message}`;

  const books = data?.allBooks;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : 'Список произведений'}
      </Typography>
      {loading && <BooksTableSkeleton />}
      {!!data && <BooksTable books={books} />}
    </Box>
  );
}

export default Books;
