import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BooksTable from './BooksTable';
import GenresGrid from './GenresGrid';

import { StyledBox } from '../styles';

function UserFavorites({ user }) {
  if (!user) return null;

  return (
    <StyledBox>
      <Stack spacing={4}>
        <Box>
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
    </StyledBox>
  );
}

export default UserFavorites;
