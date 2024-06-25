import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries';
import { SET_BIRTH_YEAR } from '../graphql/mutations';

import Select from 'react-select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Skeleton from '@mui/material/Skeleton';
import { skeletonItems } from '../utils';

function Authors({ token }) {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const navigate = useNavigate();

  const authors = data?.allAuthors;

  if (error) return `Error! ${error.message}`;

  const handleRowClick = author => {
    navigate(`/authors/${author.id}`);
  };

  return (
    <Box sx={{ textAlign: 'center', width: '80%' }}>
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
      {token ? (
        <>
          <h3>Set birth year</h3>
          <BirthYearForm authors={authors} />
        </>
      ) : null}
    </Box>
  );
}

function BirthYearForm({ authors }) {
  const [born, setBorn] = useState('');

  const options = authors
    ? authors.map(a => ({ value: a.name, label: a.name }))
    : [];
  const [selectedOption, setSelectedOption] = useState(null);

  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );

  function submit(event) {
    event.preventDefault();

    console.log({ selectedOption });

    setBirthYear({ variables: { name: selectedOption.value, born: +born } });

    setSelectedOption(null);
    setBorn('');
  }
}

export default Authors;
