import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import AuthorFormSkeleton from './AuthorFormSkeleton';

import { StyledBox, FormPanel } from '../styles';

import { useErrorDispatch } from '../hooks/useError';
import { useSuccessDispatch } from '../hooks/useSuccess';
import { useAuthorByIdQuery } from '../hooks/queries';
import { useUpdateAuthorMutation } from '../hooks/mutations';

function EditAuthor() {
  const id = useParams().id;
  const {
    author,
    loading: authorLoading,
    error: authorError
  } = useAuthorByIdQuery(id);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [born, setBorn] = useState('');
  const [profile, setProfile] = useState('');
  const [creditText, setCreditText] = useState('');
  const [creditLink, setCreditLink] = useState('');
  const [annotation, setAnnotation] = useState('');

  const [successPayload, setSuccessPayload] = useState('');

  const { executeMutation, data, loading, error } = useUpdateAuthorMutation();

  async function submit(event) {
    event.preventDefault();
    await executeMutation({
      id: Number(id),
      firstName,
      lastName,
      born: Number(born),
      profile,
      creditText,
      creditLink,
      annotation
    });

    setSuccessPayload(
      `Данные об авторе ${firstName} ${lastName} успешно изменены`
    );

    setFirstName('');
    setLastName('');
    setBorn('');
    setProfile('');
    setCreditText('');
    setCreditLink('');
    setAnnotation('');
    navigate(`/authors/${id}`);
  }

  useEffect(() => {
    if (author) {
      const {
        firstName,
        lastName,
        born,
        profile,
        creditText,
        creditLink,
        annotation
      } = author;

      setFirstName(firstName);
      setLastName(lastName);
      setBorn(born);
      setProfile(profile);
      setCreditText(creditText);
      setCreditLink(creditLink);
      setAnnotation(annotation);
    }
  }, [author]);

  const errorDispatch = useErrorDispatch();
  const successDispatch = useSuccessDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
    if (authorError) {
      errorDispatch({ type: 'SET', payload: authorError });
    }
    if (data) {
      successDispatch({
        type: 'SET',
        payload: successPayload
      });
    }
  }, [
    authorError,
    data,
    error,
    errorDispatch,
    successDispatch,
    successPayload
  ]);

  return (
    <StyledBox>
      <FormPanel elevation={1}>
        {authorLoading && <AuthorFormSkeleton />}
        {!!author && (
          <form onSubmit={submit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label='Фамилия'
                value={lastName}
                onChange={event => {
                  setLastName(event.target.value);
                }}
              />
              <TextField
                fullWidth
                label='Имя'
                value={firstName}
                onChange={event => {
                  setFirstName(event.target.value);
                }}
              />
              <TextField
                fullWidth
                label='Год рождения'
                value={born}
                onChange={event => {
                  setBorn(event.target.value);
                }}
              />
              <TextField
                fullWidth
                label='Изображение (url)'
                value={profile}
                onChange={event => {
                  setProfile(event.target.value);
                }}
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
                value={annotation}
                onChange={event => {
                  setAnnotation(event.target.value);
                }}
              />
            </Stack>
          </form>
        )}
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
            onClick={submit}
            loading={loading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
          >
            <span>Сохранить</span>
          </LoadingButton>
        </Stack>
      </FormPanel>
    </StyledBox>
  );
}
export default EditAuthor;
