import {
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  SUBSCRIBE_FROM_SEARCH_RESULTS,
  UNSUBSCRIBE_FROM_SEARCH_RESULTS,
  UNLOCK_SEARCH_VIDEO,
} from '../actions/types';

const initialState = {
  isFetching: true,
};

const searchResult = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.payload;
    case SUBSCRIBE_FROM_SEARCH_RESULTS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, isSubscribed: !user.isSubscribed }
            : user
        ),
      };
    case UNSUBSCRIBE_FROM_SEARCH_RESULTS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload
            ? { ...user, isSubscribed: !user.isSubscribed }
            : user
        ),
      };
    case UNLOCK_SEARCH_VIDEO:
      const updatedVideos = [...state.videos].map((x) => {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      });
      return {
        ...state,
        videos: updatedVideos,
      };
    case CLEAR_SEARCH_RESULTS:
      return { isFetching: true };
    default:
      return state;
  }
};

export default searchResult;
