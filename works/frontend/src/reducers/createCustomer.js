import { CREATE_CUSTOMER } from "../actions/types";

const initialState = {
  isFetching: true,
};

const createCustomer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER:
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

export default createCustomer;
