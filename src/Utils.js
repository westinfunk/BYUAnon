import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';

export const SERVER_ADDRESS = 'http://localhost:3000';

const convertQueryToUrl = function(query) {
  let url = '';
  if (!isEmpty(query)) {
    url += '?';
    url += Object.keys(query)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(query[k]))
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
      Authorization: token
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
      Authorization: token
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
    const deviceToken = await AsyncStorage.getItem('token');
    if (deviceToken !== null) {
      const newToken = await get('/token');
      AsyncStorage.setItem('token', newToken);
    }
  } catch (e) {
    console.log('Error::::', e);
  }
};
