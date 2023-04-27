import { useState, useEffect } from 'react';
import axios from 'axios';

function useField(type) {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue('');
  };

  return {
    attributes: {
      type,
      value,
      onChange,
    },
    clear,
  };
}

function useResource(baseUrl) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        var returnedResources = await axios.get(baseUrl);
        setResources(returnedResources.data);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, [baseUrl]);

  async function create(resource) {
    try {
      var createdResource = await axios.post(baseUrl, resource);
      setResources(resources.concat(createdResource.data));
    } catch (error) {
      throw new Error(error);
    }
  }

  const service = {
    create,
  };

  return [resources, service];
}

function App() {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = event => {
    event.preventDefault();
    noteService.create({ content: content.attributes.value });
    content.clear();
  };

  const handlePersonSubmit = event => {
    event.preventDefault();
    personService.create({
      name: name.attributes.value,
      number: number.attributes.value,
    });
    name.clear();
    number.clear();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.attributes} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.attributes} /> <br />
        number <input {...number.attributes} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
}

export default App;
