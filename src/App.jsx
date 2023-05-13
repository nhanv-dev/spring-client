import Router, {Loader} from "./router/Router";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {validateToken} from "./redux/actions/userActions";
import {initializeCart} from "./redux/actions/cartActions";
import {getItem} from "./util/localStorage";
import * as types from './redux/constants/ActionType.js';
import {isRole, ROLE_SHOP, ROLE_USER} from "./service/AuthService";
import {initShop} from "./redux/actions/shopActions";

function App() {
    // const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const localUser = getItem("user");

        if (!localUser?.token) return setLoading(false);

        const prepare = async () => {
            const action = await validateToken();
            dispatch(action);
            if (action.type === types.user.CHECK_TOKEN_SUCCESS) {
                if (isRole(action.payload, ROLE_USER)) {
                    const cart = await initializeCart();
                    dispatch(cart);
                }
                if (isRole(action.payload, ROLE_SHOP)) {
                    const shop = await initShop({userId: action.payload.id});
                    dispatch(shop);
                }
            }
        }

        prepare()
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }, [dispatch])

    if (loading) return <Loader/>

    return loading ? <Loader/> : <Router/>
}

export default App;
