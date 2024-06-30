import { useUser } from '../hooks/useUser';
import useAllBooksByGenresQuery from '../hooks/useAllBooksByGenresQuery';

import Typography from '@mui/material/Typography';
import BooksTableSkeleton from './BooksTableSkeleton';

import BooksTable from './BooksTable';
import { StyledBox } from '../styles';

function Recommendations() {
  // const { user, loading: userLoading, error: userError } = useUser();
  const { state } = useUser();
  const { user, loading: userLoading, error: userError } = state;
  const favoriteGenres = user?.favoriteGenres || [];
  const {
    books,
    loading: booksLoading,
    error: booksError
  } = useAllBooksByGenresQuery(favoriteGenres);

  if (userError) return <Typography>Error loading user data.</Typography>;
  if (booksError) return <Typography>Error loading books.</Typography>;

  return (
    <StyledBox>
      <Typography
        variant='h2'
        gutterBottom
      >
        Рекомендации
      </Typography>
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
