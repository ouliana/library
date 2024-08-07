import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

function AuthorFormSkeleton() {
  return (
    <Stack
      spacing={2}
      data-testid='author-form-skeleton'
    >
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
        data-testid='text-skeleton-1'
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
        data-testid='text-skeleton-2'
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
        data-testid='text-skeleton-3'
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={56}
        data-testid='text-skeleton-4'
      />
      <Skeleton
        variant='rounded'
        width='100%'
        height={100}
        data-testid='text-skeleton-5'
      />
    </Stack>
  );
}
export default AuthorFormSkeleton;
