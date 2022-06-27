import { GET_LATEST_VIDEOS, UNLOCK_LATEST_VIDEO } from "../actions/types";

const initialState = {
  isFetching: true,
  videos: [],
};

const latest = (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_VIDEOS:
      return action.payload;
    case UNLOCK_LATEST_VIDEO:
      const updatedVideos = [...state.videos].map(x=> {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      })
      return {
        ...state,
        videos: updatedVideos,
      };
    default:
      return state;
  }
};

export default latest;
