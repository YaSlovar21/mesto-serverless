//export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = 'https://d5d11c4rja6fao88re26.apigw.yandexcloud.net';

export const BASE_URL = 'https://api.app-mesto.kupcov.com';

export const login = (code) => {
  console.log(JSON.stringify({code}));
  return fetch(`${BASE_URL}/code-to-jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({code})
  })
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    headers: {
      'Authorization' : 'Bearer 2023haha',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
  })
  .then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
};


export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer 2023haha'
    },
    credentials: 'include',
  })
  .then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
}