import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import BookListSkeletons from './BookListSkeletons';
import { BOOKS_BY_AUTHOR_ID } from '../graphql/queries';

function BooksByAuthor() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { loading, error, data } = useQuery(BOOKS_BY_AUTHOR_ID, {
    variables: { authorId: Number(id) }
  });

  if (error) return `Error! ${error.message}`;

  const books = data?.booksByAuthorId;

  return (
    <Box>
      <Typography
        variant='h6'
        gutterBottom
      >
        Произведения в библиотеке
      </Typography>
      {loading && <BookListSkeletons />}
      {!!data && (
        <List>
          {books.map(book => (
            <ListItem
              disablePadding
              key={book.id}
            >
              <ListItemButton onClick={() => navigate(`/books/${book.id}`)}>
                <ListItemText primary={book.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default BooksByAuthor;
