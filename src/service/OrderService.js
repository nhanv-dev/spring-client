import {protectedRequest} from "../util/request-method";

class OrderService {
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

    async getOrdersByShop({page, size}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/shops/orders?page=${page}&size=${size}`).then(resolve).catch(reject)
        })
    }

}

const orderService = new OrderService();
export default orderService;
