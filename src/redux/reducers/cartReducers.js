import * as types from "../constants/ActionType";

const initialState = () => {
    return {items: []}
}

const cartReducer = (state = initialState(), action) => {
    switch (action.type) {
        case types.cart.ADD_CART_ITEM:
            return {...state, items: [...state.items, action.payload]}
        case types.cart.REMOVE_CART_ITEM:
            return {...state, items: [...state.items, action.payload]}
        case types.cart.INITIALIZE_CART:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default cartReducer;