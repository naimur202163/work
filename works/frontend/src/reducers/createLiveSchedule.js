import {
    CREATE_SCHEDULE_FAIL,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_REQUEST
} from "../actions/types"

const createLiveSchedule = (state = {}, action) => {
    switch(action.type){
        case CREATE_SCHEDULE_REQUEST:
            return {
                loading: true
            };
        case CREATE_SCHEDULE_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case CREATE_SCHEDULE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default createLiveSchedule;