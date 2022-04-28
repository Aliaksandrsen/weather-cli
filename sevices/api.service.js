import axios from 'axios';
import https from 'https';
import { getValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async (city) => {
  const token = await getValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error(
      'Не задан ключ API, задайте его через команду weather -t [API_KEY]'
    );
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    }
  );

  return data;
};

export { getWeather };
