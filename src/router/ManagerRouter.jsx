import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";

const Home = lazy(() => import('../pages/shop/home'));
const ProductCreating = lazy(() => import('../pages/shop/product-creating'));

function ManagerRouter() {
    const routes = [
        {path: '/', exact: true, component: Home, replaceTo: '/dang-ky-ban-hang'},
        {path: '/trang-chu', exact: true, component: Home, replaceTo: '/dang-ky-ban-hang'},
        {path: '/dang-ban', exact: true, component: ProductCreating, replaceTo: '/dang-ky-ban-hang'},
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path} element={<route.component/>}/>
            ))}
        </Routes>
    );
}

export default ManagerRouter;