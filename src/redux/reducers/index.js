import {combineReducers} from 'redux';
import userReducers from "./userReducers";
import shopReducers from "./shopReducers";

const rootReducer = combineReducers({
    user: userReducers,
    shop: shopReducers,
})

export default rootReducer;
