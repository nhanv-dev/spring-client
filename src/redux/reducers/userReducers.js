import * as types from "../constants/ActionTypes";
import {setItem} from "../../util/localStorage";

const initialState = () => {
    const data = JSON.parse(localStorage.getItem("persist:root")) || {};
    return {...data}
}

const userReducers = (state = initialState(), action) => {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            setItem("user", {...action.payload})
            return {...action.payload}
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