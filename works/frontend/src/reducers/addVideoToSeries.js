import {
  ADD_VIDEO_TO_SERIES_FAIL,
  ADD_VIDEO_TO_SERIES_REQUEST,
  ADD_VIDEO_TO_SERIES_SUCCESS,
  ADD_VIDEO_TO_SERIES_RESET,
} from "../actions/types";

const addVideoToSeries = (state = {}, action) => {
  switch (action.type) {
    case ADD_VIDEO_TO_SERIES_REQUEST:
      return {
        loading: true,
      };
    case ADD_VIDEO_TO_SERIES_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case ADD_VIDEO_TO_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_VIDEO_TO_SERIES_RESET:
      return {
        message: null,
      };
    default:
      return state;
  }
};

export default addVideoToSeries;
