import axios from "axios";
import {getItem} from "./localStorage";

export const baseURL = "http://localhost:8080/api/";

export const publicRequest = () => {
    return axios.create({
        baseURL: baseURL,
    });
}

export const protectedRequest = () => {
    const token = getItem("user")?.token
    return axios.create({
        baseURL: baseURL,
        headers: {Authorization: `Bearer ${token}`},
    });
}
