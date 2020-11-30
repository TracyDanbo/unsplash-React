import axios from 'axios';
const firebase = axios.create({
  baseURL: `https://${process.env.REACT_APP_PROJECT}.firebaseio.com/`,
});

firebase.interceptors.request.use(function (config) {
  config = {
    ...config,
    params: {
      auth: process.env.REACT_APP_FIREBASE_DB_SECRET_KEY,
      ...config.params,
    },
  };
  return config;
});

export function getLikes(localId, cursor) {
  let params = {};
  if (cursor) {
    params = {
      orderBy: '"add_at_time"',
      limitToFirst: 5,
      startAt: cursor,
    };
  } else {
    params = {
      orderBy: '"add_at_time"',
      limitToFirst: 5,
    };
  }
  return firebase.get(`users/${localId}/likes.json`, {
    params: params,
  });
}

export function addLike(localId, id, payload) {
  return firebase.put(`users/${localId}/likes/${id}.json`, payload);
}

export function removeLike(localId, itemId) {
  return firebase.delete(`users/${localId}/likes/${itemId}.json`);
}
