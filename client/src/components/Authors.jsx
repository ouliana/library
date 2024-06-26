import { useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import Skeleton from '@mui/material/Skeleton';
import { skeletonItems } from '../utils';
import { StyledBox } from '../styles';

function Authors() {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const navigate = useNavigate();

  const authors = data?.allAuthors;

  if (error) return `Error! ${error.message}`;

  const handleRowClick = author => {
    navigate(`/authors/${author.id}`);
  };

  return (
    <StyledBox>
      <Typography
        variant='h2'
        gutterBottom
      >
        {loading ? <Skeleton /> : 'Авторы'}
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label='athors table'
        >
          <TableHead>
            <TableRow>
              <TableCell align='left'>Имя</TableCell>
              <TableCell align='center'>Год рождения</TableCell>
              <TableCell align='center'>Произведения</TableCell>
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
                      <Skeleton width='20rem' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      <Skeleton width='4rem' />
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      <Skeleton width='2rem' />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            {!!authors &&
              authors.map(author => (
                <TableRow
                  key={author.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleRowClick(author)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align='left'>
                    {author.firstName} {author.lastName}
                  </TableCell>
                  <TableCell align='center'>
                    {author.born ? author.born : ''}
                  </TableCell>
                  <TableCell align='center'>{author.bookCount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
}

export default Authors;
