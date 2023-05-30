import { useState } from 'react';
import { useQuery } from '@apollo/client';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS, FIND_PERSON } from './queries';

function Person({ person, onClose }) {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
}

function Persons({ persons }) {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000,
  // });

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  );
}

export default App;

