import * as types from '../constants/ActionType'
import {protectedRequest} from "../../util/request-method";
import userService from "../../service/UserService";

export const login = async (payload) => {
    const action = {type: types.user.USER_LOGIN_FAILED};
    await userService.signIn(payload)
        .then(res => {
            action.payload = {...res.data};
            action.type = types.user.USER_LOGIN_SUCCESS;
        })
        .catch(err => {
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
export const updateUser = async (user) => {
    let action = {type: types.user.UPDATE_USER_FAILED};
    await userService.updateProfile({...user})
        .then(res => {
            console.log(res)
            action = {
                type: types.user.UPDATE_USER_SUCCESS,
                payload: {...user},
            }
        })
        .catch(err => {
            console.log(err)
            action = {type: types.user.UPDATE_USER_FAILED}
        })
    return {...action}
}
