import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducer/CombineReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const RootReducer = combineReducers
const Store = createStore(
    RootReducer,composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
      ));

export default Store;