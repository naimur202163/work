import {
  UPLOAD_MOMENT_REQUEST,
  UPLOAD_MOMENT_FAIL,
  UPLOAD_MOMENT_SUCCESS,
  DELETE_MOMENT_REQUEST,
  DELETE_MOMENT_SUCCESS,
  DELETE_MOMENT_FAIL,
  UPDATE_MOMENT_REQUEST,
  UPDATE_MOMENT_SUCCESS,
  UPDATE_MOMENT_FAIL,
  RESET_MOMENT,
} from "../actions/types";

const moment = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_MOMENT_REQUEST:
      return {
        uploadLoading: true,
      };
    case UPLOAD_MOMENT_SUCCESS:
      return {
        uploadLoading: false,
        moment: action.payload,
      };
    case UPLOAD_MOMENT_FAIL:
      return {
        uploadLoading: false,
        uploadError: action.payload,
      };
    case DELETE_MOMENT_REQUEST:
      return {
        deleteLoading: true,
      };
    case DELETE_MOMENT_SUCCESS:
      return {
        deleteLoading: false,
        deleteMessage: action.payload,
      };
    case DELETE_MOMENT_FAIL:
      return {
        deleteLoading: false,
        deleteError: action.payload,
      };
    case UPDATE_MOMENT_REQUEST:
      return {
        updateLoading: true,
      };
    case UPDATE_MOMENT_SUCCESS:
      return {
        updateLoading: false,
        updateMessage: action.payload,
      };
    case UPDATE_MOMENT_FAIL:
      return {
        updateLoading: false,
        updateError: action.payload,
      };

    default:
      return state;
  }
};

export default moment;
