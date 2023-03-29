import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";
import PrivateRouter from "./PrivateRouter";

const Home = lazy(() => import('../pages/web/home'));
const Categories = lazy(() => import('../pages/web/categories'));
const Category = lazy(() => import('../pages/web/category'));
const SignIn = lazy(() => import('../pages/web/sign-in'));
const SignUp = lazy(() => import('../pages/web/sign-up'));
const SalesRegister = lazy(() => import('../pages/web/sales-register'));
const ProductDetail = lazy(() => import('../pages/web/product-detail'));
const UserAddresses = lazy(() => import('../pages/web/user-addresses'));
const ChangingPassword = lazy(() => import('../pages/web/changing-password'));
const userProfile = lazy(() => import('../pages/web/user-profile'));
const Shop = lazy(() => import('../pages/web/shop'));
const Cart = lazy(() => import('../pages/web/cart'));
const Order = lazy(() => import('../pages/web/order'));
const PlaceOrder = lazy(() => import('../pages/web/place-order'));

const routes = [
    {path: '/', exact: true, component: Home},
    {path: '/trang-chu', exact: true, component: Home},
    {path: '/dang-nhap', exact: true, component: SignIn},
    {path: '/dang-ky', exact: true, component: SignUp},
    {path: '/gio-hang', exact: true, component: Cart},
    {path: '/danh-muc', exact: true, component: Categories},
    {path: '/dang-ky', exact: true, component: SignUp},
    {path: '/danh-muc/:slug', exact: true, component: Category},
    {path: '/san-pham/:slug', exact: true, component: ProductDetail},
    {path: '/cua-hang/:slug/*', exact: true, component: Shop},

];

const authRoutes = [
    {path: '/dang-ky-ban-hang', exact: true, component: SalesRegister, replaceTo: '/dang-nhap'},
    {path: '/dat-hang', exact: true, component: PlaceOrder, replaceTo: '/dang-nhap'},
    {path: '/nguoi-dung/dia-chi', exact: true, component: UserAddresses, replaceTo: '/dang-nhap'},
    {path: '/nguoi-dung/don-dat-hang', exact: true, component: Order, replaceTo: '/dang-nhap'},
    {path: '/nguoi-dung/doi-mat-khau', exact: true, component: ChangingPassword, replaceTo: '/dang-nhap'},
    {path: '/nguoi-dung/thong-tin', exact: true, component: userProfile, replaceTo: '/dang-nhap'},
];

function UserRouter() {


    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path} element={<route.component/>}/>
            ))}
            {authRoutes.map(route => (
                <Route key={route.path} exact={route.exact}
                       path={route.path} element={<PrivateRouter exact={route.exact} replaceTo={route.replaceTo}/>}>
                    <Route exact path='' element={<route.component/>}/>
                </Route>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default UserRouter;