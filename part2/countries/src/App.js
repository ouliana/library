import { useState, useEffect } from 'react';
import countriesService from './service/countries';
import SearchResult from './components/SearchResult';

function App() {
  const [search, setSearch] = useState('');
  const [countries, SetCountries] = useState([]);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!search) return;
    console.log('search', search);

    countriesService.getCountries(search).then(returnedCountries => {
      SetCountries(returnedCountries);
    });
  }, [search]);

  return (
    <div>
      find countries
      <input
        type='text'
        value={search}
        onChange={handleChange}
      />
      <SearchResult countries={countries} />
    </div>
  );
}

export default App;
