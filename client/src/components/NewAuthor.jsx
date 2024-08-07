import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { StyledBox, FormPanel } from '../styles';

import { useErrorDispatch } from '../hooks/useError';
import { useSuccessDispatch } from '../hooks/useSuccess';
import { useCreateAuthorMutation } from '../hooks/mutations';
import { useAuthorExists } from '../hooks/queries';

import { useFormik } from 'formik';
import { authorSchema } from '../yup-schema';

function NewAuthor() {
  const navigate = useNavigate();
  const errorDispatch = useErrorDispatch();
  const successDispatch = useSuccessDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      born: '',
      profile: '',
      creditText: '',
      creditLink: '',
      annotation: ''
    },
    validationSchema: authorSchema,
    onSubmit: async values => {
      const {
        firstName,
        lastName,
        born,
        profile,
        creditText,
        creditLink,
        annotation
      } = values;
      await executeMutation({
        firstName,
        lastName,
        born: Number(born),
        profile,
        creditText,
        creditLink,
        annotation
      });

      setSuccessPayload(
        `Автор ${firstName} ${lastName} успешно добавлен в библиотеку`
      );
      navigate('/new-book');
    }
  });
  const [toCheckExistence, setToCheckExistence] = useState(false);

  const {
    author: existingAthor,
    loading: checkExistenceLoading,
    error: checkExistenceError
  } = useAuthorExists(
    formik.values.firstName,
    formik.values.lastName,
    toCheckExistence
  );

  const [successPayload, setSuccessPayload] = useState('');

  const { executeMutation, data, loading, error } = useCreateAuthorMutation();

  useEffect(() => {
    if (existingAthor !== null && existingAthor !== undefined) {
      errorDispatch({
        type: 'SET',
        payload: {
          message: `Автор ${formik.values.firstName} ${formik.values.lastName} уже существует в бибилиотеке`
        }
      });
    }
  }, [
    checkExistenceLoading,
    existingAthor,
    formik.values.firstName,
    formik.values.lastName,
    errorDispatch
  ]);

  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
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
    error,
    errorDispatch,
    successDispatch,
    successPayload,
    checkExistenceError
  ]);

  return (
    <StyledBox>
      <FormPanel elevation={1}>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          id='authorForm'
          sx={{ '& .MuiTextField-root': { width: '100%' } }}
          noValidate
          autoComplete='off'
        >
          <Stack spacing={2}>
            <TextField
              fullWidth
              label='Имя'
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={() => setToCheckExistence(true)}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            {/* lastName */}
            <TextField
              fullWidth
              label='Фамилия'
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={() => setToCheckExistence(true)}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            {/* born */}
            <TextField
              fullWidth
              label='Год рождения'
              name='born'
              value={formik.values.born}
              onChange={formik.handleChange}
              error={formik.touched.born && Boolean(formik.errors.born)}
              helperText={formik.touched.born && formik.errors.born}
            />
            {/* profile */}
            <TextField
              fullWidth
              label='Изображение (url)'
              name='profile'
              value={formik.values.profile}
              onChange={formik.handleChange}
              error={formik.touched.profile && Boolean(formik.errors.profile)}
              helperText={formik.touched.profile && formik.errors.profile}
            />
            {/* <TextField
              fullWidth
              label='Признание авторства (url)'
              value={creditLink}
              onChange={event => {
                setProfile(event.target.value);
              }}
            />
            <TextField
              fullWidth
              label='Признание авторства (текст ссылки)'
              value={creditText}
              onChange={event => {
                setProfile(event.target.value);
              }}
            /> */}
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
          </Stack>
        </Box>
        <Box sx={{ height: '2rem' }} />
        <Stack
          direction='row'
          spacing={2}
          justifyContent='space-between'
        >
          <Button
            component={RouterLink}
            to='/new-book'
          >
            Назад
          </Button>
          <LoadingButton
            size='small'
            color='primary'
            loading={loading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
            type='submit'
            form='authorForm'
          >
            <span>Сохранить</span>
          </LoadingButton>
        </Stack>
      </FormPanel>
    </StyledBox>
  );
}

export default NewAuthor;
