import {
    UPDATE_SCHEDULE_FAIL,
    UPDATE_SCHEDULE_REQUEST,
    UPDATE_SCHEDULE_SUCCESS
} from "../actions/types"

const createLiveSchedule = (state = {}, action) => {
    switch(action.type){
        case UPDATE_SCHEDULE_REQUEST:
            return {
                loading: true
            };
        case UPDATE_SCHEDULE_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case UPDATE_SCHEDULE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default createLiveSchedule;