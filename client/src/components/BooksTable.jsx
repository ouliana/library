import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function BooksTable({ books }) {
  const navigate = useNavigate();
  const [showGenres, setShowGenres] = useState(false);

  const handleRowClick = book => {
    navigate(`/books/${book.id}`);
  };

  useEffect(() => {
    if (books && books.length && 'genres' in books[0]) {
      setShowGenres(true);
    }
  }, [books]);

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
            {showGenres && <TableCell align='center'>Жанр</TableCell>}
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
              <TableCell align='left'>
                {book.author.firstName} {book.author.lastName}
              </TableCell>
              <TableCell align='center'>{book.published}</TableCell>
              {showGenres && (
                <TableCell align='center'>
                  {book.genres?.map(genre => (
                    <Typography
                      key={genre.id}
                      variant='body2'
                    >
                      {genre.name}
                    </Typography>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksTable;
