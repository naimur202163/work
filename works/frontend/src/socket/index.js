import {
  addCommentToStore,
  clearNotifications,
  getNotificationData,
  incrementNotificationCount,
} from "../actions";
import { WEB_SOCKET_EVENTS } from "./socket-keys";
import store from "./../store";
import config from "../config/config";
let webSocketConnection;

export const initiateSocket = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.id) {
    webSocketConnection = new WebSocket(
      `${config.REACT_APP_WEB_SOCKET_BACKEND_URL}?userId=${user.id}`
    );

    webSocketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.webSocketAction) {
        if (
          data.webSocketAction ===
          WEB_SOCKET_EVENTS.INCREMENT_NOTIFICATION_COUNT
        ) {
          store.dispatch(clearNotifications());
          store.dispatch(incrementNotificationCount());
          store.dispatch(getNotificationData(5));
        } else if (data.webSocketAction === WEB_SOCKET_EVENTS.ADD_COMMENT) {
          store.dispatch(addCommentToStore(data));
        }
      }
    };
  }
};

export const disconnectSocket = () => {
  if (webSocketConnection) {
    webSocketConnection.close();
  }
};
