import {
  GET_ALL_SERIES_OF_USER_SUCCESS,
  GET_ALL_SERIES_OF_USER_FAIL,
  GET_ALL_SERIES_OF_USER_REQUEST,
} from "../actions/types";

const getAllSeriesOfUser = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SERIES_OF_USER_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_SERIES_OF_USER_SUCCESS:
      return {
        loading: false,
        series: action.payload,
      };
    case GET_ALL_SERIES_OF_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getAllSeriesOfUser;
