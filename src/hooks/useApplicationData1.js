import { useState, useEffect } from 'react';
import axios from 'axios';

const initCoords = {
  lat: 0,
  lng: 0
};

const initWeath = {
  tempK: '',
  main: '',
  description: '',
  country: '',
  city: ''

};

const icons = {
  'Clouds': "fas fa-cloud",
  'Sun': 'far fa-sun'
};
const useApplicationData1 = () => {
  const [weather, setWeather] = useState(initWeath);
  const [coords, setCoords] = useState(initCoords);
  const [cels, setCels] = useState(true);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation);
  }, []);
  useEffect(() => {
    getWeather();
  }, [coords]);

  useEffect(() => {
    setIcon(icons[weather.main]);
  }, [weather]);
  const setLocation = position => {
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  };
  const getWeather = async () => {
    if (!coords.lat)
      return;

    const data = await axios
      .get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${coords.lat}&lon=${coords.lng}`);
    const A = data.data;
    setWeather({
      tempK: A.main.temp,
      main: A.weather[0].main,
      description: A.weather[0].description,
      country: A.sys.country,
      city: A.name
    });
  };
  const convertTemp = () => {
    setWeather({
      ...weather, tempK: getCOrF(weather.tempK)
    });
    setCels(prev => !prev);
  };

  const getCOrF = (temp) => {
    if (cels) return Math.floor((temp * 9 / 5 + 32) * 100) / 100;
    return Math.floor(((temp - 32) * 5 / 9) * 100) / 100;
  };

  return {
    weather,
    convertTemp,
    icon,
    cels
  };

};

export default useApplicationData1;