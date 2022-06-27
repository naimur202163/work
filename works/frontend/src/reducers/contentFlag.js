import {
  NEW_CONTENT_FLAG_FAIL,
  NEW_CONTENT_FLAG_REQUEST,
  NEW_CONTENT_FLAG_SUCCESS,
} from "../actions/types";

const contentFlag = (state = {}, action) => {
  switch (action.type) {
    case NEW_CONTENT_FLAG_REQUEST:
      return {
        loading: true,
      };
    case NEW_CONTENT_FLAG_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case NEW_CONTENT_FLAG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contentFlag;
