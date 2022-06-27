import { GET_USER_SETTING_BY_USERID } from "../actions/types";

const initialState = {};

const userSettingByUserId = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SETTING_BY_USERID:
      return action.payload;
    default:
      return state;
  }
};

export default userSettingByUserId;
