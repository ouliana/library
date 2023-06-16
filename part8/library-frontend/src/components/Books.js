import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

function Books() {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('');

  if (result.loading) return <div>loading...</div>;
  const books = result.data.allBooks;

  const genres = new Set();
  books.forEach(b => b.genres.forEach(g => genres.add(g)));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(b => !genre || b.genres.includes(genre))
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {Array.from(genres).map(genre => (
        <button onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  );
}

export default Books;
