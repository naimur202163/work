import {
    GET_LIBRARY_VIDEOS,
} from '../actions/types';

const initialState = {
    isFetching: true,
    hasMore: false,
    videos: [],
};

const library = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIBRARY_VIDEOS:
            return action.payload;

        default:
            return state;
    }
};

export default library;
