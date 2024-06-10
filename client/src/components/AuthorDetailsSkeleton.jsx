import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { skeletonItems } from '../utils';

function AuthorDetailsSkeleton() {
  return (
    <Stack
      direction='row'
      spacing={4}
      justifyContent='flex-start'
      alignItems='stretch'
    >
      <Skeleton
        width={150}
        height={200}
        variant='rectangular'
      />
      <Stack>
        <Skeleton
          variant='text'
          sx={{ fontSize: '2rem' }}
          width='10rem'
        />
        <Skeleton
          variant='text'
          sx={{ fontSize: '1rem' }}
          width='4rem'
        />
        <Box sx={{ paddingTop: '2rem', width: 'calc(100vw - 300px)' }}>
          {skeletonItems.map(item => (
            <Typography
              variant='body2'
              key={item}
            >
              <Skeleton width='100%' />
            </Typography>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}

export default AuthorDetailsSkeleton;
