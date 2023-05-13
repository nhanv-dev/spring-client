import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";
import {useSelector} from "react-redux";
import {isRole, ROLE_SHOP} from "../service/AuthService";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import('../pages/shop/home'));
const Products = lazy(() => import('../pages/shop/products'));
const ProductCreating = lazy(() => import('../pages/shop/product-creating'));
const ProductUpdating = lazy(() => import('../pages/shop/product-updating'));
const Order = lazy(() => import('../pages/shop/order'));
const Orders = lazy(() => import('../pages/shop/orders'));
const Reviews = lazy(() => import('../pages/shop/reviews'));
const Report = lazy(() => import('../pages/shop/report'));

const routes = [
    {path: '/', element: Home},
    {path: '/trang-chu', element: Home},
    {path: '/san-pham', element: Products},
    {path: '/don-dat-hang', element: Orders},
    {path: '/don-dat-hang/:id', element: Order},
    {path: '/san-pham/dang-ban', element: ProductCreating},
    {path: '/san-pham/:id', element: ProductUpdating},
    {path: '/danh-gia-shop', element: Reviews},
    {path: '/thong-ke', element: Report},
];

function ShopRouter() {
    const user = useSelector(state => state.user);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isAccepted={isRole(user, ROLE_SHOP)} to={"/dang-nhap"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default ShopRouter;