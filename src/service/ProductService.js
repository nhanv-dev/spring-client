import {protectedRequest, publicRequest} from "../util/request-method";

class ProductService {
    async getProduct({page, size}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/products?page=${page}&size=${size}`).then(resolve).catch(reject)
        })
    }

    async getProductByCategorySlug({slugCategory, page}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/products/category/${slugCategory}?page=${page}`).then(resolve).catch(reject)
        })
    }

    async getProductByShop({page, size}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/shops/products?page=${page}&size=${size}`).then(resolve).catch(reject)
        })
    }

    async searchProduct({page, size, search}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/search/products?search=${search}&page=${page}&size=${size}`)
                .then(resolve).catch(reject)
        })
    }

}

const productService = new ProductService();
export default productService;