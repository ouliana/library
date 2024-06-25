import { ME, ALL_BOOKS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function Recommendations() {
  const user = useQuery(ME);

  const books = useQuery(ALL_BOOKS, {
    variables: {
      genres: user.data?.me?.favoriteGenres.map(genre => Number(genre.id))
    },
    skip: user.loading || user.data?.me?.favoriteGenres.length === 0
  });

  // eslint-disable-next-line no-unused-vars
  const errors = user.error || books.error;
  const loading = user.loading || books.loading;

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h2>Recommendations</h2>
      <div>
        Books in your favorite genre{' '}
        <strong>{user.data?.me?.favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!!books &&
            books?.data?.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Recommendations;
