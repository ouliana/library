import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { skeletonItems } from '../utils';

function BooksTableSkeleton() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='athors table'
      >
        <TableHead>
          <TableRow>
            <TableCell align='left'>Название</TableCell>
            <TableCell align='center'>Автор</TableCell>
            <TableCell align='center'>Год</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skeletonItems.map(item => (
            <TableRow
              key={item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Typography variant='body2'>
                  <Skeleton width='24rem' />
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>
                  <Skeleton width='10rem' />
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>
                  <Skeleton width='4rem' />
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksTableSkeleton;
