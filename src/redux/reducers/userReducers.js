import * as types from "../constants/ActionTypes";

const initialState = () => {
    const data = JSON.parse(localStorage.getItem("persist:root")) || {};
    const state = {...data}
    return {accessToken: state.accessToken, info: state.info}
}

const userReducers = (state = initialState(), action) => {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            localStorage.setItem("persist:root", JSON.stringify({...action.payload}))
            return {accessToken: action.payload.accessToken, info: action.payload.info}
        case types.USER_LOGIN_FAILED :
            localStorage.removeItem("persist:root")
            localStorage.removeItem("cart")
            return {}
        case types.USER_LOGOUT:
            localStorage.removeItem("persist:root")
            localStorage.removeItem("cart")
            return {}
        case types.CHECK_TOKEN_SUCCESS:
            localStorage.setItem("persist:root", JSON.stringify({...action.payload}))
            return {accessToken: action.payload.accessToken, info: action.payload.info}
        case types.CHECK_TOKEN_FAILED:
            localStorage.removeItem("persist:root")
            localStorage.removeItem("cart")
            return {}
        default:
            return state
    }
}

export default userReducers;