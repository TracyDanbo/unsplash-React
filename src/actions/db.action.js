import * as actions from './type';

export const getLikes = (id, cursor) => {
  return {
    type: actions.GET_LIKES,
    id,
    cursor,
  };
};

export const addLike = (id, payload) => {
  return {
    type: actions.ADD_LIKE,
    id,
    payload,
  };
};

export const removeLike = (itemId) => {
  return {
    type: actions.DEL_LIKE,
    itemId,
  };
};
