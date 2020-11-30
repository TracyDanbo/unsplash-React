import { actionType } from '../actions';
const init = {
  photos: [],
  photos_page: 1,
  photos_hasMore: true,
  photo: '',
  collections: [],
  collections_page: 1,
  collections_hasMore: true,
  collection: '',
  collection_photos: [],
  collection_photos_page: 1,
  collection_photos_hasMore: true,
  user: '',
  user_photos: [],
  user_photos_page: 1,
  user_photos_hasMore: true,
  user_likes: [],
  user_likes_page: 1,
  user_likes_hasMore: true,
  user_collections: [],
  user_collections_page: 1,
  user_collections_hasMore: true,
  search_photos: [],
  search_photos_total: 0,
  search_photos_page: 1,
  search_photos_hasMore: true,
  search_collections: [],
  search_collections_total: 0,
  search_collections_page: 1,
  search_collections_hasMore: true,
  search_users: [],
  search_users_total: 0,
  search_users_page: 1,
  search_users_hasMore: true,
  loaded: false,
};

const unsplashReducer = (state = init, action) => {
  switch (action.type) {
    case actionType.FETCH_DATA:
      return {
        ...state,
        loaded: false,
      };
    // photo
    case actionType.LIST_PHOTOS_SUCCESS:
      const photosId = new Set();
      state.photos.forEach((item) => photosId.add(item.id));
      const newItems = action.payload.filter(
        (item) => !photosId.has(item.id),
      );
      return {
        ...state,
        photos: state.photos.concat(newItems),
        photos_page: action.page,
        photos_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.GET_PHOTO_SUCCESS:
      return {
        ...state,
        photo: action.payload,
        loaded: true,
      };
    case actionType.CLEAR_PHOTO:
      return {
        ...state,
        photo: '',
      };
    // collection
    case actionType.LIST_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: state.collections.concat(action.payload),
        collections_page: action.page,
        collections_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.GET_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: action.payload,
        loaded: true,
      };
    case actionType.GET_COLLECTION_PHOTO_SUCCESS:
      return {
        ...state,
        collection_photos: state.collection_photos.concat(
          action.payload,
        ),
        collection_photos_page: action.page,
        collection_photos_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.CLEAR_COLLECTION:
      return {
        ...state,
        collection: '',
        collection_photos: [],
        collection_photos_page: 1,
        collection_photos_hasMore: true,
      };
    // user
    case actionType.CLEAR_USER:
      return {
        ...state,
        user: '',
        user_photos: [],
        user_photos_page: 1,
        user_photos_hasMore: true,
        user_likes: [],
        user_likes_page: 1,
        user_likes_hasMore: true,
        user_collections: [],
        user_collections_page: 1,
        user_collections_hasMore: true,
      };
    case actionType.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loaded: true,
      };
    case actionType.GET_USER_PHOTOS_SUCCESS:
      return {
        ...state,
        user_photos: state.user_photos.concat(action.payload),
        user_photos_page: action.page,
        user_photos_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.GET_USER_LIKES_SUCCESS:
      return {
        ...state,
        user_likes: state.user_likes.concat(action.payload),
        user_likes_page: action.page,
        user_likes_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.GET_USER_COLLECTIONS_SUCCESS:
      const userCollectionsId = new Set();
      state.user_collections.forEach((item) =>
        userCollectionsId.add(item.id),
      );
      const newUserCollortions = action.payload.filter(
        (item) => !userCollectionsId.has(item.id),
      );
      return {
        ...state,
        user_collections: state.user_collections.concat(
          newUserCollortions,
        ),
        user_collections_page: action.page,
        user_collections_hasMore: action.hasMore,
        loaded: true,
      };
    // search
    case actionType.SEARCH_PHOTOS_SUCCESS:
      return {
        ...state,
        search_photos: state.search_photos.concat(action.payload),
        search_photos_total: action.total,
        search_photos_page: action.page,
        search_photos_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        search_users: state.search_users.concat(action.payload),
        search_users_total: action.total,
        search_users_page: action.page,
        search_users_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.SEARCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        search_collections: state.search_collections.concat(
          action.payload,
        ),
        search_collections_total: action.total,
        search_collections_page: action.page,
        search_collections_hasMore: action.hasMore,
        loaded: true,
      };
    case actionType.CLEAR_OLD_SEARCH:
      return {
        ...state,
        search_photos: [],
        search_photos_total: 0,
        search_photos_page: 1,
        search_photos_hasMore: true,
        search_collections: [],
        search_collections_total: 0,
        search_collections_page: 1,
        search_collections_hasMore: true,
        search_users: [],
        search_users_total: 0,
        search_users_page: 1,
        search_users_hasMore: true,
      };
    case actionType.CLEAR_OLD_SEARCH_PHOTOS:
      return {
        ...state,
        search_photos: [],
        search_photos_total: 0,
        search_photos_page: 1,
        search_photos_hasMore: true,
      };
    case actionType.UPDATE_PHOTO:
      const updated_photos = state.photos.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.payload,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        photos: updated_photos,
      };
    default:
      return state;
  }
};

export default unsplashReducer;
