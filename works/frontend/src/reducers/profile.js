import {
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  SUBSCRIBE_FROM_PROFILE,
  UNSUBSCRIBE_FROM_PROFILE,
  UNLOCK_PROFILE_VIDEO
} from "../actions/types";

const initialState = {
  isFetching: true,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    case CLEAR_PROFILE:
      return { isFetching: true };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case SUBSCRIBE_FROM_PROFILE:
      return {
        ...state,
        isSubscribed: !state.isSubscribed,
        subscribersCount: state.subscribersCount + 1,
      };
    case UNSUBSCRIBE_FROM_PROFILE:
      return {
        ...state,
        isSubscribed: !state.isSubscribed,
        subscribersCount: state.subscribersCount - 1,
      };

    case UNLOCK_PROFILE_VIDEO:
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

    default:
      return state;
  }
};

export default profile;
