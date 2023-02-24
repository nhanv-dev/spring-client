import * as types from "../constants/ActionTypes";

const initialState = () => {
    const data = JSON.parse(localStorage.getItem("persist:root")) || {};
    return {...data.shop}
}

const userReducers = (state = initialState(), action) => {
    const storage = JSON.parse(localStorage.getItem("persist:root")) || {};
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return {...state, ...action.payload.shop}
        case types.USER_LOGIN_FAILED:
            delete storage.shop
            localStorage.setItem("persist:root", JSON.stringify({...storage}))
            return {}
        case types.USER_LOGOUT:
            delete storage.shop
            localStorage.setItem("persist:root", JSON.stringify({...storage}))
            return {}
        case types.SHOP_LOGIN_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default userReducers;