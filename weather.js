#!usr/bin/env/node
import { getArgs } from './helpers/args.js';
import { getWeather } from './sevices/api.service.js';
import { printHelp, printSuccess, printError } from './sevices/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './sevices/storage.service.js';

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

const getForcast = async (city) => {
  try {
    const weather = await getWeather('minsk');
    console.log(weather);
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
    printHelp();
  }

  if (args.s) {
    // saveKeyValue('city', args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getForcast();
};

initCLI();
