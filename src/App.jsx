import Router from "./router/Router";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import {getItem} from "./util/localStorage";

function App() {
    const [token, setToken] = useState(getItem("token"));

    useEffect(() => {
        // const token =getItem("token")
    }, [token])


    return (
        <Router></Router>
    );
}

export default App;
