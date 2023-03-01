import React from 'react';
import Header from "../../admin/header";
import Sidebar from "../../admin/sidebar";

const Layout = ({children}) => {
    return (
        <div className="w-full max-w-full relative">
            <Header></Header>
            <Sidebar></Sidebar>
            <div className="ml-[66px] mt-[76px] py-5 bg-[#F3F6F9] min-h-[100vh]">
                {children}
            </div>
        </div>
    )
}
export default Layout;