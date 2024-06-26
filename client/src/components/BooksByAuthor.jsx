import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import BookListSkeletons from './BookListSkeletons';
import { BOOKS_BY_AUTHOR_ID } from '../graphql/queries';

import { StyledTypographyPrimary, StyledListItemText } from '../styles';

function BooksByAuthor() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { loading, error, data } = useQuery(BOOKS_BY_AUTHOR_ID, {
    variables: { authorId: Number(id) }
  });

  if (error) return `Error! ${error.message}`;

  const books = data?.booksByAuthorId;

  return (
    <Stack>
      <StyledTypographyPrimary
        variant='h6'
        gutterBottom
      >
        Произведения в библиотеке
      </StyledTypographyPrimary>
      {loading && <BookListSkeletons />}
      {!!data && (
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
