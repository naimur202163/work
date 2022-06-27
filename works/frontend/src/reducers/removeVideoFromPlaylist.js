import {
  REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
  REMOVE_VIDEO_FROM_PLAYLIST_FAIL,
  REMOVE_VIDEO_FROM_PLAYLIST_REQUEST,
  REMOVE_VIDEO_FROM_PLAYLIST_RESET,
} from "../actions/types";

const removeVideoFromPlaylist = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_VIDEO_FROM_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case REMOVE_VIDEO_FROM_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REMOVE_VIDEO_FROM_PLAYLIST_RESET:
      return {
        message: null,
      };
    default:
      return state;
  }
};

export default removeVideoFromPlaylist;
