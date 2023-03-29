import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRouter({replaceTo}) {
    const user = useSelector(state => state.user);

    return (user?.token) ?
        <Outlet/> :
        <Navigate to={replaceTo} replace={true}/>;
}

export default PrivateRouter;