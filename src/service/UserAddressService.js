import {protectedRequest} from "../util/request-method";

export default class UserAddressService {
    async getUserAddress({userId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/users/${userId}/addresses`).then(resolve).catch(reject)
        })
    }

    async addUserAddress({userId, address}) {
        return new Promise((resolve, reject) => {
            protectedRequest().post(`/users/${userId}/addresses`, address).then(resolve).catch(reject)
        })
    }

    async deleteUserAddress({userId, addressId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().delete(`/users/${userId}/addresses/${addressId}`).then(resolve).catch(reject)
        })
    }

    async setDefaultAddress({userId, address}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/users/${userId}/addresses/${address.id}`, address).then(resolve).catch(reject)
        })
    }
}
