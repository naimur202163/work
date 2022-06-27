import { GET_MARKETING_BANNERS, CLEAR_MARKETING_BANNERS } from "../actions/types";

const initialState = {};

const marketingBanner = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARKETING_BANNERS:
      return action.payload;
    case CLEAR_MARKETING_BANNERS:
      return {};
    default:
      return state;
  }
};

export default marketingBanner;
