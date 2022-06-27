import { GET_FEATURED_WARRIORS } from "../actions/types";

const initialState = {};

const featuredWarriors = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEATURED_WARRIORS:
      return action.payload;
    default:
      return state;
  }
};

export default featuredWarriors;
