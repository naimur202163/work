import {
  REMOVE_VIDEO_FROM_SERIES_FAIL,
  REMOVE_VIDEO_FROM_SERIES_REQUEST,
  REMOVE_VIDEO_FROM_SERIES_SUCCESS,
  REMOVE_VIDEO_FROM_SERIES_RESET,
} from "../actions/types";

const removeVideoFromSeries = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_VIDEO_FROM_SERIES_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_VIDEO_FROM_SERIES_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case REMOVE_VIDEO_FROM_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case REMOVE_VIDEO_FROM_SERIES_RESET:
      return {
        message: null,
      };
    default:
      return state;
  }
};

export default removeVideoFromSeries;
