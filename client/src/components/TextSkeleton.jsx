import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

function TextSkeleton() {
  return (
    <Stack sx={{ paddingTop: '2rem', width: 'calc(100vw - 300px)' }}>
      <Typography variant='body2'>
        <Skeleton width='100%' />
      </Typography>
      <Typography variant='body2'>
        <Skeleton width='95%' />
      </Typography>
      <Typography variant='body2'>
        <Skeleton width='98%' />
      </Typography>
      <Typography variant='body2'>
        <Skeleton width='92%' />
      </Typography>
      <Typography variant='body2'>
        <Skeleton width='97%' />
      </Typography>
    </Stack>
  );
}

export default TextSkeleton;
