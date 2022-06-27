import {
  DELETE_SERIES_SUCCESS,
  DELETE_SERIES_FAIL,
  DELETE_SERIES_REQUEST,
} from "../actions/types";

const deleteSeries = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SERIES_REQUEST:
      return {
        loading: true,
      };
    case DELETE_SERIES_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case DELETE_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deleteSeries;
