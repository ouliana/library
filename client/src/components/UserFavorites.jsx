import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';
import BooksTable from './BooksTable';
import GenresGrid from './GenresGrid';

function UserFavorites({ user }) {
  if (!user) return null;

  return (
    <Stack spacing={4}>
      <Box sx={{ paddingTop: '2rem' }}>
        <Typography
          variant='h4'
          gutterBottom
        >
          Любимые произведения
        </Typography>
        <BooksTable books={user.favoriteBooks} />
      </Box>

      <Box>
        <Typography
          variant='h4'
          gutterBottom
        >
          Жанры
        </Typography>
        <GenresGrid genres={user.favoriteGenres} />
      </Box>
    </Stack>
  );
}

export default UserFavorites;
