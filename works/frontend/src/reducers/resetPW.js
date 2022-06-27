import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    SET_EMAIL_EXISTS_FALSE,
    PW_RESET_TOKEN_EXPIRED,
    CLEAR_RESET_PASSWORD_ERROR
} from "../actions/types";

const initialState = {
    isLoading: false,
    emailExists: false,
    error: "",
    isPasswordChanged: false,

}

const resetPW = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: "" };
        case RESET_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, emailExists: action.payload.emailExists, error: "" };
        case RESET_PASSWORD_FAILED:
            return { ...state, isLoading: false, error: action.payload.error, emailExists: false };
        case CHANGE_PASSWORD_REQUEST:
            return { ...state, isLoading: true };
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, isPasswordChanged: true, error: "" };
        case CHANGE_PASSWORD_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case SET_EMAIL_EXISTS_FALSE:
            return {
                ...state, emailExists: false
            }
        case PW_RESET_TOKEN_EXPIRED:
            return {
                ...state, error: action.payload.message
            }
        case CLEAR_RESET_PASSWORD_ERROR:
            return {
                ...state, error: ''
            }
        default:
            return state;
    }
}

export default resetPW;