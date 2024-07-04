import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllAuthorsQuery, useAllGenresQuery } from '../hooks/queries';
import { useCreateBookMutation } from '../hooks/mutations';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SaveIcon from '@mui/icons-material/Save';

import { StyledBox, FormPanel } from '../styles';

import { useErrorDispatch } from '../hooks/useError';
import { useSuccessDispatch } from '../hooks/useSuccess';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MAX_HEIGHT = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: MAX_HEIGHT,
      width: 250
    }
  }
};

function getStyles(id, items, theme) {
  return {
    fontWeight:
      items.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function NewBook() {
  const navigate = useNavigate();
  const [authorId, setAuthorId] = useState('');
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [genres, setGenres] = useState([]);

  const {
    executeMutation,
    data,
    loading: mutationLoading,
    error: mutationError
  } = useCreateBookMutation();

  const [successPayload, setSuccessPayload] = useState('');

  const {
    authors,
    loading: authorsLoading,
    error: authorsError
  } = useAllAuthorsQuery();

  const {
    genres: genresItems,
    loading: genresLoading,
    error: genresError
  } = useAllGenresQuery();
  const theme = useTheme();

  const getFullName = ({ firstName, lastName }) => {
    return [lastName, firstName].join(', ');
  };

  const handleGenresChange = event => {
    const {
      target: { value }
    } = event;
    setGenres(value);
  };
  const handleAuthorChange = event => {
    const {
      target: { value }
    } = event;
    setAuthorId(value);
  };

  async function submit(event) {
    event.preventDefault();

    await executeMutation({
      authorId: Number(authorId),
      title,
      published: Number(published),
      annotation,
      genres: genres.map(genre => Number(genre.id))
    });

    setSuccessPayload(`Книга ${title} успешно добавлена в библиотеку`);

    setAuthorId('');
    setTitle('');
    setPublished('');
    setAnnotation('');
    setGenres([]);
    navigate('/books');
  }

  const errorDispatch = useErrorDispatch();
  const successDispatch = useSuccessDispatch();

  useEffect(() => {
    if (genresError) {
      errorDispatch({ type: 'SET', payload: genresError });
    }
    if (authorsError) {
      errorDispatch({ type: 'SET', payload: authorsError });
    }
    if (mutationError) {
      errorDispatch({ type: 'SET', payload: mutationError });
    }
    if (data) {
      successDispatch({
        type: 'SET',
        payload: successPayload
      });
    }
  }, [
    data,
    authorsError,
    genresError,
    mutationError,
    errorDispatch,
    successDispatch,
    successPayload
  ]);

  return (
    <StyledBox>
      <FormPanel elevation={1}>
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
            >
              {authorsLoading && (
                <Skeleton
                  variant='rounded'
                  width='100%'
                  height={48}
                />
              )}
              {!!authors && (
                <FormControl fullWidth>
                  <InputLabel id='auhtorId-label'>Автор</InputLabel>
                  <Select
                    labelId='auhtorId-label'
                    value={authorId}
                    label='Автор'
                    onChange={handleAuthorChange}
                    sx={{ textAlign: 'left' }}
                  >
                    {authors.map((author, index, authors) => (
                      <MenuItem
                        key={author.id}
                        value={author.id}
                        style={getStyles(index, authors, theme)}
                      >
                        {getFullName(author)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <IconButton
                aria-label='Добавить автора'
                color='primary'
                sx={{ flexShrink: 0, width: '40px', height: '40px' }}
                onClick={() => navigate('/new-author')}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Stack>
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
              label='Дата первой публикации'
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
            {genresLoading && <LinearProgress />}
            {!!genres && (
              <FormControl fullWidth>
                <InputLabel id='multiple-chip-label'>Жанр</InputLabel>
                <Select
                  labelId='multiple-chip-label'
                  id='multiple-chip'
                  multiple
                  value={genres}
                  onChange={handleGenresChange}
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
          </Stack>
        </form>
        <Box sx={{ height: '2rem' }} />
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
        >
          {/* <Button>Назад</Button> */}
          <LoadingButton
            size='small'
            color='primary'
            onClick={submit}
            loading={mutationLoading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
            sx={{ flexGrow: 0 }}
          >
            <span>Сохранить</span>
          </LoadingButton>
        </Stack>
      </FormPanel>
    </StyledBox>
  );
}

export default NewBook;
