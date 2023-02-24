import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/web/Home";

function PrivateRouter() {
    const routes = [
        {path: '/', exact: true, component: Home, replaceTo: '/dang-ky-ban-hang'},
        {path: '/trang-chu', exact: true, component: Home, replaceTo: '/dang-ky-ban-hang'},
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path}
                       exact={route.exact}
                       path={route.path}
                       element={<route.component/>}
                />
            ))}
        </Routes>
    );
}

export default PrivateRouter;