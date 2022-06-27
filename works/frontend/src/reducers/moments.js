import {
  GET_ALL_MOMENT_REQUEST,
  GET_ALL_MOMENT_SUCCESS,
  GET_ALL_MOMENT_FAIL,
} from "../actions/types";

const moments = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_MOMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_MOMENT_SUCCESS:
      return {
        loading: false,
        moments: action.payload,
      };
    case GET_ALL_MOMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moments;
