import { useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

import { useTheme } from '@mui/material/styles';

import {
  StyledBox,
  StyledTypographyPrimary,
  StyledTypographySecondary
} from '../styles';

import BookDetailsSkeleton from './BookDetailsSkeleton';
import { useErrorDispatch } from '../hooks/useError';
import { useBookByIdQuery } from '../hooks/queries';

function BookDetails() {
  const theme = useTheme();

  const id = useParams().id;
  const { book, loading, error } = useBookByIdQuery(id);

  const navigate = useNavigate();

  const imageSrc =
    theme.palette.mode === 'light'
      ? 'https://storage.yandexcloud.net/portfolio-kotik/book.jpg'
      : 'https://storage.yandexcloud.net/portfolio-kotik/book_inv.jpg';

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <StyledBox>
      <Stack spacing={8}>
        {loading && <BookDetailsSkeleton />}
        {!!book && (
          <Stack
            direction='row'
            spacing={4}
          >
            <Box
              display={{ xs: 'none', sm: 'flex' }}
              component='img'
              sx={{
                height: '200px',
                width: '150px',
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: 'cover',
                flexShrink: 0
              }}
            />
            <Stack spacing={1}>
              <StyledTypographyPrimary variant='h5'>
                {book.title}
              </StyledTypographyPrimary>
              <StyledTypographySecondary variant='subtitle2'>
                <Link
                  component={RouterLink}
                  to={`/authors/${book.authorId}`}
                  variant='inherit'
                  color='inherit'
                  underline='none'
                >
                  {book.author.firstName} {book.author.lastName}
                </Link>
              </StyledTypographySecondary>
              <StyledTypographySecondary variant='body2'>
                {book.published}
              </StyledTypographySecondary>
              <Box
                sx={{
                  paddingTop: '2rem',
                  width: {
                    xs: '100%',
                    md: 'calc(80vw - 300px)'
                  }
                }}
              >
                <StyledTypographySecondary variant='body2'>
                  {book.annotation}
                </StyledTypographySecondary>
              </Box>
            </Stack>
          </Stack>
        )}
        {!!book && (
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
    </StyledBox>
  );
}

export default BookDetails;
