import { GET_VIDEOS_STAFF_PICK, UNLOCK_CATEGORY_STAFF_PICK_VIDEO } from "../actions/types";

const initialState = {
  isFetching: true,
  staffPick: [],
};

const categoryStaffpick = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS_STAFF_PICK:
      return action.payload;
    case UNLOCK_CATEGORY_STAFF_PICK_VIDEO:
      const updatedVideos = [...state.staffPick].map((x) => {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      });
      return {
        ...state,
        staffPick: updatedVideos,
      };
    default:
      return state;
  }
};

export default categoryStaffpick;
