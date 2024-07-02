import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthorByIdQuery } from '../hooks/queryHooks';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useErrorDispatch } from '../hooks/useError';
import {
  StyledBox,
  StyledTypographyPrimary,
  StyledTypographySecondary
} from '../styles';

import BooksByAuthor from './BooksByAuthor';
import AuthorDetailsSkeleton from './AuthorDetailsSkeleton';

function AuthorDetails() {
  const id = useParams().id;
  const { author, loading, error } = useAuthorByIdQuery(id);

  //   'https://storage.yandexcloud.net/portfolio-kotik/blank_person_placeholder.svg';
  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  const imageSource = author?.profile;

  return (
    <StyledBox>
      <Stack spacing={8}>
        {loading && <AuthorDetailsSkeleton />}
        {!!author && (
          <Stack
            direction='row'
            spacing={4}
          >
            <Box
              component='img'
              sx={{
                height: '200px',
                width: '150px',
                backgroundImage: `url(${imageSource})`,
                backgroundSize: 'cover',
                flexShrink: 0
              }}
            />
            <Stack>
              <StyledTypographyPrimary variant='h5'>
                {`${author.firstName} ${author.lastName}`}
              </StyledTypographyPrimary>
              <StyledTypographySecondary variant='body2'>
                {author.born ? author.born : ''}
              </StyledTypographySecondary>
              <Box sx={{ paddingTop: '2rem', flexGrow: '1' }}>
                <StyledTypographySecondary variant='body2'>
                  {author.annotation}
                </StyledTypographySecondary>
              </Box>
            </Stack>
          </Stack>
        )}
        <BooksByAuthor />
      </Stack>
    </StyledBox>
  );
}

export default AuthorDetails;
