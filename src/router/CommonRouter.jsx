import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {isRole, ROLE_USER} from "../service/auth";
import {useSelector} from "react-redux";

const Home = lazy(() => import('../pages/web/home'));
const Categories = lazy(() => import('../pages/web/categories'));
const Category = lazy(() => import('../pages/web/category'));
const SignIn = lazy(() => import('../pages/web/sign-in'));
const SignUp = lazy(() => import('../pages/web/sign-up'));
const ProductDetail = lazy(() => import('../pages/web/product-detail'));
const Shop = lazy(() => import('../pages/web/shop'));
const Cart = lazy(() => import('../pages/web/cart'));

const SalesRegister = lazy(() => import('../pages/web/sales-register'));
const UserAddresses = lazy(() => import('../pages/web/user-addresses'));
const ChangingPassword = lazy(() => import('../pages/web/changing-password'));
const userProfile = lazy(() => import('../pages/web/user-profile'));
const Order = lazy(() => import('../pages/web/order'));
const PlaceOrder = lazy(() => import('../pages/web/place-order'));
const PlaceOrderSuccess = lazy(() => import('../pages/web/place-order-success'));


const routes = [
    {path: '/', element: Home},
    {path: '/trang-chu', element: Home},
    {path: '/dang-nhap', element: SignIn},
    {path: '/dang-ky', element: SignUp},
    {path: '/gio-hang', element: Cart},
    {path: '/danh-muc', element: Categories},
    {path: '/danh-muc/:slug', element: Category},
    {path: '/san-pham/:slug', element: ProductDetail},
    {path: '/cua-hang/:slug/*', element: Shop},
];


const userRoutes = [
    {path: '/dat-hang', element: PlaceOrder},
    {path: '/dat-hang-thanh-cong', element: PlaceOrderSuccess},
    {path: '/nguoi-dung/dang-ky-ban-hang', element: SalesRegister},
    {path: '/nguoi-dung/dia-chi', element: UserAddresses},
    {path: '/nguoi-dung/don-dat-hang', element: Order},
    {path: '/nguoi-dung/doi-mat-khau', element: ChangingPassword},
    {path: '/nguoi-dung/thong-tin', element: userProfile},
];

function CommonRouter() {
    const user = useSelector(state => state.user);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={<route.element/>}/>
            ))}
            {userRoutes.map(route => (
                <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isAccepted={isRole(user, ROLE_USER)} to={"/dang-nhap"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
        </Routes>
    );
}

export default CommonRouter;