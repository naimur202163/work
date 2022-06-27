import {
  GET_ALL_PURCHASED_SERIES_FAIL,
  GET_ALL_PURCHASED_SERIES_SUCCESS,
  GET_ALL_PURCHASED_SERIES_REQUEST,
} from "../actions/types";

const getPurchasedSeries = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PURCHASED_SERIES_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_PURCHASED_SERIES_SUCCESS:
      return {
        loading: false,
        allSeries: action.payload,
      };
    case GET_ALL_PURCHASED_SERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getPurchasedSeries;
