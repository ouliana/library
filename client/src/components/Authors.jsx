import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries';

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

function Authors({ token }) {
  const skeletonItems = Array.from({ length: 5 }).map((_, i) => i);
  const result = useQuery(ALL_AUTHORS);

  const authors = result.data?.allAuthors;

  let key = 0;
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant='h2'
        gutterBottom
      >
        {result.loading ? <Skeleton /> : 'Список авторов'}
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
            {result.loading &&
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
                  key={key++}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>{author.name}</TableCell>
                  <TableCell align='center'>{author.born}</TableCell>
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
