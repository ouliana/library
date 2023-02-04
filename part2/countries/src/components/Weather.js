import { useState, useEffect } from 'react';
import countriesService from '../service/countries';

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countriesService.getWeather(capital).then(returnedData => {
      let currentWeatherData = {
        temp: returnedData.main.temp,
        wind: returnedData.wind.speed,
        iconSrc: `http://openweathermap.org/img/wn/${returnedData.weather[0].icon}@2x.png`,
        desc: returnedData.weather[0].description,
      };
      setWeatherData({ ...currentWeatherData });
    });
  }, [capital]);

  if (!weatherData) return '';

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature {weatherData.temp} Celcius</div>
      <img
        src={weatherData.iconSrc}
        width={100}
        height={100}
        alt={weatherData.desc}
      />
      <div>wind {weatherData.wind} m/s</div>
    </div>
  );
};

export default Weather;
