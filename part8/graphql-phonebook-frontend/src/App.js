import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS, FIND_PERSON } from './queries';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.reserStore();
  };

  const notity = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notity}
        />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notity} />
      <PhoneForm setError={notity} />
    </div>
  );
}

function Notify({ errorMessage }) {
  if (!errorMessage) return null;

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
}

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

export default App;

