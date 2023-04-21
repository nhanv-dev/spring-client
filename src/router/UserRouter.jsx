// import React, {lazy} from 'react';
// import {Route, Routes} from "react-router-dom";
// import {NotFound} from "./Router";
// import {useSelector} from "react-redux";
// import {isRole, ROLE_USER} from "../service/auth";
// import ProtectedRoute from "./ProtectedRoute";
//
// const SalesRegister = lazy(() => import('../pages/web/sales-register'));
// const UserAddresses = lazy(() => import('../pages/web/user-addresses'));
// const ChangingPassword = lazy(() => import('../pages/web/changing-password'));
// const userProfile = lazy(() => import('../pages/web/user-profile'));
// const Order = lazy(() => import('../pages/web/order'));
// const PlaceOrder = lazy(() => import('../pages/web/place-order'));
// const PlaceOrderSuccess = lazy(() => import('../pages/web/place-order-success'));
//
//
// const routes = [
//     {path: '/dang-ky-ban-hang', element: SalesRegister},
//     {path: '/dat-hang', element: PlaceOrder},
//     {path: '/dat-hang-thanh-cong', element: PlaceOrderSuccess},
//     {path: '/dia-chi', element: UserAddresses},
//     {path: '/don-dat-hang', element: Order},
//     {path: '/doi-mat-khau', element: ChangingPassword},
//     {path: '/thong-tin', element: userProfile},
// ];
//
// function UserRouter() {
//     const user = useSelector(state => state.user);
//
//     return (
//         <>
//             {routes.map(route => (
//                 <Route key={route.path} path={route.path} element={
//                     <ProtectedRoute isAccepted={isRole(user, ROLE_USER)} to={"/dang-nhap"}>
//                         <route.element/>
//                     </ProtectedRoute>
//                 }/>
//             ))}
//         </>
//     );
// }
//
// export default UserRouter;