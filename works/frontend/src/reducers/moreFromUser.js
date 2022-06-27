import { MORE_FROM_USER, UNLOCK_MORE_VIDEO } from "../actions/types";

const moreFromUser = (state = [], action) => {
  switch (action.type) {
    case MORE_FROM_USER:
      return action.payload;
    case UNLOCK_MORE_VIDEO:
      const updatedVideos = [...state].map((x) => {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      });
      return {
        updatedVideos,
      };
    default:
      return state;
  }
};

export default moreFromUser;
