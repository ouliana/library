import { useEffect } from 'react';
import {
  useQuery,
  useLazyQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Books() {
  const books = useQuery(ALL_BOOKS);
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      toast.success(`"${addedBook.title}" by ${addedBook.author} is added`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  if (books.data) {
    var genres = (function getGenres() {
      const result = new Set();
      books.data.allBooks.forEach(b => b.genres.forEach(g => result.add(g)));
      return Array.from(result);
    })();
  }

  useEffect(() => {
    getBooks();
  }, []); // eslint-disable-line

  return (
    <div>
      <h2>Books</h2>
      <ToastContainer />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks &&
            data?.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres &&
        genres.map(genre => (
          <button
            key={genre}
            onClick={() => getBooks({ variables: { genre } })}
          >
            {genre}
          </button>
        ))}
      <button
        key='all'
        onClick={() => getBooks({ variables: { genre: 'all' } })}
      >
        all genres
      </button>
    </div>
  );
}

export default Books;
