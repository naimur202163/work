import { TRANSFERS_AMOUNT } from "../actions/types";

const initialState = {
  isFetching: true,
};

const transfers = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFERS_AMOUNT:
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

export default transfers;
