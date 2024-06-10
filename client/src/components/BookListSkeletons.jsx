import { skeletonItems } from '../utils';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function BookListSkeletons() {
  return (
    <Box
      xs={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      {skeletonItems.map(item => (
        <Skeleton key={item} />
      ))}
    </Box>
  );
}

export default BookListSkeletons;
