import {combineReducers} from 'redux';
import userReducers from "./userReducers";
import cartReducers from "./cartReducers";
import shopReducers from "./shopReducers";

const rootReducer = combineReducers({
    user: userReducers,
    cart: cartReducers,
    shop: shopReducers,
})

export default rootReducer;
