import {protectedRequest, publicRequest} from "../util/request-method";

class ShopService {

    async searchShop({search}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/search/shops?search=${search}`).then(resolve).catch(reject)
        })
    }

}

const shopService = new ShopService();
export default shopService;