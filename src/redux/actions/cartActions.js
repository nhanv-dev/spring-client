import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";

export const initializeCart = async () => {
    const res = await protectedRequest().get(`/cart`);
    const action = {
        type: types.cart.INITIALIZE_CART,
        payload: {cartByShop: [...res.data]}
    };
    return {...action}
}

export const addToCart = async (payload) => {
    const action = {};
    await protectedRequest().post("/cart/items", payload)
        .then(res => {
            action.payload = {...res.data.data};
            action.type = types.cart.ADD_CART_ITEM;
        }).catch(err => {
            console.log(err)
        })
    return {...action}
}
export const removeFromCart = async (payload) => {
    if (!payload?.id) return;
    const res = await protectedRequest().delete(`/cart/items/${payload.id}`);
    console.log(res)
    const action = {
        id: payload.id,
        type: types.cart.REMOVE_CART_ITEM,
    };

    return {...action}
}

