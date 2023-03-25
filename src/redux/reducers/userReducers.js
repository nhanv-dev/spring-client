import * as types from "../constants/ActionType";
import {removeItem, setItem} from "../../util/localStorage";

const initialState = () => {
    const data = JSON.parse(localStorage.getItem("persist:root")) || {};
    return {...data?.user}
}

const userReducers = (state = initialState(), action) => {
    switch (action.type) {
        case types.user.USER_LOGIN_SUCCESS:
            setItem("user", {...action.payload})
            return {...action.payload}
        case types.user.USER_LOGIN_FAILED :
            localStorage.removeItem("persist:root")
            localStorage.removeItem("cart")
            return {}
        case types.user.USER_LOGOUT:
            localStorage.removeItem("persist:root")
            localStorage.removeItem("cart")
            return {}
        case types.user.CHECK_TOKEN_SUCCESS:
            setItem("user", {...action.payload})
            return {...action.payload}
        case types.user.CHECK_TOKEN_FAILED:
            removeItem("user")
            removeItem("cart")
            return {}
        default:
            return state
    }
}

export default userReducers;