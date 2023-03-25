import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";

const Home = lazy(() => import('../pages/admin/home'));
const SalesRegister = lazy(() => import('../pages/admin/sales-register'));

function AdminRouter() {
    const routes = [
        {path: '/', exact: true, component: Home},
        {path: '/trang-chu', exact: true, component: Home},
        {path: '/dang-ky-ban-hang', exact: true, component: SalesRegister},
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path} element={<route.component/>}/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default AdminRouter;