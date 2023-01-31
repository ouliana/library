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
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      };
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person
          key={person.name}
          person={person}
        />
      ))}
    </div>
  );
};

export default App;
