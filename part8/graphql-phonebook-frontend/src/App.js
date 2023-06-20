import { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS, FIND_PERSON, PERSON_ADDED } from './queries';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.reserStore();
  };

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;

      notify(`${addedPerson.name} added`);

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
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

// function that takes care of manipulating cache
export function updateCache(cache, query, addedPerson) {
  //  helper that is used to eliminate saving same person twice
  const uniqByName = a => {
    let seen = new Set();
    return a.filter(item => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
}

export default App;

