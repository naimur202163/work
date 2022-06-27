import { GET_WARRIOR_SLIDER } from "../actions/types";

const initialState = {};

const slider = (state = initialState, action) => {
  switch (action.type) {
    case GET_WARRIOR_SLIDER:
      return action.payload;
    default:
      return state;
  }
};

export default slider;
