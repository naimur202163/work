import {
  GET_VIDEOS_BY_CATEGORY,
  UNLOCK_CATEGORY_VIDEO,
} from '../actions/types';

const initialState = {
  isFetching: true,
  videos: [],
};

const categoryVideos = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS_BY_CATEGORY:
      return action.payload;
    case UNLOCK_CATEGORY_VIDEO:
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

export default categoryVideos;
