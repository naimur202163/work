import {
  SEND_CONNECTION_REQUEST,
  SEND_CONNECTION_SUCCESS,
  SEND_CONNECTION_FAIL,
  GET_CONNECTIONS_REQUEST,
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  APPROVE_CONNECTION_FAIL,
  APPROVE_CONNECTION_SUCCESS,
  DECLINE_CONNECTION_FAIL,
  DECLINE_CONNECTION_SUCCESS,
  GET_FRIENDS_FAIL,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  REMOVE_CONNECTION_REQUEST,
  REMOVE_CONNECTION_FAIL,
  REMOVE_CONNECTION_SUCCESS,
} from "../actions/types";

const connection = (state = {}, action) => {
  switch (action.type) {
    case SEND_CONNECTION_REQUEST:
      return {
        loading: true,
      };
    case SEND_CONNECTION_SUCCESS:
      return {
        loading: false,
        sendInfo: action.payload,
      };
    case SEND_CONNECTION_FAIL:
      return {
        loading: false,
        sendError: action.payload,
      };
    case GET_CONNECTIONS_REQUEST:
      return {
        loading: true,
      };
    case GET_CONNECTIONS_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case GET_CONNECTIONS_FAIL:
      return {
        loading: false,
        getError: action.payload,
      };
    case APPROVE_CONNECTION_SUCCESS:
      return {
        approveMessage: action.payload,
      };
    case APPROVE_CONNECTION_FAIL:
      return {
        approveError: action.payload,
      };
    case DECLINE_CONNECTION_SUCCESS:
      return {
        declineMessage: action.payload,
      };
    case DECLINE_CONNECTION_FAIL:
      return {
        declineError: action.payload,
      };
    case GET_FRIENDS_REQUEST:
      return {
        friendsLoading: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        friendsLoading: false,
        friends: action.payload,
      };
    case GET_FRIENDS_FAIL:
      return {
        friendsLoading: false,
        friendsError: action.payload,
      };
    case REMOVE_CONNECTION_REQUEST:
      return {
        removeLoading: true,
      };
    case REMOVE_CONNECTION_SUCCESS:
      return {
        removeLoading: false,
        removeMessage: action.payload,
      };
    case REMOVE_CONNECTION_FAIL:
      return {
        removeLoading: false,
        removeError: action.payload,
      };
    default:
      return state;
  }
};

export default connection;
