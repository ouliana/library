import { useState } from 'react';

const Person = ({ person }) => {
  const { name, number } = person;

  return (
    <div>
      {name} {number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isUnique = persons.reduce(
      (res, curr) => res && curr.name !== newName,
      true
    );

    if (isUnique) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length,
      };
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('');
    setNewNumber('');
  };

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const filtered =
    query === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with{' '}
        <input
          type='text'
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <h3>Add new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Name:{' '}
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:{' '}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {filtered.map(person => (
        <Person
          key={person.name}
          person={person}
        />
      ))}
    </div>
  );
};

export default App;
