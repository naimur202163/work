import { ACCEPT_PAYMENT_SUCCESS } from "../actions/types";

const initialState = {
  isFetching: true,
};

const clientSecret = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default clientSecret;
