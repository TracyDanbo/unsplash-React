import * as actions from './type';

export const login = (email, password) => {
  return {
    type: actions.LOGIN,
    email,
    password,
  };
};

export const signUp = (email, password) => {
  return {
    type: actions.SIGN_UP,
    email,
    password,
  };
};

export const logOut = () => {
  return {
    type: actions.LOGOUT,
  };
};

export const hotLogin = () => {
  return {
    type: actions.HOT_LOGIN,
  };
};

export const resetPassword = (email) => {
  return {
    type: actions.RESET_PASSWORD,
    email,
  };
};

export const updatProfile = (displayName, photoUrl) => {
  return {
    type: actions.UPDATE_PROFILE,
    displayName,
    photoUrl,
  };
};

export const changePassword = (email, password, newPassword) => {
  return {
    type: actions.CHANGE_PASSWORD,
    email,
    password,
    newPassword,
  };
};

export const clearError = () => {
  return {
    type: actions.CLEAR_ERROR,
  };
};

export const authCleanHash = () => {
  return {
    type: actions.AUTH_CLEAN_HASH,
  };
};
