import {
  GET_CONNECTION_STATUS_REQUEST,
  GET_CONNECTION_STATUS_SUCCESS,
  GET_CONNECTION_STATUS_FAIL,
} from "../actions/types";

const connectionStatus = (state = {}, action) => {
  switch (action.type) {
    case GET_CONNECTION_STATUS_REQUEST:
      return {
        loading: true,
      };

    case GET_CONNECTION_STATUS_SUCCESS:
      return {
        loading: false,
        text: action.payload,
      };

    case GET_CONNECTION_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default connectionStatus;
