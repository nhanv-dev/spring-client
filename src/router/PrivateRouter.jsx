import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRouter({replaceTo, callback}) {
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (callback && typeof callback === "function") callback();
    }, [user, callback])

    return (user?.token) ?
        <Outlet/> : <Navigate to={replaceTo} replace={true}/>;
}

export default PrivateRouter;