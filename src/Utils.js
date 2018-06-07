import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';

export const SERVER_ADDRESS = 'http://localhost:1337';

export const getUserScore = async () => {
  try {
    return await get('/user/score');
  } catch (error) {
    console.log('there was an error getting user score', error);
    return '';
  }
};

const convertQueryToUrl = function(query) {
  let url = '';
  if (!isEmpty(query)) {
    url += '?';
    url += Object.keys(query)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
      .join('&');
  }
  return url;
};

export const get = async function(route, query) {
  const token = await AsyncStorage.getItem('token');
  let address = `${SERVER_ADDRESS}${route}${convertQueryToUrl(query)}`;

  const response = await fetch(address, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token
    }
  });

  if (response.status == 404) {
    throw new Error('404 not found');
  }

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  } else {
    //success
    return responseJson;
  }
};

export const post = async function(route, requestBody) {
  const token = await AsyncStorage.getItem('token');
  const address = `${SERVER_ADDRESS}${route}`;

  const response = await fetch(address, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token
    },
    body: JSON.stringify(requestBody)
  });

  if (response.status == 404) {
    throw new Error('404 not found');
  }

  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(responseJson.message);
  } else {
    //success
    return responseJson;
  }
};

export const registerDevice = async function() {
  try {
    console.log('register device');
    const deviceToken = await AsyncStorage.getItem('token');
    console.log('device token is', deviceToken);
    if (!deviceToken) {
      console.log('device not registered yet');
      const newToken = await post('/user/register');
      console.log('the new token is', newToken);
      await AsyncStorage.setItem('token', newToken);
    } else {
      console.log('device was already registered with token', deviceToken);
    }
  } catch (e) {
    console.log('Error::::', e);
  }
};
