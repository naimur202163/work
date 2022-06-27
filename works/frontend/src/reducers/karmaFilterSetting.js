import {
    GET_KARMA_FILTER_SETTING_FAILED,
    GET_KARMA_FILTER_SETTING_REQUEST,
    GET_KARMA_FILTER_SETTING_SUCCESS
} from "../actions/types";
const initialState = {
    isFetching: false,
    filters: {},
    error: '',
};

const KarmaFilterSetting = (state = initialState, action) => {
    switch (action.type) {
        case GET_KARMA_FILTER_SETTING_REQUEST:
            return {
                isFetching: true, filters: {},
                error: ''
            };
        case GET_KARMA_FILTER_SETTING_SUCCESS:
            return { ...state, isFetching: false, filters: action.payload };
        case GET_KARMA_FILTER_SETTING_FAILED:
            return { isFetching: false, error: action.payload, ...state };
        default:
            return state;
    }
};

export default KarmaFilterSetting;
