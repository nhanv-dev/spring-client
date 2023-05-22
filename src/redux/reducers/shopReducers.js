import * as types from "../constants/ActionType";


const shopReducers = (state = {}, action) => {
    switch (action.type) {
        case types.shop.INIT_SHOP:
            return {...action.payload}
        case types.shop.UPDATE_SHOP:
            return {...action.payload}
        case types.shop.INIT_SHOP_FAILED:
            return {}
        default:
            return state
    }
}

export default shopReducers;