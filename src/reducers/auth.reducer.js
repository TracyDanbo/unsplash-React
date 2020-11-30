import { actionType } from '../actions';
const init = {
  isLogin: false,
  changingPassword: false,
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,

        ...action.payload,
      };
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        isLogin: false,
        login_error: action.payload,
      };
    case actionType.SIGN_UP_SUCCESS:
      return {
        isLogin: true,

        ...action.payload,
      };
    case actionType.SIGN_UP_FAILED:
      return {
        ...state,

        isLogin: false,
        signUp_error: action.payload,
      };
    case actionType.HOT_LOGIN_SUCCESS:
      return {
        ...state,

        isLogin: true,
        ...action.payload,
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        isLogin: false,
      };
    case actionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.CHANGING_PASSOWRD:
      return {
        ...state,
        changingPassword: true,
      };
    case actionType.PASSWORD_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actionType.PASSWORD_AUTH_FAILED:
      return {
        ...state,
        changingPassword: false,
        change_password_error: action.payload,
      };
    case actionType.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changingPassword: false,
        change_password_error: action.payload,
      };
    case actionType.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        ...action.payload,
      };
    case actionType.AUTH_CLEAN_HASH:
      const { passwordHash, ...others } = state;
      return others;
    case actionType.CLEAR_ERROR:
      return {
        ...state,
        login_error: '',
        signUp_error: '',
      };
    default:
      return state;
  }
};

export default authReducer;
