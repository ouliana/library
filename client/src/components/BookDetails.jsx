import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BOOK_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

function BookDetails() {
  const theme = useTheme();

  const id = useParams().id;
  const { loading, error, data } = useQuery(BOOK_BY_ID, {
    variables: { id: Number(id) }
  });

  const [imageLoading, setImageLoading] = useState(true);
  const imageSrc =
    theme.palette.mode === 'light'
      ? 'https://storage.yandexcloud.net/portfolio-kotik/book.jpg'
      : 'https://storage.yandexcloud.net/portfolio-kotik/book_inv.jpg';

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (error) return `Error! ${error.message}`;

  const book = data?.bookById;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      {imageLoading && (
        <Box xs={{ width: '150px', height: '200px' }}>
          <Skeleton
            variant='rounded'
            width={150}
            height={200}
          />
        </Box>
      )}
      <CardMedia
        component='img'
        sx={{ width: 150 }}
        image={imageSrc}
        onLoad={handleImageLoad}
        style={{ display: imageLoading ? 'none' : 'block' }}
        alt=''
      />
      <Box xs={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          {/* <CardContent sx={{ flex: '1 0 auto' }}> */}
          <Typography variant='h5'>
            {loading ? <Skeleton width='24rem' /> : book.title}
          </Typography>
          <Typography variant='subtitle2'>
            {loading ? (
              <Skeleton width='10rem' />
            ) : (
              <Link
                href={`/authors/${book.authorId}`}
                variant='inherit'
                color='inherit'
                underline='none'
              >
                {book.author}
              </Link>
            )}
          </Typography>
          <Typography variant='body2'>
            {loading ? <Skeleton width='4rem' /> : book.published}
          </Typography>
          <Box sx={{ paddingTop: '2rem' }}>
            <Typography variant='body2'>
              {loading ? <Skeleton width='4rem' /> : book.annotation}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BookDetails;
