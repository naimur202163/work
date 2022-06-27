import {
  GET_VIDEO,
  CLEAR_VIDEO,
  ADD_COMMENT,
  SUBSCRIBE_FROM_VIDEO,
  UNSUBSCRIBE_FROM_VIDEO,
  LIKE,
  DISLIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  GET_VIDEO_CATEGORIES,
  GET_VIDEO_ACCESS_OVERLAYS,
  GET_HASHTAGS,
  UNLOCK_WATCH_VIDEO,
  UNLOCK_TAT_VIDEO,
} from '../actions/types';

const initialState = {
  isFetching: true,
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO:
      return action.payload;
    case CLEAR_VIDEO:
      return { isFetching: true };
    case UPDATE_VIDEO:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_VIDEO:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_COMMENT:
      if (state.isFetching) {
        return { ...state };
      }
      return {
        ...state,
        comments: [action.payload, ...(state.comments ? state.comments : [])],
      };
    case SUBSCRIBE_FROM_VIDEO:
      return {
        ...state,
        isSubscribed: !state.isSubscribed,
      };
    case UNSUBSCRIBE_FROM_VIDEO:
      return {
        ...state,
        isSubscribed: !state.isSubscribed,
      };
    case LIKE:
      return {
        ...state,
        isLiked: !state.isLiked,
        likesCount: state.likesCount + 1,
      };
    case DISLIKE:
      return {
        ...state,
        isDisliked: !state.isDisliked,
        dislikesCount: state.dislikesCount + 1,
      };
    case CANCEL_LIKE:
      return {
        ...state,
        isLiked: !state.isLiked,
        likesCount: state.likesCount - 1,
      };
    case CANCEL_DISLIKE:
      return {
        ...state,
        isDisliked: !state.isDisliked,
        dislikesCount: state.dislikesCount - 1,
      };
    case GET_VIDEO_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HASHTAGS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_VIDEO_ACCESS_OVERLAYS:
      return {
        ...state,
        ...action.payload,
      };
    case UNLOCK_WATCH_VIDEO:
      return {
        ...state,
        isVideoLocked:
          state.id === action.payload.videoId
            ? false
            : typeof state.isVideoLocked !== 'boolean' || false,
      };
    case UNLOCK_TAT_VIDEO:
      return {
        ...state,
        isTATVideoLocked:
          state.id === action.payload.videoId
            ? false
            : typeof state.isTATVideoLocked !== 'boolean' || false,
      };
    default:
      return state;
  }
};

export default video;
