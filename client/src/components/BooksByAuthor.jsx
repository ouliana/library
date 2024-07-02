import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import BookListSkeletons from './BookListSkeletons';

import { StyledTypographyPrimary, StyledListItemText } from '../styles';
import { useBooksByAuthorIdQuery } from '../hooks/queryHooks';
import { useErrorDispatch } from '../hooks/useError';

function BooksByAuthor() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { books, loading, error } = useBooksByAuthorIdQuery(id);

  const errorDispatch = useErrorDispatch();
  useEffect(() => {
    if (error) {
      errorDispatch({ type: 'SET', payload: error });
    }
  }, [error, errorDispatch]);

  return (
    <Stack>
      <StyledTypographyPrimary
        variant='h6'
        gutterBottom
      >
        Произведения в библиотеке
      </StyledTypographyPrimary>
      {loading && <BookListSkeletons />}
      {!!books && (
        <List>
          {books.map(book => (
            <ListItem
              disablePadding
              key={book.id}
            >
              <ListItemButton onClick={() => navigate(`/books/${book.id}`)}>
                <StyledListItemText secondary={book.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}

export default BooksByAuthor;
