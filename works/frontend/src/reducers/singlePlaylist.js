import {
  GET_SINGLE_PLAYLIST_SUCCESS,
  GET_SINGLE_PLAYLIST_FAIL,
  GET_SINGLE_PLAYLIST_REQUEST,
} from "../actions/types";

const singlePlaylist = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_SINGLE_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_PLAYLIST_SUCCESS:
      return {
        loading: false,
        info: action.payload.playlist,
        videos: action.payload.videosOfPlaylist,
        message: action.payload.message,
      };
    case GET_SINGLE_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default singlePlaylist;
