import { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

function Books() {
  const books = useQuery(ALL_BOOKS);
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);

  // if (loading || books.loading) {
  //   return <p>loading...</p>;
  // }

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
