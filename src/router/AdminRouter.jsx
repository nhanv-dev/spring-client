import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./Router";
import {useSelector} from "react-redux";
import {isRole, ROLE_ADMIN} from "../service/AuthService";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import('../pages/admin/home'));
const SalesRegister = lazy(() => import('../pages/admin/sales-register'));
const Shops = lazy(() => import('../pages/admin/shops'));
const SignIn = lazy(() => import('../pages/admin/sign-in'));

const routes = [
    {path: '/', element: Home},
    {path: '/trang-chu', element: Home},
    {path: '/don-ban-hang', element: SalesRegister},
    {path: '/cua-hang', element: Shops},
]


function AdminRouter() {
    const user = useSelector(state => state.user);

    return (
        <Routes>
            <Route path={"/dang-nhap"} element={<SignIn/>}/>
            {routes.map((route) => (
                <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isAccepted={isRole(user, ROLE_ADMIN)} to={"/quan-tri/dang-nhap"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default AdminRouter;