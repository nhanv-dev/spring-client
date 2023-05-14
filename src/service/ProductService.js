import {protectedRequest, publicRequest} from "../util/request-method";

class ProductService {
    async getProductByCategorySlug({slugCategory, page}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/products/category/${slugCategory}?page=${page - 1}`).then(resolve).catch(reject)
        })
    }

    async searchProduct({search}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/search/products?search=${search}`).then(resolve).catch(reject)
        })
    }

}

const productService = new ProductService();
export default productService;