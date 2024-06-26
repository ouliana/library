import { useQuery } from '@apollo/client';
import { AUTHOR_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import {
  StyledBox,
  StyledTypographyPrimary,
  StyledTypographySecondary
} from '../styles';

import BooksByAuthor from './BooksByAuthor';
import AuthorDetailsSkeleton from './AuthorDetailsSkeleton';

function AuthorDetails() {
  const id = useParams().id;
  const { loading, error, data } = useQuery(AUTHOR_BY_ID, {
    variables: { id: Number(id) }
  });

  //   'https://storage.yandexcloud.net/portfolio-kotik/blank_person_placeholder.svg';

  const author = data?.authorById;
  const imageSource = data?.authorById.profile;

  if (error) return `Error! ${error.message}`;

  return (
    <StyledBox>
      <Stack spacing={8}>
        {loading && <AuthorDetailsSkeleton />}
        {!!data && (
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
