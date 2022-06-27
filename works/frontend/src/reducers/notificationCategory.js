import { GET_NOTIFICATIONS_CATEGORIES } from "../actions/types";

const initialState = {
  isFetching: true,
  notificationData: [],
};

const notificationCategory = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default notificationCategory;
