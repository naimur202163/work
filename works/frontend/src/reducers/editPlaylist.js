import {
  EDIT_PLAYLIST_SUCCESS,
  EDIT_PLAYLIST_FAIL,
  EDIT_PLAYLIST_REQUEST,
} from "../actions/types";

const editPlaylist = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case EDIT_PLAYLIST_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case EDIT_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editPlaylist;
