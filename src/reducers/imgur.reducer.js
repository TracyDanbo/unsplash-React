import { actionType } from '../actions';
const init = {};

const imgur = (state = init, action) => {
  switch (action.type) {
    case actionType.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.DELETE_IMAGE_SUCCESS:
      return init;
    case actionType.IMGUR_DO_CLEAN:
      return init;
    default:
      return state;
  }
};

export default imgur;
