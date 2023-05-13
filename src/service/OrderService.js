import {protectedRequest} from "../util/request-method";

export default class OrderService {
    async getCancelledOrder({orderId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/orders/${orderId}/cancel-order`).then(resolve).catch(reject)
        })
    }

    async changeStatusOrder({orderId, status}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/shops/orders/${orderId}`, {status, orderId}).then(resolve).catch(reject)
        })
    }

}
