import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserRouter from "./UserRouter";
import ManagerRouter from "./ManagerRouter";
import AdminRouter from "./AdminRouter";

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

function Loader() {
    return (
        <div className="fixed z-50 bg-white top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <img src="https://www.pngrepo.com/png/199956/512/loading-loader.png" alt="spinner"
                 className="w-[60px] h-[60x] animate-spin"/>
        </div>
    );
}

export default Router;