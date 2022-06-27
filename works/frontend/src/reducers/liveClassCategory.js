import {
    GET_CATEGORY_BY_CLASS_ID
} from "../actions/types"

const liveClassCategory = (state = {}, action) => {
    switch(action.type){
        case GET_CATEGORY_BY_CLASS_ID:
            return action.payload;
        default:
            return state;
    }
}

export default liveClassCategory;