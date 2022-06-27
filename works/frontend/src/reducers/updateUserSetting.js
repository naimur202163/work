import {
  UPDATE_USER_SETTING,
  UPDATE_USER_SETTING_REQUEST,
} from "../actions/types";

const initialState = {};

const updateUserSetting = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SETTING_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_USER_SETTING:
      return {
        result: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default updateUserSetting;
