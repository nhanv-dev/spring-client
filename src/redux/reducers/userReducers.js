import * as types from "../constants/ActionType";
import {getItem, removeItem, setItem} from "../../util/localStorage";

const initialState = () => {
    const data = getItem("user") || {};
    return {...data}
}

const userReducers = (state = initialState(), action) => {
    switch (action.type) {
        case types.user.USER_LOGIN_SUCCESS:
            setItem("user", {...action.payload})
            return {...action.payload}
        case types.user.USER_LOGIN_FAILED :
            removeItem("user")
            return {}
        case types.user.USER_LOGOUT:
            removeItem("user")
            return {}
        case types.user.CHECK_TOKEN_SUCCESS:
            setItem("user", {...action.payload})
            return {...action.payload}
        case types.user.UPDATE_USER_SUCCESS:
            setItem("user", {...state, ...action.payload})
            return {...state, ...action.payload}
        case types.user.CHECK_TOKEN_FAILED:
            removeItem("user")
            removeItem("cart")
            return {}
        default:
            return state
    }
}

export default userReducers;