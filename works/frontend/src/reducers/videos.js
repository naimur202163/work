import { GET_VIDEOS_REQUEST, GET_VIDEOS_SUCCESS } from "../actions/types";

const initialState = {
  isFetching: true,
  videos: [],
};

const videos = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS_REQUEST:
      return { ...state, isFetching: true };
    case GET_VIDEOS_SUCCESS:
      return { ...state, videos: action.payload, isFetching: false };

    default:
      return state;
  }
};

export default videos;
