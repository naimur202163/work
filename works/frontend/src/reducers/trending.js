import { GET_TRENDING, UNLOCK_TRENDING_VIDEO } from "../actions/types";

const initialState = {
  isFetching: true,
  videos: [],
};

const trending = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRENDING:
      return action.payload;
    case UNLOCK_TRENDING_VIDEO:
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

export default trending;
