import axios from 'axios';
const firebase = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

firebase.interceptors.request.use(function (config) {
  config.params = {
    ...config.params,
    key: process.env.REACT_APP_FIREBASE_API_KEY,
  };
  return config;
});

firebase.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export function login(email, password) {
  return firebase.post('accounts:signInWithPassword', {
    email,
    password,
    returnSecureToken: true,
  });
}

export function signUp(email, password) {
  return firebase.post('accounts:signUp', {
    email,
    password,
    returnSecureToken: true,
  });
}

export function resetPassword(email) {
  return firebase.post('accounts:sendOobCode', {
    email,
    requestType: 'PASSWORD_RESET',
  });
}

export function changePassword(token, password) {
  return firebase.post('accounts:update', {
    idToken: token,
    password: password,
    returnSecureToken: true,
  });
}

export function updateProfile(token, displayName, photoUrl) {
  let data = {};
  if (displayName) {
    data.displayName = displayName;
  }
  if (photoUrl) {
    data.photoUrl = photoUrl;
  }
  return firebase.post('accounts:update', {
    idToken: token,
    ...data,
    returnSecureToken: true,
  });
}

export function getAccountInfo(token) {
  return firebase.post('accounts:lookup', {
    idToken: token,
  });
}

export function refreshToken(token) {
  return axios.post(
    'https://securetoken.googleapis.com/v1/token',
    {
      grant_type: 'refresh_token',
      refresh_token: token,
    },
    { params: { key: process.env.REACT_APP_FIREBASE_API_KEY } },
  );
}
