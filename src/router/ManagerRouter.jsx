import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";
import PrivateRouter from "./PrivateRouter";

const Home = lazy(() => import('../pages/shop/home'));
const Products = lazy(() => import('../pages/shop/products'));
const ProductCreating = lazy(() => import('../pages/shop/product-creating'));
const ProductUpdating = lazy(() => import('../pages/shop/product-updating'));

const routes = [
    {path: '/', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/trang-chu', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/san-pham', exact: true, component: Products, replaceTo: '/dang-nhap'},
    {path: '/san-pham/dang-ban', exact: true, component: ProductCreating, replaceTo: '/dang-nhap'},
    {path: '/san-pham/:id', exact: true, component: ProductUpdating, replaceTo: '/dang-nhap'},
];

function ManagerRouter() {
    // const user = useSelector(state => state.user);

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

export default ManagerRouter;