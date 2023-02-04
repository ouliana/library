import Weather from './Weather';

const CountryListItem = ({ country, handleShow }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleShow(country.name.common)}>show</button>
    </div>
  );
};

const Country = ({ country }) => {
  const imageStyle = {
    height: 100,
    marginTop: 10,
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lan, index) => (
          <li key={index}>{lan}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        style={imageStyle}
        alt={country.flags.alt}
      />

      <Weather capital={country.capital} />
    </div>
  );
};

const View = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
      {countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map(country => (
          <CountryListItem
            key={country.cca2}
            country={country}
            handleShow={handleShow}
          />
        ))
      )}
    </div>
  );
};

export default View;
