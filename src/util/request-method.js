import axios from "axios";

export const baseURL = "https://ecommerce-server-kapy2vm6o-nhanv-dev.vercel.app/api/v1/";

export const publicRequest = () => {
    return axios.create({
        baseURL: baseURL,
    });
}

export const protectedRequest = () => {
    const data = localStorage.getItem("persist:root");
    const token = JSON.parse(data)?.accessToken
    return axios.create({
        baseURL: baseURL,
        headers: {token: `Bearer ${token}`},
    });
}
