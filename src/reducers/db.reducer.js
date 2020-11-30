import { actionType } from '../actions';
const init = {
  likes: [],
  hasMore: true,
  loaded: false,
  cursor: 0,
};

const dbReducer = (state = init, action) => {
  switch (action.type) {
    case actionType.GET_LIKES_SUCCESS:
      return {
        likes: state.likes.concat(action.payload),
        hasMore: action.hasMore,
        loaded: true,
        cursor: action.cursor ? action.cursor : state.cursor,
      };
    case actionType.DEL_LIKE_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter(
          (item) => item.id !== action.payload,
        ),
      };
    case actionType.ADD_LIKE_SUCCESS:
      return {
        ...state,
        hasMore: true,
      };
    case actionType.LOGOUT_SUCCESS:
      return init;
    default:
      return state;
  }
};

export default dbReducer;
