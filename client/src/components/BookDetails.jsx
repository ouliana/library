import { useQuery } from '@apollo/client';
import { BOOK_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import BookDetailsSkeleton from './BookDetailsSkeleton';

function BookDetails() {
  const theme = useTheme();

  const id = useParams().id;
  const { loading, error, data } = useQuery(BOOK_BY_ID, {
    variables: { id: Number(id) }
  });

  const navigate = useNavigate();

  const imageSrc =
    theme.palette.mode === 'light'
      ? 'https://storage.yandexcloud.net/portfolio-kotik/book.jpg'
      : 'https://storage.yandexcloud.net/portfolio-kotik/book_inv.jpg';

  if (error) return `Error! ${error.message}`;

  const book = data?.bookById;

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <Stack spacing={8}>
        {loading && <BookDetailsSkeleton />}
        {!!data && (
          <Stack
            direction='row'
            spacing={4}
            justifyContent='flex-start'
          >
            <Box
              component='img'
              sx={{
                height: '200px',
                width: '150px',
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover'
              }}
            />
            <Stack>
              <Typography variant='h5'>{book.title}</Typography>
              <Typography variant='subtitle2'>
                <Link
                  href={`/authors/${book.authorId}`}
                  variant='inherit'
                  color='inherit'
                  underline='none'
                >
                  {book.author}
                </Link>
              </Typography>
              <Typography variant='body2'>{book.published}</Typography>
              <Box sx={{ paddingTop: '2rem', width: 'calc(100vw - 300px)' }}>
                <Typography variant='body2'>{book.annotation}</Typography>
              </Box>
            </Stack>
          </Stack>
        )}
        {!!data && (
          <Stack
            direction='row'
            spacing={1}
          >
            {book.genres.map(genre => (
              <Chip
                key={genre.id}
                label={genre.name}
                onClick={() => navigate(`/genres/${genre.id}`)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default BookDetails;
