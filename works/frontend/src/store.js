import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import isutra from "./reducers";
import { whoismeaction } from "./actions";

const store = createStore(isutra, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(whoismeaction());

export default store;
