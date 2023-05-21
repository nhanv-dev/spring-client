import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";

export const initializeCart = async () => {
    let action = {type: types.user.CHECK_TOKEN_FAILED};
    await protectedRequest().get(`/cart`)
        .then(res => {
            action = {
                type: types.cart.INITIALIZE_CART,
                payload: {...res.data}
            };
        }).catch(err => {
            console.log(err)
        });

    return {...action}
}
export const addToCart = async (payload) => {
    const action = {};
    await protectedRequest().post("/cart/items", payload)
        .then(res => {
            action.payload = {...res.data.data}
            action.type = types.cart.ADD_CART_ITEM
        })
        .catch(err => {
            if (err.response.status === 401) action.type = types.user.USER_LOGIN_FAILED
        });
    return {...action}
}
export const removeFromCart = async (payload) => {
    if (!payload?.id) return;
    const res = await protectedRequest().delete(`/cart/items/${payload.id}`);
    if (res.status !== 200) return {};
    const action = {
        payload: {id: payload.id},
        type: types.cart.REMOVE_CART_ITEM,
    };
    return {...action}
}
export const updateQuantity = async ({item, quantity}) => {
    console.log({...item, quantity})
    const res = await protectedRequest().put(`/cart/items/${item.id}`, {...item, quantity});
    console.log(res)
    if (res.status !== 200) return {};
    const action = {
        payload: {id: item.id, quantity},
        type: types.cart.UPDATE_QUANTITY,
    };
    return {...action}
}
export const selectCartItem = async (payload) => {
    const action = {
        payload: {id: payload.id},
        type: types.cart.SELECT_ITEM,
    };
    return {...action}
}
export const unSelectCartItem = async (payload) => {
    const action = {
        payload: {id: payload.id},
        type: types.cart.UN_SELECT_ITEM,
    };
    return {...action}
}
