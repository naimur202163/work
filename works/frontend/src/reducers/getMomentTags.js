import {
  GET_TAGGED_USERS_OF_MOMENT_REQUEST,
  GET_TAGGED_USERS_OF_MOMENT_SUCCESS,
  GET_TAGGED_USERS_OF_MOMENT_FAIL,
} from "../actions/types";

const getMomentTags = (state = {}, action) => {
  switch (action.type) {
    case GET_TAGGED_USERS_OF_MOMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_TAGGED_USERS_OF_MOMENT_SUCCESS:
      return {
        loading: false,
        taggedUsers: action.payload,
      };
    case GET_TAGGED_USERS_OF_MOMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getMomentTags;
