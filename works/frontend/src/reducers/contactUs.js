import {
  SEND_CONTACT_US_EMAIL_REQ,
  SEND_CONTACT_US_EMAIL_SUCCESS,
  SEND_CONTACT_US_EMAIL_FAILED,
  RESET_CONTACT_US,
} from "../actions/types";

const initialState = {
  isLoading: false,
  error: "",
  success: false,
};

const contactUs = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CONTACT_US_EMAIL_REQ:
      return { ...state, isLoading: true };
    case SEND_CONTACT_US_EMAIL_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
      };
    case SEND_CONTACT_US_EMAIL_FAILED:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: action.payload.error,
      };
    case RESET_CONTACT_US:
      return initialState;
    default:
      return state;
  }
};

export default contactUs;
