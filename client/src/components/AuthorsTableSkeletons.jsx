import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function AuthorTableSkeletons() {
  const items = Array.from({ length: 5 }).map((_, i) => i);
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      data-testid='author-table-skeleton'
    >
      {items.map(i => (
        <Box key={i}>
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem', width: '20rem' }}
            data-testid={`text-skeleton-${i}`}
          />
        </Box>
      ))}
    </Box>
  );
}

export default AuthorTableSkeletons;
