import {combineReducers} from 'redux';
import userReducers from "./userReducers";
import cartReducers from "./cartReducers";

const rootReducer = combineReducers({
    user: userReducers,
    cart: cartReducers,
})

export default rootReducer;
