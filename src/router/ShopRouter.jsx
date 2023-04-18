import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Loader, NotFound} from "./Router";
import {useDispatch, useSelector} from "react-redux";
import {initShop} from "../redux/actions/shopActions";
import {isRole, ROLE_SHOP} from "../service/auth";

const Home = lazy(() => import('../pages/shop/home'));
const Products = lazy(() => import('../pages/shop/products'));
const ProductCreating = lazy(() => import('../pages/shop/product-creating'));
const ProductUpdating = lazy(() => import('../pages/shop/product-updating'));
const Order = lazy(() => import('../pages/shop/order'));
const Orders = lazy(() => import('../pages/shop/orders'));

const routes = [
    {path: '/', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/trang-chu', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/san-pham', exact: true, component: Products, replaceTo: '/dang-nhap'},
    {path: '/don-dat-hang', exact: true, component: Orders, replaceTo: '/dang-nhap'},
    {path: '/don-dat-hang/:id', exact: true, component: Order, replaceTo: '/dang-nhap'},
    {path: '/san-pham/dang-ban', exact: true, component: ProductCreating, replaceTo: '/dang-nhap'},
    {path: '/san-pham/:id', exact: true, component: ProductUpdating, replaceTo: '/dang-nhap'},
];

function ShopRouter() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isRole(user, ROLE_SHOP)) return navigate("/trang-chu");

        async function init() {
            const action = await initShop({userId: user.id})
            dispatch(action);
        }

        init()
            .then(res => setLoading(false))
            .catch(err => navigate("/dang-nhap"))

    }, [dispatch, navigate, user])

    if (loading) return <Loader/>

    return (
        <Routes>
            {routes.map((route) => {
                return (
                    <Route key={route.path} exact={route.exact} path={route.path}>
                        <Route exact path='' element={<route.component/>}/>
                    </Route>
                )
            })}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default ShopRouter;