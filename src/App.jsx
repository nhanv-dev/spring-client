import Router from "./router/Router";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {protectedRequest, publicRequest} from "./util/request-method";
import {reLogin, validateToken} from "./redux/actions/userActions";

function App() {
    const {user, cart} = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user?.token) return;
        const load = async () => {
            const action = await validateToken();
            dispatch(action);
            return {loading: false}
        }
        load().then((data) => {
        })
    }, [])

    return (
        <Router></Router>
    );
}

export default App;
