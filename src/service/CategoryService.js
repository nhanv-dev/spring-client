import {publicRequest} from "../util/request-method";

class CategoryService {
    getCategory({page, limit, type}) {
        return new Promise((resolve, reject) => {
            const paramPage = page && `page=${page}`
            const paramLimit = limit && `limit=${limit}`
            const paramType = type && `type=${type}`
            publicRequest().get(`/categories?${paramPage}&${paramLimit}&${paramType}`).then(resolve).catch(reject)
        })
    }

    getCategoryBySlug({slug}) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/categories/slug/${slug}`).then(resolve).catch(reject)
        })
    }
}

const categoryService = new CategoryService();
export default categoryService;