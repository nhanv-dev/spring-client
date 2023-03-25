import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import UserRouter from "./UserRouter";
import ManagerRouter from "./ManagerRouter";
import AdminRouter from "./AdminRouter";
import PageNotFound from '../assets/images/404-errors.png';

function Router() {

    return (
        <React.Suspense fallback={<Loader/>}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<UserRouter/>}/>
                    <Route exact path="/quan-tri/*" element={<AdminRouter/>}/>
                    <Route exact path="/kenh-ban-hang/*" element={<ManagerRouter/>}/>
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    );
}

export function NotFound() {
    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center">
            <div className="w-[600px]">
                <img
                    src={'https://www.dpmarketingcommunications.com/wp-content/uploads/2016/11/404-Page-Featured-Image.png'}
                    alt="404" className="w-full"/>
                <Link to={"/trang-chu"} className="block mx-auto w-max px-6 py-2 rounded-md bg-primary-bg text-primary font-semibold">
                    Quay lại trang chủ
                </Link>
            </div>
        </div>
    )
}

export function Loader() {
    return (
        <div className="fixed z-50 bg-white top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <img src="https://www.pngrepo.com/png/199956/512/loading-loader.png" alt="spinner"
                 className="w-[60px] h-[60x] animate-spin"/>
        </div>
    );
}

export default Router;