import * as types from '../constants/ActionType'
import {protectedRequest, publicRequest} from "../../util/request-method";

export const login = async (payload) => {
    const action = {type: types.user.USER_LOGIN_FAILED};
    await publicRequest().post("/auth/sign-in", payload)
        .then(res => {
            action.payload = {...res.data};
            action.type = types.user.USER_LOGIN_SUCCESS;
        }).catch(err => {
            action.type = types.user.USER_LOGIN_FAILED;
            action.error = err.response?.data || 'Password invalid';
        })
    return {...action}
}
export const logout = async () => {
    return {
        type: types.user.USER_LOGOUT,
    }
}
export const validateToken = async () => {
    let action = {type: types.user.CHECK_TOKEN_FAILED};
    await protectedRequest().get("/auth/token-valid")
        .then(res => {
            action = {
                type: types.user.CHECK_TOKEN_SUCCESS,
                payload: res.data,
            }
        })
        .catch(err => {
            action = {type: types.user.CHECK_TOKEN_FAILED}
        })
    return {...action}
}
