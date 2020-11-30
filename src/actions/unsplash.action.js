import * as actions from './type';

export const listPhotos = (page, perPage) => {
  return {
    type: actions.LIST_PHOTOS,
    page,
    perPage,
  };
};

export const getPhoto = (id) => {
  return {
    type: actions.GET_PHOTO,
    id,
  };
};

export const clearPhoto = () => {
  return {
    type: actions.CLEAR_PHOTO,
  };
};

export const listCollections = (page, perPage) => {
  return {
    type: actions.LIST_COLLECTIONS,
    page,
    perPage,
  };
};

export const getCollection = (id) => {
  return {
    type: actions.GET_COLLECTION,
    id,
  };
};

export const getCollectionPhotos = (id, page, perPage) => {
  return {
    type: actions.GET_COLLECTION_PHOTO,
    id,
    page,
    perPage,
  };
};

export const clearCollection = () => {
  return {
    type: actions.CLEAR_COLLECTION,
  };
};

export const getUser = (username) => {
  return {
    type: actions.GET_USER,
    username,
  };
};

export const getUserPhotos = (username, page, perPage) => {
  return {
    type: actions.GET_USER_PHOTOS,
    username,
    page,
    perPage,
  };
};

export const getUserLikes = (username, page, perPage) => {
  return {
    type: actions.GET_USER_LIKES,
    username,
    page,
    perPage,
  };
};

export const getUserCollections = (username, page, perPage) => {
  return {
    type: actions.GET_USER_COLLECTIONS,
    username,
    page,
    perPage,
  };
};

export const clearUser = () => {
  return {
    type: actions.CLEAR_USER,
  };
};

export const searchPhotos = (keyword, page, per_page, filters) => {
  if (filters && !filters.orientation) {
    delete filters.orientation;
  }
  if (filters && !filters.color) {
    delete filters.color;
  }
  return {
    type: actions.SEARCH_PHOTOS,
    keyword,
    page,
    per_page,
    filters,
  };
};

export const searchUsers = (keyword, page, per_page) => {
  return {
    type: actions.SEARCH_USERS,
    keyword,
    page,
    per_page,
  };
};

export const searchCollections = (keyword, page, per_page) => {
  return {
    type: actions.SEARCH_COLLECTIONS,
    keyword,
    page,
    per_page,
  };
};

export const clearSearch = () => {
  return {
    type: actions.CLEAR_OLD_SEARCH,
  };
};

export const clearSearchPhotos = () => {
  return {
    type: actions.CLEAR_OLD_SEARCH_PHOTOS,
  };
};
