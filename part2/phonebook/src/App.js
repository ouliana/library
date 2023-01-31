import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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
      <Filter
        query={query}
        handleQueryChange={handleQueryChange}
      />
      <h3>Add new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filtered} />
    </div>
  );
};

export default App;
