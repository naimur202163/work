import {
  GET_ALL_PLAYLIST_SUCCESS,
  GET_ALL_PLAYLIST_FAIL,
  GET_ALL_PLAYLIST_REQUEST,
} from "../actions/types";

const getPlaylists = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PLAYLIST_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PLAYLIST_SUCCESS:
      return {
        loading: false,
        playlists: action.payload.playlists,
      };
    case GET_ALL_PLAYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getPlaylists;
