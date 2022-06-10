import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SRReducer from "./SRReducer";
import UserBehaviourReducer from "./UserBehaviourReducer"

export default combineReducers({
    AuthReducer,            //add the new reducers down below with a ","
    SRReducer,
    UserBehaviourReducer,
}) 