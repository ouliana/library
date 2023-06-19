import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries';

import Select from 'react-select';

function Authors({ token }) {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? (
        <>
          <h3>Set birth year</h3>
          <BirthYearForm authors={authors} />
        </>
      ) : null}
    </div>
  );
}

function BirthYearForm({ authors }) {
  const [born, setBorn] = useState('');

  const options = authors.map(a => ({ value: a.name, label: a.name }));
  const [selectedOption, setSelectedOption] = useState(null);

  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );

  function submit(event) {
    event.preventDefault();

    console.log({ selectedOption });

    setBirthYear({ variables: { name: selectedOption.value, born: +born } });

    setSelectedOption(null);
    setBorn('');
  }
}

export default Authors;
