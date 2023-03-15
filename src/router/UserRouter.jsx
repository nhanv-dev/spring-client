import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";

const Home = lazy(() => import('../pages/web/home'));
const Categories = lazy(() => import('../pages/web/categories'));
const Category = lazy(() => import('../pages/web/category'));
const SignIn = lazy(() => import('../pages/web/sign-in'));
const SignUp = lazy(() => import('../pages/web/sign-up'));
const SalesRegister = lazy(() => import('../pages/web/sales-register'));
const ProductDetail = lazy(() => import('../pages/web/product-detail'));
const UserAddresses = lazy(() => import('../pages/web/user-addresses'));
const ChangingAddress = lazy(() => import('../pages/web/changing-address'));
const ChangingPassword = lazy(() => import('../pages/web/changing-password'));
const Shop = lazy(() => import('../pages/web/shop'));
const Cart = lazy(() => import('../pages/web/cart'));
const Order = lazy(() => import('../pages/web/order'));

function UserRouter() {

    const routes = [
        {path: '/', exact: true, component: Home},
        {path: '/trang-chu', exact: true, component: Home},
        {path: '/dang-nhap', exact: true, component: SignIn},
        {path: '/dang-ky', exact: true, component: SignUp},
        {path: '/dang-ky-ban-hang', exact: true, component: SalesRegister},
        {path: '/gio-hang', exact: true, component: Cart},
        {path: '/danh-muc', exact: true, component: Categories},
        {path: '/danh-muc/*', exact: true, component: Category},
        {path: '/dang-ky', exact: true, component: SignUp},
        {path: '/san-pham/:slug', exact: true, component: ProductDetail},
        {path: '/cua-hang/:slug/*', exact: true, component: Shop},

    ];


    const authRoutes = [
        // {path: '/nguoi-dung/thong-tin', exact: true, component: Profile, replaceTo: '/dang-nhap'},
        {path: '/nguoi-dung/dia-chi', exact: true, component: UserAddresses, replaceTo: '/dang-nhap'},
        {path: '/nguoi-dung/don-dat-hang', exact: true, component: Order, replaceTo: '/dang-nhap'},
        {path: '/nguoi-dung/doi-mat-khau', exact: true, component: ChangingPassword, replaceTo: '/dang-nhap'},
        {path: '/nguoi-dung/thay-doi-dia-chi', exact: true, component: ChangingAddress, replaceTo: '/dang-nhap'},
        // {path: '/nguoi-dung/doi-mat-khau', exact: true, component: ChangingPassword, replaceTo: '/dang-nhap'},
        {path: '/nguoi-dung/doi-mat-khau', exact: true, component: ChangingPassword, replaceTo: '/dang-nhap'},
        // {path: '/nguoi-dung/hoa-don', exact: true, component: SearchingPayment, replaceTo: '/dang-nhap'},
        // {path: '/nguoi-dung/don-dat-hang', exact: true, component: order, replaceTo: '/dang-nhap'},
        // {path: '/nguoi-dung/cau-hoi', exact: true, component: UserQuestion, replaceTo: '/dang-nhap'},
        // {path: '/dang-ky-ban-hang', exact: true, component: RegisterShop, replaceTo: '/dang-nhap'},
        // {path: '/thanh-toan', exact: true, component: Checkout, replaceTo: '/dang-nhap'},
        // {path: '/don-hang-thanh-cong', exact: true, component: SuccessCheckout, replaceTo: '/dang-nhap'},
        

    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path} element={<route.component/>}/>
            ))}
            {authRoutes.map(route => (
                <Route key={route.path} exact={route.exact} path={route.path}
                       element={<route.component/>}
                    // element={
                    //     user.accessToken ? <route.component/> : <Navigate to={route.replaceTo} replace={true}/>
                    // }
                />
            ))}
        </Routes>
    );
}

export default UserRouter;