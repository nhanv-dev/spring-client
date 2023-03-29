import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";
import PrivateRouter from "./PrivateRouter";

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
                <Route key={route.path} exact={route.exact}
                       path={route.path} element={<PrivateRouter exact={route.exact} replaceTo={route.replaceTo}/>}>
                    <Route exact path='' element={<route.component/>}/>
                </Route>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default AdminRouter;