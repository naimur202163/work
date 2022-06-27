import {
  SET_FETCHING,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION_COMMENT_ID,
  CLEAR_COMMENT_ID,
  NOTIFICATIONS_READ_COUNT,
  INCREMENT_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS
} from "../actions/types";

const initialState = {
  isFetching: true,
  notificationCommentId: "",
  counter: 0,
  notifications: [],
  resetNotificationLimit: false
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
        resetNotificationLimit: false
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        resetNotificationLimit: true,
      };
    case NOTIFICATIONS_READ_COUNT:
      return {
        ...state,
        counter: state.counter - 1,
        notifications: (state.notifications.rows[action.payload][
          "readstatus"
        ] = true),
        notificationCommentId:
          state.notifications.rows[action.payload]["entityid"],
      };
    case GET_NOTIFICATION_COMMENT_ID:
      return {
        ...state,
        notificationCommentId:
          state.notifications.rows[action.payload]["entityid"],
      };
    case CLEAR_COMMENT_ID:
      return {
        ...state,
        notificationCommentId: "",
      };
    case INCREMENT_NOTIFICATION_COUNT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};

export default notification;
