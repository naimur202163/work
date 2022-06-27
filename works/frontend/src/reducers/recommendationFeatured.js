import { GET_FEATURED, UNLOCK_FEATURED_VIDEO } from "../actions/types";
const initialState = {
  featuredFetching: true,
  featuredVideos: [],
};

const featured = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEATURED:
      return action.payload;
    case UNLOCK_FEATURED_VIDEO:
      const updatedVideos = [...state.featuredVideos].map(x=> {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      })
      return {
        ...state,
        featuredVideos: updatedVideos,
      };
      
    default:
      return state;
  }
};

export default featured;
