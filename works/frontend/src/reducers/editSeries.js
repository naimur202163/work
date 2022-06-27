import {
  EDIT_SERIES_SUCCESS,
  EDIT_SERIES_FAIL,
  EDIT_SERIES_REQUEST,
} from "../actions/types";

const editSeries = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SERIES_REQUEST:
      return {
        loading: true,
      };
    case EDIT_SERIES_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case EDIT_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editSeries;
