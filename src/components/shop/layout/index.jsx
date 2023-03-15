import React from 'react';
import Header from "../../shop/header";
import Sidebar from "../../shop/sidebar";

const Layout = ({children}) => {
    return (
        <div className="w-full max-w-full relative">
            <Header></Header>
            <Sidebar></Sidebar>
            <div className="ml-[66px] mt-[76px] p-10 bg-app-1 min-h-[100vh]">
                {children}
            </div>
        </div>
    )
}
export default Layout;