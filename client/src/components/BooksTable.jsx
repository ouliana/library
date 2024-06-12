import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BooksTable({ books }) {
  const navigate = useNavigate();

  const handleRowClick = book => {
    navigate(`/books/${book.id}`);
  };

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
          {books.map(book => (
            <TableRow
              key={book.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              onClick={() => handleRowClick(book)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell align='left'>{book.title}</TableCell>
              <TableCell align='left'>{book.author}</TableCell>
              <TableCell align='center'>{book.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksTable;
