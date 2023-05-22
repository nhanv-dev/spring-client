import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";
import shopService from "../../service/ShopService";

export const initShop = async ({userId}) => {
    const action = {type: types.shop.INIT_SHOP};
    await protectedRequest().get(`/shops/users/${userId}`)
        .then(res => {
            action.payload = {...res.data};
            action.type = types.shop.INIT_SHOP;
        })
        .catch(err => {
            action.type = types.shop.INIT_SHOP_FAILED;

        })
    return {...action}
}

export const updateShop = async ({shop}) => {
    const action = {type: types.shop.UPDATE_SHOP};
    await shopService.updateShop({shop})
        .then(res => {
            action.payload = {...res.data};
            action.type = types.shop.UPDATE_SHOP;
        })
        .catch(err => {
            action.type = types.shop.INIT_SHOP_FAILED;
        })
    return {...action}
}