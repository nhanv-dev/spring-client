import React, { useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {useNavigate} from "react-router-dom";
import {
    UilAt,
    UilPhone,
    UilStore,
    UilText,
    UilImageEdit
} from '@iconscout/react-unicons'
import {publicRequest} from "../../../util/request-method";

import Layout from '../../../components/shop/layout';



function UpdateShopProfile() {
    const navigate = useNavigate()
    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shopSlogan, setShopSlogan] = useState("");
    const [shopLogo, setShopLogo] = useState("");
    const [shopBackground, setShopBackground] = useState("");

    const handleSubmit = async (e) => {
        if (!shopName || !email || !phoneNumber || !shopSlogan || !shopLogo || !shopBackground ) return;
        publicRequest().post("/auth/update-shop-profile", {shopName, email, phoneNumber, shopSlogan, shopLogo, shopBackground})
            .then(res => {
                if (res.status === 200) navigate("/thong-tin")
            })
            .catch(err => {
                console.log(err)
            })

    }

    return ( 
        <Helmet title="Depot - Thông tin Shop">
            <Layout>
            <div className="relative">
                <div className="container max-w-[1200px] pt-[60px] pb-[60px]">
                    <div className="flex">
                        <div className="w-2/3 relative bg-cover bg-center z-50 pl-[120px]">
                            <div className="flex items-end font-semibold text-[1.4rem] gap-3 mb-3">
                                Cập nhật thông tin
                            </div>
                            <form  onClick={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="shopName"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Tên cửa hàng / thương hiệu
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilStore className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="shopName" type="text" 
                                            value={shopName}
                                                   onChange={(e) => setShopName(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="block font-semibold text-tiny text-black-1 mb-2">
                                        Địa chỉ email
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilAt className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="email" type="email" 
                                            value={email}
                                                   onChange={(e) => setEmail(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="phoneNumber"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Số điện thoại
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilPhone className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="phoneNumber" type="number" 
                                            value={phoneNumber}
                                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="shopSlogan"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Shop Slogan
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilText className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="shopSlogan" type="text" 
                                            value={shopSlogan}
                                                   onChange={(e) => setShopSlogan(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="shopLogo"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Shop Logo
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilImageEdit className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="shopLogo" type="url" 
                                            value={shopLogo}
                                                   onChange={(e) => setShopLogo(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="shopBackground"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Shop Background
                                    </label>
                                    <div
                                        className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                <UilImageEdit className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="shopBackground" type="url" 
                                            value={shopBackground}
                                                   onChange={(e) => setShopBackground(e.target.value)}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button type="submit"
                                            className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                        CẬP NHẬT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-[#F5F5FA] absolute right-0 top-0 bottom-0 w-1/2"/>
            </div>
            
            </Layout>
        </Helmet>
    );
}

export default UpdateShopProfile;