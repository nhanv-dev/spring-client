import axios from "axios";
import { getItem } from "./localStorage";

// export const baseURL = "http://springboot-app.back-net:8080/api/";
// export const baseURL = "https://glorious-route-production.up.railway.app/api/";
export const baseURL = `${process.env.REACT_APP_SPRING_URL}` || "http://localhost:8080/api/";

export const publicRequest = () => {
    console.log(process.env.REACT_APP_SPRING_URL, baseURL);
    return axios.create({
        baseURL: baseURL,
    });
}

export const protectedRequest = () => {
    const token = getItem("user")?.token
    console.log(process.env.REACT_APP_SPRING_URL, baseURL);
    return axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Bearer ${token}` },
    });
}
