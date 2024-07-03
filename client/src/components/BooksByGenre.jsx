import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useBooksByGenre } from '../hooks/queries';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import BooksTable from './BooksTable';
import BooksTableSkeleton from './BooksTableSkeleton';
import { StyledBox } from '../styles';

import { useErrorDispatch } from '../hooks/useError';

function BooksByGenre() {
  const id = useParams().id;
  const { name, books, loading, error } = useBooksByGenre(id);

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <StyledBox>
      <Typography
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : name}
      </Typography>
      {loading && <BooksTableSkeleton />}
      {!!books && <BooksTable books={books} />}
    </StyledBox>
  );
}

export default BooksByGenre;
