import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

function TextSkeleton() {
  return (
    <Stack sx={{ paddingTop: '2rem', width: 'calc(100vw - 300px)' }}>
      <Typography variant='body2'>
        <Skeleton
          width='100%'
          data-testid='text-skeleton-1'
        />
      </Typography>
      <Typography variant='body2'>
        <Skeleton
          width='95%'
          data-testid='text-skeleton-2'
        />
      </Typography>
      <Typography variant='body2'>
        <Skeleton
          width='98%'
          data-testid='text-skeleton-3'
        />
      </Typography>
      <Typography variant='body2'>
        <Skeleton
          width='92%'
          data-testid='text-skeleton-4'
        />
      </Typography>
      <Typography variant='body2'>
        <Skeleton
          width='97%'
          data-testid='text-skeleton-5'
        />
      </Typography>
    </Stack>
  );
}

export default TextSkeleton;
