import {
  GET_SINGLE_SERIES_SUCCESS,
  GET_SINGLE_SERIES_FAIL,
  GET_SINGLE_SERIES_REQUEST,
} from "../actions/types";

const singleSeries = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_SINGLE_SERIES_REQUEST:
      return {
        loading: true,
      };
    case GET_SINGLE_SERIES_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        info: action.payload.seriesInfo,
        videos: action.payload.seriesVideos,
      };
    case GET_SINGLE_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default singleSeries;
