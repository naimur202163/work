import {
  GET_LIKED_VIDEOS,
  ADD_TO_LIKED_VIDEOS,
  REMOVE_FROM_LIKED_VIDEOS,
  UNLOCK_LIKE_VIDEO,
} from '../actions/types';

const initialState = {
  isFetching: true,
  videos: [],
};

const likedVideo = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIKED_VIDEOS:
      return action.payload;
    case ADD_TO_LIKED_VIDEOS:
      return {
        ...state,
        videos: [action.payload, ...state.videos],
      };
    case REMOVE_FROM_LIKED_VIDEOS:
      return {
        ...state,
        videos: state.videos.filter((video) => video.id !== action.payload),
      };
    case UNLOCK_LIKE_VIDEO:
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

export default likedVideo;
