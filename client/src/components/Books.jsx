import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Books() {
  // const books = useQuery(ALL_BOOKS);
  // eslint-disable-next-line no-unused-vars
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      toast.success(`"${addedBook.title}" by ${addedBook.author} is added`, {
        position: toast.POSITION.TOP_RIGHT
      });

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        };
      });
    }
  });

  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error.message}`;

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
          {!!data &&
            data.allBooks &&
            data.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
