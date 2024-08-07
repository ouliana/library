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

import { useBookExists } from '../hooks/queries';

import { useFormik } from 'formik';
import { bookSchema } from '../yup-schema';

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
  const errorDispatch = useErrorDispatch();
  const successDispatch = useSuccessDispatch();

  const [successPayload, setSuccessPayload] = useState('');

  const {
    executeMutation,
    data,
    loading: mutationLoading,
    error: mutationError
  } = useCreateBookMutation();

  const formik = useFormik({
    initialValues: {
      authorId: '',
      title: '',
      published: '',
      annotation: '',
      genres: []
    },
    validationSchema: bookSchema,
    onSubmit: async values => {
      console.log(values);
      const { authorId, title, published, annotation, genres } = values;
      // await executeMutation({
      //   authorId,
      //   title,
      //   publish: Number(published),
      //   annotation,
      //   genres
      // });

      setSuccessPayload(
        `Книга ${title} автора ${existingBook.author.firstName} ${existingBook.author.lastName} успешно добавлен в библиотеку`
      );
      navigate('/books');
    }
  });

  const [toCheckExistence, setToCheckExistence] = useState(false);

  const {
    book: existingBook,
    loading: checkExistenceLoading,
    error: checkExistenceError
  } = useBookExists(
    formik.values.authorId,
    formik.values.title,
    toCheckExistence
  );

  useEffect(() => {
    if (!checkExistenceLoading) {
      if (existingBook !== null && existingBook !== undefined) {
        errorDispatch({
          type: 'SET',
          payload: {
            message: `Книга ${existingBook.title} автора ${existingBook.author.firstName} ${existingBook.author.lastName} уже существует в бибилиотеке`
          }
        });
      }
      setToCheckExistence(false);
    }
  }, [checkExistenceLoading, existingBook, errorDispatch]);

  useEffect(() => {
    if (mutationError) {
      errorDispatch({ type: 'SET', payload: mutationError });
    }
    if (checkExistenceError) {
      errorDispatch({ type: 'SET', payload: checkExistenceError });
    }
    if (data) {
      successDispatch({
        type: 'SET',
        payload: successPayload
      });
    }
  }, [
    data,
    mutationError,
    errorDispatch,
    successDispatch,
    successPayload,
    checkExistenceError
  ]);

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
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          id='bookForm'
          sx={{ '& .MuiTextField-root': { width: '100%' } }}
          noValidate
          autoComplete='off'
        >
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
                    value={formik.values.authorId}
                    label='Автор'
                    name='authorId'
                    onChange={formik.handleChange}
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
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={() => setToCheckExistence(true)}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              label='Дата первой публикации'
              name='published'
              value={formik.values.published}
              onChange={formik.handleChange}
              error={
                formik.touched.published && Boolean(formik.errors.published)
              }
              helperText={formik.touched.published && formik.errors.published}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Аннотация'
              name='annotation'
              value={formik.values.annotation}
              onChange={formik.handleChange}
              error={
                formik.touched.annotation && Boolean(formik.errors.annotation)
              }
              helperText={formik.touched.annotation && formik.errors.annotation}
            />
            {/* Жанры */}
            {genresLoading && <LinearProgress />}
            {!!genresItems && (
              <FormControl fullWidth>
                <InputLabel id='genres-label'>Жанр</InputLabel>
                <Select
                  labelId='genres-label'
                  name='genres'
                  multiple
                  value={formik.values.genres}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id='genre-chip'
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
        </Box>
        <Box sx={{ height: '2rem' }} />
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
        >
          <LoadingButton
            size='small'
            color='primary'
            loading={mutationLoading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
            sx={{ flexGrow: 0 }}
            type='submit'
            form='bookForm'
          >
            <span>Сохранить</span>
          </LoadingButton>
        </Stack>
      </FormPanel>
    </StyledBox>
  );
}

export default NewBook;
