import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GENRE } from '../graphql/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import BooksTable from './BooksTable';
import BooksTableSkeleton from './BooksTableSkeleton';

function BooksByGenre() {
  const id = useParams().id;
  const { loading, error, data } = useQuery(GENRE, {
    variables: { id: Number(id) }
  });

  if (error) return `Error! ${error.message}`;

  const books = data?.genreWithBooks.books;
  const name = data?.genreWithBooks.name;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : name}
      </Typography>
      {loading && <BooksTableSkeleton />}
      {!!data && <BooksTable books={books} />}
    </Box>
  );
}

export default BooksByGenre;
