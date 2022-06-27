import {
  GET_VIDEOS_FEATURED,
  UNLOCK_CATEGORY_FEATURED_VIDEO,
} from '../actions/types';

const initialState = {
  isFetching: true,
  featuredVideos: [],
};

const categoryFeatured = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS_FEATURED:
      return action.payload;

    case UNLOCK_CATEGORY_FEATURED_VIDEO:
      const updatedVideos = [...state.featuredVideos].map((x) => {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      });
      return {
        ...state,
        featuredVideos: updatedVideos,
      };

    default:
      return state;
  }
};

export default categoryFeatured;
