import * as actions from './type';

export const uploadImage = (dataUrl) => {
  return {
    type: actions.UPLOAD_IMAGE,
    dataUrl,
  };
};

export const deleteImage = (hash) => {
  return {
    type: actions.DELETE_IMAGE,
    hash,
  };
};

export const imgurDoClean = () => {
  return {
    type: actions.IMGUR_DO_CLEAN,
  };
};
