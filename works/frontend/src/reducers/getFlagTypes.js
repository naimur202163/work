import {
  GET_FLAG_TYPES_FAIL,
  GET_FLAG_TYPES_SUCCESS,
  GET_FLAG_TYPES_REQUEST,
} from "../actions/types";

const getFlagTypes = (state = {}, action) => {
  switch (action.type) {
    case GET_FLAG_TYPES_REQUEST:
      return {
        loading: true,
      };
    case GET_FLAG_TYPES_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        flagTypes: action.payload.results,
        loading: false,
      };
    case GET_FLAG_TYPES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getFlagTypes;
