import { DRAG_DROP_SERIES_VIDEOS } from "../actions/types";

const dragDropSeriesVideos = (state = {}, action) => {
  switch (action.type) {
    case DRAG_DROP_SERIES_VIDEOS:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
};

export default dragDropSeriesVideos;
