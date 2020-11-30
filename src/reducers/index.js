import { combineReducers } from 'redux';
import unsplash from './unsplash.reducer';
import auth from './auth.reducer';
import db from './db.reducer';
import imgur from './imgur.reducer';

export const reducers = combineReducers({
  unsplash,
  auth,
  db,
  imgur,
});
