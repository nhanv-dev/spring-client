import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";

export const initShop = async (payload) => {
    const action = {type: types.shop.INIT_SHOP};
    await protectedRequest().get(`/shops/users/${payload.userId}`)
        .then(res => {
            action.payload = {...res.data};
            action.type = types.shop.INIT_SHOP;
        })
        .catch(err => {
            action.type = types.shop.INIT_SHOP_FAILED;

        })
    return {...action}
}
