import { GET_SINGLE_STORAGE } from "../actions/types";

const singleStorage = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_STORAGE:
      return action.payload;
    default:
      return state;
  }
};

export default singleStorage;
