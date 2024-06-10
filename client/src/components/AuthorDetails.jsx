import { useQuery } from '@apollo/client';
import { AUTHOR_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

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
    <Stack spacing={8}>
      {loading && <AuthorDetailsSkeleton />}
      {!!data && (
        <Stack
          direction='row'
          spacing={4}
          justifyContent='flex-start'
          // alignItems='stretch'
        >
          <Box
            component='img'
            sx={{
              height: '200px',
              width: '150px',
              backgroundImage: `url(${imageSource})`,
              backgroundSize: 'cover'
            }}
          />
          <Stack>
            <Typography variant='h5'>
              {`${author.firstName} ${author.lastName}`}
            </Typography>
            <Typography variant='body2'>
              {author.born ? author.born : ''}
            </Typography>
            <Box sx={{ paddingTop: '2rem', width: 'calc(100vw - 300px)' }}>
              <Typography variant='body2'>{author.annotation}</Typography>
            </Box>
          </Stack>
        </Stack>
      )}
      <BooksByAuthor />
    </Stack>
  );
}

export default AuthorDetails;
