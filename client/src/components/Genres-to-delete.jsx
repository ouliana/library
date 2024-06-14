import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

function Genres() {
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);

  // eslint-disable-next-line no-undef
  const [genres, setGenres] = useState(null);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error.message}`;

  if (data) {
    console.log(data);
    setGenres(
      (function getGenres() {
        const result = new Set();
        data.data.allBooks.forEach(b => b.genres.forEach(g => result.add(g)));
        return Array.from(result);
      })()
    );
  }

  return (
    <>
      {!!genres &&
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
    </>
  );
}

export default Genres;
