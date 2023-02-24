import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/web/Home";
import SignIn from "../pages/web/SignIn";

function UserRouter() {

    const routes = [
        {path: '/', exact: true, component: Home},
        {path: '/trang-chu', exact: true, component: Home},
        {path: '/dang-nhap', exact: true, component: SignIn},
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path} element={<route.component/>}/>
            ))}
        </Routes>
    );
}

export default UserRouter;