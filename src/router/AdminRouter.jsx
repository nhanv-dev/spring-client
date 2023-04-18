import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Loader, NotFound} from "./Router";
import {useSelector} from "react-redux";
import {isRole, ROLE_ADMIN} from "../service/auth";

const Home = lazy(() => import('../pages/admin/home'));
const SalesRegister = lazy(() => import('../pages/admin/sales-register'));
const SignIn = lazy(() => import('../pages/admin/sign-in'));

const routes = [
    {path: '/', exact: true, component: Home, replaceTo: '/quan-tri/dang-nhap'},
    {path: '/trang-chu', exact: true, component: Home, replaceTo: '/quan-tri/dang-nhap'},
    {path: '/don-ban-hang', exact: true, component: SalesRegister, replaceTo: '/quan-tri/dang-nhap'},
    {path: '/dang-nhap', exact: true, component: SignIn, replaceTo: '/quan-tri/dang-nhap'},
];

function AdminRouter() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isRole(user, ROLE_ADMIN)) return navigate("/quan-tri/dang-nhap");
        setLoading(false);
    }, [navigate, user])

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

export default AdminRouter;