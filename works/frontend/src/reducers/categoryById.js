import { GET_CATEGORY_BY_ID } from "../actions/types";

const categoryById = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_BY_ID:
      return action.payload;
    default:
      return state;
  }
};

export default categoryById;
