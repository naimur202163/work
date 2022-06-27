import {
  CREATE_NEW_PLAYLIST_SUCCESS,
  CREATE_NEW_PLAYLIST_FAIL,
  CREATE_NEW_PLAYLIST_REQUEST,
} from "../actions/types";

const createPlaylist = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_NEW_PLAYLIST_SUCCESS:
      return {
        loading: false,
        info: action.payload,
      };
    case CREATE_NEW_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createPlaylist;
