import { call, put, takeEvery } from 'redux-saga/effects';
import { Auth } from '../firebase';
import { actionType } from '../actions';

function* login(action) {
  try {
    const { data } = yield call(
      Auth.login,
      action.email,
      action.password,
    );

    yield put({
      type: actionType.LOGIN_SUCCESS,
      payload: data,
    });
    yield call(
      [localStorage, 'setItem'],
      'user',
      JSON.stringify(data),
    );
  } catch (error) {
    if (error.error) {
      yield put({
        type: actionType.LOGIN_FAILED,
        payload: error.error.message,
      });
    }
    console.log(error);
  }
}

function* signUp(action) {
  try {
    const { data } = yield call(
      Auth.signUp,
      action.email,
      action.password,
    );
    yield put({
      type: actionType.SIGN_UP_SUCCESS,
      payload: data,
    });
    yield call(
      [localStorage, 'setItem'],
      'user',
      JSON.stringify(data),
    );
  } catch (error) {
    if (error.error) {
      yield put({
        type: actionType.SIGN_UP_FAILED,
        payload: error.error.message,
      });
    }
    console.log(error);
  }
}

function* hotLogin(action) {
  try {
    let user = yield call([localStorage, 'getItem'], 'user');
    user = JSON.parse(user);
    if (user) {
      let { data } = yield call(Auth.refreshToken, user.refreshToken);
      data = {
        ...user,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
      };
      yield put({
        type: actionType.HOT_LOGIN_SUCCESS,
        payload: data,
      });
      yield call(
        [localStorage, 'setItem'],
        'user',
        JSON.stringify(data),
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetPassword(action) {
  try {
    yield call(Auth.resetPassword, action.email);
  } catch (error) {
    console.log(error);
  }
}

function* logOut(action) {
  yield call([localStorage, 'clear']);
  yield put({
    type: actionType.LOGOUT_SUCCESS,
  });
}

function* updateProfile(action) {
  try {
    let user = yield call([localStorage, 'getItem'], 'user');
    user = JSON.parse(user);
    yield call(
      Auth.updateProfile,
      user.idToken,
      action.displayName,
      action.photoUrl,
    );
    let payload = {};
    if (action.displayName) {
      payload.displayName = action.displayName;
    }
    if (action.photoUrl) {
      payload.profilePicture = action.photoUrl;
    }
    yield put({
      type: actionType.UPDATE_PROFILE_SUCCESS,
      payload: payload,
    });
    user = {
      ...user,
      ...payload,
    };
    yield call(
      [localStorage, 'setItem'],
      'user',
      JSON.stringify(user),
    );
  } catch (error) {
    console.log();
  }
}

function* changPassword(action) {
  yield put({
    type: actionType.CHANGING_PASSOWRD,
  });
  let user = yield call([localStorage, 'getItem'], 'user');
  user = JSON.parse(user);
  try {
    const responese = yield call(
      Auth.login,
      action.email,
      action.password,
    );
    user = {
      ...user,
      idToken: responese.data.idToken,
      refreshToken: responese.data.refreshToken,
    };
    yield put({
      type: actionType.PASSWORD_AUTH_SUCCESS,
      payload: user,
    });
  } catch (error) {
    yield put({
      type: actionType.PASSWORD_AUTH_FAILED,
      payload: error.error.errors[0].message,
    });
    return;
  }
  try {
    const { data } = yield call(
      Auth.changePassword,
      user.idToken,
      action.newPassword,
    );
    user = {
      ...user,
      idToken: data.idToken,
      refreshToken: data.refreshToken,
    };
    yield put({
      type: actionType.CHANGE_PASSWORD_SUCCESS,

      payload: { ...user, passwordHash: data.passwordHash },
    });
    yield call(
      [localStorage, 'setItem'],
      'user',
      JSON.stringify(user),
    );
  } catch (error) {
    yield put({
      type: actionType.CHANGE_PASSWORD_FAILED,
      payload: error.error.errors[0].message,
    });
  }
}

function* watchAuth() {
  yield takeEvery(actionType.LOGIN, login);
  yield takeEvery(actionType.SIGN_UP, signUp);
  yield takeEvery(actionType.HOT_LOGIN, hotLogin);
  yield takeEvery(actionType.RESET_PASSWORD, resetPassword);
  yield takeEvery(actionType.LOGOUT, logOut);
  yield takeEvery(actionType.UPDATE_PROFILE, updateProfile);
  yield takeEvery(actionType.CHANGE_PASSWORD, changPassword);
}

export default watchAuth;
