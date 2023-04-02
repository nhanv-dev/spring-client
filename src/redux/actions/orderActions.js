import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";

export const placeOrder = async (payload) => {
    const action = {type: types.order.PLACE_ORDER_FAILED};
    const cartItems = [];
    const orders = payload.list.map(order => {
        let totalPrice = 0;
        const items = order.items.map(item => {
            let deal = item.product.deal;
            if (item.variant) {
                totalPrice += item.variant.deal.finalPrice;
                deal = item.variant.deal;
            } else {
                totalPrice += item.product.deal.finalPrice;
            }
            cartItems.push(item.id)
            return {...item, cartItemId: item.id, ...deal, isEvaluated: false}
        })
        return {
            totalPrice,
            items,
            note: payload.note,
            address: payload.address,
            shop: order.shop
        }
    })
    await protectedRequest().post(`/users/${payload.userId}/orders/place-order`, orders)
        .then(res => {
            action.payload = {items: cartItems};
            action.type = types.order.PLACE_ORDER_SUCCESS;
        })
        .catch(err => {
            action.type = types.order.PLACE_ORDER_FAILED;
        })
    return {...action}
}
