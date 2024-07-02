import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries';
import { CREATE_BOOK } from '../graphql/mutations';
// import { GraphQLError } from 'graphql';
import { useAllGenresQuery } from '../hooks/queryHooks';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';

import { StyledBox, FormPanel } from '../styles';

import { useErrorDispatch } from '../hooks/useError';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(id, genres, theme) {
  return {
    fontWeight:
      genres.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function NewBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [published, setPublished] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [genres, setGenres] = useState([]);

  const { genres: genresItems, loading, error } = useAllGenresQuery();
  const theme = useTheme();
  const [genre, setGenre] = useState([]);

  const handleChange = event => {
    const {
      target: { value }
    } = event;
    setGenre(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  });

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <StyledBox>
      <FormPanel elevation={1}>
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <Typography
              variant='h6'
              align='left'
            >
              Автор
            </Typography>
            <Stack
              direction='row'
              spacing={2}
            >
              <TextField
                fullWidth
                label='Фамилия'
                value={firstName}
                onChange={event => {
                  setFirstName(event.target.value);
                }}
              />
              <TextField
                fullWidth
                label='Имя'
                value={lastName}
                onChange={event => {
                  setLastName(event.target.value);
                }}
              />
            </Stack>
            <Box sx={{ height: '1rem' }} />
            <Typography
              variant='h6'
              align='left'
            >
              Данные о книге
            </Typography>
            <TextField
              fullWidth
              label='Название'
              value={title}
              onChange={event => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              fullWidth
              label='Опубликована'
              value={published}
              onChange={event => {
                setPublished(event.target.value);
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Аннотация'
              value={annotation}
              onChange={event => {
                setAnnotation(event.target.value);
              }}
            />
            {/* Жанры */}
            {loading && <LinearProgress />}
            {!!genres && (
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Жанр</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={genre}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id='select-multiple-chip'
                      label='Жанр'
                    />
                  }
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip
                          key={value.id}
                          label={value.name}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {genresItems.map(genre => (
                    <MenuItem
                      key={genre.id}
                      value={genre}
                      style={getStyles(genre.id, genresItems, theme)}
                    >
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <button type='submit'>create book</button>
          </Stack>
        </form>
      </FormPanel>
    </StyledBox>
  );

  async function submit(event) {
    event.preventDefault();

    const intPublished = +published;

    createBook({
      variables: { title, firstName, lastName, published: intPublished, genres }
    });

    setTitle('');
    setPublished('');
    setGenres([]);
    navigate('/books');
  }
}

export default NewBook;
