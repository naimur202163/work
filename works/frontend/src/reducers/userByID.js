import { GET_USER_BY_ID } from "../actions/types";

// get user by id
const userById = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return action.payload;
    default:
      return state;
  }
};

export default userById;
