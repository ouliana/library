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
      data-testid='author-details-skeleton'
    >
      <Skeleton
        width={150}
        height={200}
        variant='rectangular'
        data-testid='image-skeleton'
      />
      <Stack>
        <Skeleton
          variant='text'
          sx={{ fontSize: '2rem' }}
          width='10rem'
          data-testid='name-skeleton'
        />
        <Skeleton
          variant='text'
          sx={{ fontSize: '1rem' }}
          width='4rem'
          data-testid='born-skeleton'
        />
        <TextSkeleton />
      </Stack>
    </Stack>
  );
}

export default AuthorDetailsSkeleton;
