import React, {useState} from 'react';
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import {
    UilUser, UilCalling, UilEnvelopeEdit
} from '@iconscout/react-unicons'
import UserSidebar from "../../../components/web/manage-user-sidebar";
import {publicRequest} from "../../../util/request-method";
import { useNavigate} from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        if (!name || !phone || !email) return;
        publicRequest().post("/auth/user-profile", { name, phone, email})
            .then(res => {
                if (res.status === 200) navigate("/thong-tin")
            })
            .catch(err => {
                console.log(err)
            })
        
    }
   
    return (
        <Helmet title={'Depot - Thông tin người dùng'}>
            <Layout>
                <div className="bg-app-1 py-10">
                    <div className="container">
                        <div className="flex items-start gap-5">
                            <UserSidebar/>
                            <div className="flex-1">
                                <div className="flex items-end font-semibold text-[1.4rem] gap-3 mb-3">
                                     Thông tin khách hàng
                                </div>
                                <div className="bg-white rounded-[5px] shadow-md">
                                    <form className="w-full" onClick={handleSubmit} >
                                        <div className="mb-5">
                                            <label htmlFor="name"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Họ và tên
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                    <UilUser className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="name" type="text" value={name}
                                                    onChange={ e => setName(e.target.value)}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="phone"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Số điện thoại
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                    <UilCalling className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="phone" type="number" value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Email
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                    <UilEnvelopeEdit className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="email" type="email" value={email}
                                                    onChange={ e => setEmail(e.target.value)}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <button type="submit"
                                                    className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                                XÁC NHẬN
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default UserProfile;