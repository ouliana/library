import { useState } from 'react';

const Person = ({ name }) => {
  return <div>{name}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = event => {
    setNewName(event.target.value);
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
      };
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('');
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person
          key={person.name}
          name={person.name}
        />
      ))}
    </div>
  );
};

export default App;
