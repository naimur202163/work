import {
    DELETE_SCHEDULE_FAIL,
    DELETE_SCHEDULE_REQUEST,
    DELETE_SCHEDULE_SUCCESS
} from "../actions/types"

const createLiveSchedule = (state = {}, action) => {
    switch(action.type){
        case DELETE_SCHEDULE_REQUEST:
            return {
                loading: true
            };
        case DELETE_SCHEDULE_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case DELETE_SCHEDULE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default createLiveSchedule;