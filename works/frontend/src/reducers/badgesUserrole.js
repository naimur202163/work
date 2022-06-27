import { GET_BADGES_BY_USERROLE } from "../actions/types";

const badgesUserrole = (state = [], action) => {
  switch (action.type) {
    case GET_BADGES_BY_USERROLE:
      return action.payload;
    default:
      return state;
  }
};

export default badgesUserrole;
