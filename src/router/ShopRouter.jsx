import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Loader, NotFound} from "./Router";
import PrivateRouter from "./PrivateRouter";
import {useDispatch, useSelector} from "react-redux";
import {initShop} from "../redux/actions/shopActions";

const Home = lazy(() => import('../pages/shop/home'));
const Products = lazy(() => import('../pages/shop/products'));
const ProductCreating = lazy(() => import('../pages/shop/product-creating'));
const ProductUpdating = lazy(() => import('../pages/shop/product-updating'));
const Orders = lazy(() => import('../pages/shop/orders'));
const UpdateShopProfile = lazy(() => import('../pages/shop/update-shop-profile'));

const routes = [
    {path: '/', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/trang-chu', exact: true, component: Home, replaceTo: '/dang-nhap'},
    {path: '/san-pham', exact: true, component: Products, replaceTo: '/dang-nhap'},
    {path: '/don-dat-hang', exact: true, component: Orders, replaceTo: '/dang-nhap'},
    {path: '/san-pham/dang-ban', exact: true, component: ProductCreating, replaceTo: '/dang-nhap'},
    {path: '/san-pham/:id', exact: true, component: ProductUpdating, replaceTo: '/dang-nhap'},
    {path: '/thong-tin', exact: true, component: UpdateShopProfile, replaceTo: '/dang-nhap'},
];

function ShopRouter() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.token) return navigate("/trang-chu");
        const isShop = user.roles.findIndex(role => role === 'ROLE_SHOP') !== -1;
        if (isShop) {
            async function init() {
                const action = await initShop({userId: user.id})
                dispatch(action);
            }

            init()
                .then(res => setLoading(false))
                .catch(err => navigate("/trang-chu"))
        } else {
            navigate("/trang-chu")
        }
    }, [])

    if (loading) return <Loader/>

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

export default ShopRouter;