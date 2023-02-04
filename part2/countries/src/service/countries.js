import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const restcountries = 'https://restcountries.com/v3.1/name';
const openweathermapBaseUrl = 'http://api.openweathermap.org/data/2.5';

const getCountries = name => {
  console.log(name);
  return axios.get(`${restcountries}/${name}`).then(response => response.data);
};

const getWeather = capital => {
  return axios
    .get(
      `${openweathermapBaseUrl}/weather?q=${capital}&units=metric&appid=${api_key}`
    )
    .then(response => response.data);
};

const countriesService = { getCountries, getWeather };

export default countriesService;
