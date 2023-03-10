import axios from "axios";

export const baseURL = "http://localhost:8080/api/";

export const publicRequest = () => {
    return axios.create({
        baseURL: baseURL,
    });
}

export const protectedRequest = () => {
    const data = localStorage.getItem("persist:root");
    const token = JSON.parse(data)?.token
    return axios.create({
        baseURL: baseURL,
        headers: {Authorization: `Bearer ${token}`},
    });
}
