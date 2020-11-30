import { call, put, takeLatest } from 'redux-saga/effects';
import Unsplash, { toJson } from 'unsplash-js';
import { actionType } from '../actions';
import axios from 'axios';

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

function* fetchData() {
  yield put({
    type: actionType.FETCH_DATA,
  });
}

function* listPhotos(action) {
  yield* fetchData();
  try {
    const responese = yield call(
      unsplash.photos.listPhotos,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.LIST_PHOTOS_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getPhoto(action) {
  yield* fetchData();

  try {
    const responese = yield call(unsplash.photos.getPhoto, action.id);
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* listCollections(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.collections.listCollections,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.LIST_COLLECTIONS_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getCollection(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.collections.getCollection,
      action.id,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getCollectionPhotos(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.collections.getCollectionPhotos,
      action.id,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_COLLECTION_PHOTO_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getUser(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.users.profile,
      action.username,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getUserPhotos(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.users.photos,
      action.username,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_USER_PHOTOS_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getUserLikes(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.users.likes,
      action.username,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_USER_LIKES_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getUserCollections(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.users.collections,
      action.username,
      action.page,
      action.perPage,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.GET_USER_COLLECTIONS_SUCCESS,
      payload: data,
      hasMore: data.length === action.perPage,
      page: action.page,
    });
  } catch (error) {
    console.log(error);
  }
}

function* searchPhotos(action) {
  yield* fetchData();

  try {
    // const responese = yield call(
    //   unsplash.search.photos,
    //   action.keyword,
    //   action.page,
    //   action.per_page,
    //   action.filters,
    // );
    const config = {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        query: action.keyword,
        page: action.page,
        per_page: action.per_page,
        ...action.filters,
      },
    };
    const { data } = yield call(
      axios.get,
      'https://api.unsplash.com/search/photos',
      config,
    );
    // const data = yield call(toJson, responese);
    yield put({
      type: actionType.SEARCH_PHOTOS_SUCCESS,
      payload: data.results,
      hasMore: action.page < data.total_pages,
      page: action.page,
      total: data.total,
    });
  } catch (error) {
    console.log(error);
  }
}

function* searchCollections(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.search.collections,
      action.keyword,
      action.page,
      action.per_page,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.SEARCH_COLLECTIONS_SUCCESS,
      payload: data.results,
      hasMore: action.page < data.total_pages,
      page: action.page,
      total: data.total,
    });
  } catch (error) {
    console.log(error);
  }
}

function* searchUsers(action) {
  yield* fetchData();

  try {
    const responese = yield call(
      unsplash.search.users,
      action.keyword,
      action.page,
      action.per_page,
      action.filters,
    );
    const data = yield call(toJson, responese);
    yield put({
      type: actionType.SEARCH_USERS_SUCCESS,
      payload: data.results,
      hasMore: action.page < data.total_pages,
      page: action.page,
      total: data.total,
    });
  } catch (error) {
    console.log(error);
  }
}

function* watchUnsplash() {
  yield takeLatest(actionType.LIST_PHOTOS, listPhotos);
  yield takeLatest(actionType.GET_PHOTO, getPhoto);
  yield takeLatest(actionType.LIST_COLLECTIONS, listCollections);
  yield takeLatest(actionType.GET_COLLECTION, getCollection);
  yield takeLatest(
    actionType.GET_COLLECTION_PHOTO,
    getCollectionPhotos,
  );
  yield takeLatest(actionType.GET_USER, getUser);
  yield takeLatest(actionType.GET_USER_PHOTOS, getUserPhotos);
  yield takeLatest(actionType.GET_USER_LIKES, getUserLikes);
  yield takeLatest(
    actionType.GET_USER_COLLECTIONS,
    getUserCollections,
  );
  yield takeLatest(actionType.SEARCH_PHOTOS, searchPhotos);
  yield takeLatest(actionType.SEARCH_COLLECTIONS, searchCollections);
  yield takeLatest(actionType.SEARCH_USERS, searchUsers);
}

export default watchUnsplash;
