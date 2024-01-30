import contactReducer from "./contact.reducers";

import {combineReducers} from "redux";

const rootReducer = combineReducers({
    contact : contactReducer
})

export default rootReducer;