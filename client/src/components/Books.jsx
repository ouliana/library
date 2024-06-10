import { useNavigate } from 'react-router-dom';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../graphql/queries';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
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

function Books() {
  const client = useApolloClient();
  const navigate = useNavigate();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      toast.success(`"${addedBook.title}" by ${addedBook.author} is added`, {
        position: toast.POSITION.TOP_RIGHT
      });

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        };
      });
    }
  });

  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (error) return `Error! ${error.message}`;

  const handleRowClick = book => {
    navigate(`/books/${book.id}`);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : 'Список произведений'}
      </Typography>
      <ToastContainer />

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
            {loading &&
              skeletonItems.map(item => (
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
            {!!data &&
              data.allBooks.map(book => (
                <TableRow
                  key={book.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover
                  onClick={() => handleRowClick(book)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align='left'>{book.title}</TableCell>
                  <TableCell align='center'>{book.author}</TableCell>
                  <TableCell align='center'>{book.published}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Books;
