import Router from "./router/Router";
import {useEffect, useState} from "react";
import {getItem, removeItem} from "./util/localStorage";
import {protectedRequest} from "./util/request-method";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector(state => state.user);

    useEffect(() => {
        const storage = getItem("user")
        console.log(storage)
        // protectedRequest().get("/auth/re-login")
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         removeItem("token")
        //         removeItem("token")
        //     })
    }, [])


    return (
        <Router></Router>
    );
}

export default App;
