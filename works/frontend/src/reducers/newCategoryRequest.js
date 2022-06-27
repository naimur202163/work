import {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
} from "../actions/types";

const newCategoryRequest = (state = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newCategoryRequest;
