import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import PromisePolyfill from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

function useNotes(url) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await axios.get(url);
      setNotes(response.data);
    })();
  }, [url]);

  return notes;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );

  function handleClick() {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  }
}

export default App;
