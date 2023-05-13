import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ShopRouter from "./ShopRouter";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";

function Router() {

    return (
        <React.Suspense fallback={<Loader/>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<UserRouter/>}/>
                    <Route path="/kenh-ban-hang/*" element={<ShopRouter/>}/>
                    <Route path="/quan-tri/*" element={<AdminRouter/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    );
}

export function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col items-center justify-center">
            <img
                src={'https://1.bp.blogspot.com/-W_8l-L7BARo/Xs0wlcD8GcI/AAAAAAAAJhQ/H5ztSXUAVYIKy2cEynjAOMd1M9qicizcgCLcBGAsYHQ/s1600/404.png'}
                alt="404" className="w-[500px] mb-10"/>
            <button onClick={() => navigate(-1)}
                    className="block mx-auto w-max px-6 py-2 rounded-md bg-primary-bg text-primary font-semibold">
                Quay lại
            </button>
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