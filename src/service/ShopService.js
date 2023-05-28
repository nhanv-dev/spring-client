import {protectedRequest, publicRequest} from "../util/request-method";

class ShopService {

    async getShop({shopId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/shops/${shopId}`).then(resolve).catch(reject)
        })
    }

    async updateShop({shop}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/shops/${shop.id}`, shop).then(resolve).catch(reject)
        })
    }

    async searchShop({page,size,search}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/search/shops?search=${search}&page=${page}&size=${size}`).then(resolve).catch(reject)
        })
    }


}

const shopService = new ShopService();
export default shopService;