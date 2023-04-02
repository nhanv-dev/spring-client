import * as types from "../constants/ActionType";
import {removeItem} from "../../util/localStorage";

const initialState = () => {
    return {items: []}
}

const cartReducer = (state = initialState(), action) => {
    switch (action.type) {
        case types.cart.ADD_CART_ITEM:
            return handleAddCartItem({...state}, action.payload)
        case types.cart.REMOVE_CART_ITEM:
            const items = state.items.filter(i => i.id !== action.payload.id)
            return {...state, items}
        case types.cart.UPDATE_QUANTITY:
            state.items = state.items.map(i => {
                if (i.id === action.payload.id) i.quantity = action.payload.quantity;
                return i;
            })
            return {...state, ...action.payload}
        case types.cart.SELECT_ITEM:
            state.items = state.items.map(i => {
                if (i.id === action.payload.id) i.checked = true;
                return i;
            })
            return {...state, ...action.payload}
        case types.cart.UN_SELECT_ITEM:
            state.items = state.items.map(i => {
                if (i.id === action.payload.id) i.checked = false;
                return i;
            })
            return {...state, ...action.payload}
        case types.cart.INITIALIZE_CART:
            return {...state, ...action.payload}
        case types.order.PLACE_ORDER_SUCCESS:
            state.items = state.items.filter(i => {
                const isCorrect= action.payload.items.filter(item=>item.id ===i.id).length > 0;
                return isCorrect;
            })
            return {...state}
        case types.order.PLACE_ORDER_FAILED:
            return {...state}
        case types.user.USER_LOGIN_FAILED :
            return {items: []}
        case types.user.USER_LOGOUT:
            return {items: []}
        default:
            return state
    }
}
const handleAddCartItem = (state, item) => {
    const index = state.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
        state.items.splice(index, 1);
        state.items = [item, ...state.items]
    } else {
        state.items = [item, ...state.items]
    }
    return {...state}
}
export default cartReducer;