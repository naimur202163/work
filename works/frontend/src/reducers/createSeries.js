import {
  CREATE_NEW_SERIES_SUCCESS,
  CREATE_NEW_SERIES_FAIL,
  CREATE_NEW_SERIES_REQUEST,
} from "../actions/types";

const createSeries = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_SERIES_REQUEST:
      return {
        loading: true,
      };
    case CREATE_NEW_SERIES_SUCCESS:
      return {
        loading: false,
        info: action.payload,
      };
    case CREATE_NEW_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createSeries;
