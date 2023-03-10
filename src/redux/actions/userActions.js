import * as types from '../constants/ActionTypes'
import {protectedRequest, publicRequest} from "../../util/request-method";

export const login = async (payload) => {
    const action = {type: types.USER_LOGIN_SUCCESS, payload: {}};
    await publicRequest().post("/auth/sign-in", payload)
        .then(res => {
            action.payload = {...res.data};
        }).catch(err => {
            action.type = types.USER_LOGIN_FAILED;
            action.payload = {};
        })
    return {...action}
}
export const logout = async () => {
    return {
        type: types.USER_LOGOUT,
    }
}

export const register = async (payload) => {
    const res = await publicRequest().post("/auth/register", payload);
    return {
        type: types.USER_REGISTER, payload, res
    }
}

export const reLogin = async () => {
    const action = {type: types.USER_LOGIN_SUCCESS, payload: {}};
    await protectedRequest().post("/auth/re-login")
        .then(async (res) => {
            action.payload = {
                accessToken: res.data.accessToken,
                info: res.data.user,
                shop: res.data.shop
            };
        }).catch(err => {
            action.type = types.USER_LOGIN_FAILED;
            action.payload = {};
        })
    return {...action}
}
