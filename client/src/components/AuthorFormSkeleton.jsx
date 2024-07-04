import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

function AuthorFormSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={100}
      />
    </Stack>
  );
}
export default AuthorFormSkeleton;
