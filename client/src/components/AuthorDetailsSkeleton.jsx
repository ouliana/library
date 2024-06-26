import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TextSkeleton from './TextSkeleton';

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
        <TextSkeleton />
      </Stack>
    </Stack>
  );
}

export default AuthorDetailsSkeleton;
