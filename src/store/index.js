import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers } from '../reducers';
import watchUnsplash from '../saga/watchUnplash';
import watchAuth from '../saga/wathcAuth';
import watchDb from '../saga/watchDb';
import watchImgur from '../saga/watchImgur';

// const composeEnhancers =
//   (typeof window !== 'undefined' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;
const saga = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(saga),
  // composeEnhancers(applyMiddleware(saga)),
);

saga.run(watchUnsplash);
saga.run(watchAuth);
saga.run(watchDb);
saga.run(watchImgur);

export default store;
