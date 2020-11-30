import { call, put, takeLatest } from 'redux-saga/effects';
import { DB } from '../firebase';
import { actionType } from '../actions';

function* getLikes(action) {
  try {
    let { data } = yield call(DB.getLikes, action.id, action.cursor);
    if (data) {
      const payload = Object.values(data);
      const cursor = Math.max(
        ...payload.map((item) => item.add_at_time),
      );
      yield put({
        type: actionType.GET_LIKES_SUCCESS,
        payload: payload,
        hasMore: true,
        cursor: cursor,
      });
    } else {
      yield put({
        type: actionType.GET_LIKES_SUCCESS,
        payload: [],
        hasMore: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addLike(action) {
  try {
    let user = yield call([localStorage, 'getItem'], 'user');
    user = JSON.parse(user);
    yield call(DB.addLike, user.localId, action.id, action.payload);
    yield put({
      type: actionType.ADD_LIKE_SUCCESS,
    });
    yield put({
      type: actionType.UPDATE_PHOTO,
      payload: action.payload,
      id: action.id,
    });
  } catch (error) {
    console.log(error);
  }
}

function* removeLike(action) {
  let user = yield call([localStorage, 'getItem'], 'user');
  user = JSON.parse(user);
  try {
    yield put({
      type: actionType.DEL_LIKE_SUCCESS,
      payload: action.itemId,
    });
    yield call(DB.removeLike, user.localId, action.itemId);
  } catch (error) {
    console.log(error);
  }
}

function* watchDb() {
  yield takeLatest(actionType.GET_LIKES, getLikes);
  yield takeLatest(actionType.ADD_LIKE, addLike);
  yield takeLatest(actionType.DEL_LIKE, removeLike);
}

export default watchDb;
