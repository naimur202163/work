import {
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_REQUEST,
} from "../actions/types";

const deletePlaylist = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PLAYLIST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case DELETE_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deletePlaylist;
