const Country = props => {
  const { country, details, handleShow } = props;

  if (!details) {
    return (
      <div>
        {country.name.common}
        <button onClick={() => handleShow(country.name.common)}>show</button>
      </div>
    );
  }

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
    </div>
  );
};

const SearchResult = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  const details = countries.length === 1;
  return (
    <div>
      {countries.map(country => (
        <Country
          key={country.cca2}
          country={country}
          details={details}
          handleShow={handleShow}
        />
      ))}
    </div>
  );
};

export default SearchResult;
