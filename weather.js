#!usr/bin/env/node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './sevices/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './sevices/log.service.js';
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './sevices/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не прердан token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не прердан город');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);

    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon)); // красивый вывод погоды
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('Не найдено города');
    } else if (error?.response?.status === 401) {
      printError('Не предан token');
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForcast();
};

initCLI();
