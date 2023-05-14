import {protectedRequest, publicRequest} from "../util/request-method";
import * as types from "../redux/constants/ActionType";
import {isRole, ROLE_SHOP, ROLE_USER} from "./AuthService";
import {initializeCart} from "../redux/actions/cartActions";
import {initShop} from "../redux/actions/shopActions";

class UserService {
    async prepare(action) {
        if (action.type === types.user.USER_LOGIN_SUCCESS) {
            const data = {};
            if (isRole(action.payload, ROLE_USER)) data.cart = await initializeCart();
            if (isRole(action.payload, ROLE_SHOP)) data.shop = await initShop({userId: action.payload.id});
            return data;
        }
    }

    async signIn(user) {
        return new Promise((resolve, reject) => {
            publicRequest().post("/auth/sign-in", user).then(resolve).catch(reject)
        })
    }

    signUp(user) {
        return new Promise((resolve, reject) => {
            publicRequest().post("/auth/sign-up", user).then(resolve).catch(reject)
        })
    }

    updateProfile({id, name, phoneNumber}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/users/user-profile/${id}`, {
                name, phoneNumber
            }).then(resolve).catch(reject)
        })
    }

    changePassword({oldPassword, newPassword}) {

    }

}

const userService = new UserService();
export default userService;

