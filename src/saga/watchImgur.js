import { call, put, takeEvery } from 'redux-saga/effects';
import imgur from '../imgur';
import { actionType } from '../actions';

function* uploadImage(action) {
  try {
    const { data } = yield call(imgur.upload, action.dataUrl);
    yield put({
      type: actionType.UPLOAD_IMAGE_SUCCESS,
      payload: data.data,
    });
    yield put({
      type: actionType.UPDATE_PROFILE,
      photoUrl: data.data.link,
    });
    let user = yield call([localStorage, 'getItem'], 'user');
    user = JSON.parse(user);
    user = {
      ...user,
      profilePicture: data.data.link,
    };
    yield call(
      [localStorage, 'setItem'],
      'user',
      JSON.stringify(user),
    );
  } catch (error) {
    console.log(error);
  }
}

function* deleteImage(action) {
  try {
    const { data } = yield call(imgur.delete, action.hash);
    console.log(data);
    yield put({
      type: actionType.DELETE_IMAGE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
}

function* watchImgur() {
  yield takeEvery(actionType.UPLOAD_IMAGE, uploadImage);
  yield takeEvery(actionType.DELETE_IMAGE, deleteImage);
}

export default watchImgur;
