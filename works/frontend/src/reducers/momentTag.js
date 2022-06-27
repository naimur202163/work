import {
  TAG_USER_IN_MOMENT_REQUEST,
  TAG_USER_IN_MOMENT_SUCCESS,
  TAG_USER_IN_MOMENT_FAIL,
  TAG_USER_IN_MOMENT_RESET,
} from "../actions/types";

const momentTag = (state = {}, action) => {
  switch (action.type) {
    case TAG_USER_IN_MOMENT_REQUEST:
      return {
        loading: true,
      };
    case TAG_USER_IN_MOMENT_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case TAG_USER_IN_MOMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TAG_USER_IN_MOMENT_RESET:
      return {
        message: null,
        error: null,
        loading: false
      }
    default:
      return state;
  }
};

export default momentTag;
