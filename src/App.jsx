import Router, {Loader} from "./router/Router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {validateToken} from "./redux/actions/userActions";
import {initializeCart} from "./redux/actions/cartActions";
import {getItem} from "./util/localStorage";
import * as types from './redux/constants/ActionType.js';

function App() {
    const {user} = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        const localUser = getItem("user");
        if (!user?.token && !localUser?.token) return setLoading(false);
        const login = async () => {
            const action = await validateToken();
            dispatch(action);
            if (action.type === types.user.CHECK_TOKEN_SUCCESS) dispatch(await initializeCart());
            return false;
        }
        login()
            .then((loading) => setLoading(loading))
            .catch(err => setLoading(false))
    }, [dispatch])


    if (loading) return <Loader/>

    return (
        <Router></Router>
    );
}

export default App;
