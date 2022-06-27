import { GET_KARMA_SENT_REQ, GET_KARMA_SENT_TRANSACTIONS, GET_KARMA_SENT_TRANSACTIONS_FAILED, GET_USER_TRANSACTIONS, GET_USER_TRANSACTIONS_FAILED, GET_USER_TRANSACTIONS_REQ, SET_FILTERED_DATA } from "../actions/types";

const initialState = {
    isLoading: false,
    data: [],
    karmaSent: []
}

const userTransactions = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_TRANSACTIONS_REQ:
            return { ...state, isLoading: true };
        case GET_USER_TRANSACTIONS:
            let updatedData = state.data.concat(action.payload)
            function getUniqueListBy(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }
            const arr1 = getUniqueListBy(updatedData, 'id')
            return { ...state, data: arr1, isLoading: false };
        case GET_USER_TRANSACTIONS_FAILED:
            return { ...state, isLoading: false }
        case GET_KARMA_SENT_REQ:
            return { ...state, isLoading: true };
        case GET_KARMA_SENT_TRANSACTIONS:
            let updatedKarmaData = state.karmaSent.concat(action.payload)
            function getUniqueList(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
            }
            const arrNew = getUniqueList(updatedKarmaData, 'id')
            return { ...state, karmaSent: arrNew, isLoading: false };
        case GET_KARMA_SENT_TRANSACTIONS_FAILED:
            return { ...state, isLoading: false }
        case SET_FILTERED_DATA:
            return { ...state, data: action.payload.data, karmaSent: action.payload.karmaSent, isLoading: false };

        default:
            return state;
    }
}

export default userTransactions;