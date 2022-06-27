import { GET_STAFF_PICK, UNLOCK_STAFF_PICK_VIDEO } from '../actions/types';

const initialState = {
  isFetching: true,
  videos: [],
};

const staffPick = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF_PICK:
      return action.payload;
    case UNLOCK_STAFF_PICK_VIDEO:
      const updatedVideos = [...state.videos].map(x=> {
        if (x.id === action.payload.videoId) {
          x.isVideoLocked = false;
        }
        return x;
      })
      return {
        ...state,
        videos: updatedVideos,
      };
    default:
      return state;
  }
};

export default staffPick;
