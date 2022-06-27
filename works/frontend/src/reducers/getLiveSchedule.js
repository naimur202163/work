import {
    GET_SCHEDULE_FAIL,
    GET_SCHEDULE_REQUEST,
    GET_SCHEDULE_SUCCESS
} from "../actions/types"

const getLiveSchedule = (state = {}, action) => {
    switch(action.type){
        case GET_SCHEDULE_REQUEST:
            return {
                loading: true
            };
        case GET_SCHEDULE_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case GET_SCHEDULE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default getLiveSchedule;