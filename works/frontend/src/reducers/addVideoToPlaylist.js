import {
  ADD_VIDEO_TO_PLAYLIST_SUCCESS,
  ADD_VIDEO_TO_PLAYLIST_FAIL,
  ADD_VIDEO_TO_PLAYLIST_REQUEST,
  ADD_VIDEO_TO_PLAYLIST_RESET,
} from "../actions/types";

const addVideoToPlaylist = (state = {}, action) => {
  switch (action.type) {
    case ADD_VIDEO_TO_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case ADD_VIDEO_TO_PLAYLIST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case ADD_VIDEO_TO_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_VIDEO_TO_PLAYLIST_RESET:
      return {
        message: null,
      };
    default:
      return state;
  }
};

export default addVideoToPlaylist;
