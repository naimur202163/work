import { VISIT_STRIPE_CUSTOMER_PORTAL_FAILED, VISIT_STRIPE_CUSTOMER_PORTAL_REQUEST, VISIT_STRIPE_CUSTOMER_PORTAL_SUCCESS } from "../actions/types";

const initialState = {
    isLoading: false,
    portal_url: "",
    error: ""
}

const customer_portal = (state = initialState, action) => {
    switch (action.type) {
        case VISIT_STRIPE_CUSTOMER_PORTAL_REQUEST:
            return { ...state, isLoading: true };
        case VISIT_STRIPE_CUSTOMER_PORTAL_SUCCESS:
            return { ...state, isLoading: false, portal_url: action.payload.portal_url };
        case VISIT_STRIPE_CUSTOMER_PORTAL_FAILED:
            return { ...state, isLoading: false, error: "" };
        default:
            return state;
    }
}

export default customer_portal;