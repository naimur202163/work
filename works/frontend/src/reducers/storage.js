import { GET_ALL_STORAGE } from "../actions/types";

const initialState = {
  isFetching: true,
  storages: [],
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STORAGE:
      return action.payload;
    default:
      return state;
  }
};

export default storage;
