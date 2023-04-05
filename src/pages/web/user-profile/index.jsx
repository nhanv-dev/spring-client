import React, {useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {
    UilUser, UilCalling, UilEnvelopeEdit
} from '@iconscout/react-unicons'
import {publicRequest} from "../../../util/request-method";
import {useNavigate} from "react-router-dom";
import UserLayout from "../../../components/web/user-layout";

function UserProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        if (!name || !phone || !email) return;
        publicRequest().post("/auth/user-profile", {name, phone, email})
            .then(res => {
                if (res.status === 200) navigate("/thong-tin")
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <Helmet title={'Depot - Thông tin người dùng'}>
            <UserLayout>
                <div className="flex-1">
                    <div className="bg-white rounded-md shadow-md p-5">
                        <div className="font-semibold text-xl gap-3 mb-5">
                            Thông tin khách hàng
                        </div>
                        <form className="w-full max-w-[500px]" onClick={handleSubmit}>
                            <div className="mb-6 flex flex-wrap items-center justify-start gap-5">
                                <label htmlFor="name"
                                       className="min-w-[150px] w-[150px] block font-semibold text-tiny text-black-1">
                                    Họ và tên
                                </label>
                                <div
                                    className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilUser className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="name" type="text" value={name}
                                               onChange={e => setName(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-wrap items-center justify-start gap-5">
                                <label htmlFor="phone"
                                       className="min-w-[150px] w-[150px] block font-semibold text-tiny text-black-1">
                                    Số điện thoại
                                </label>
                                <div
                                    className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
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
                            <div className="mb-6 flex flex-wrap items-center justify-start gap-5">
                                <label htmlFor="email"
                                       className="min-w-[150px] w-[150px] block font-semibold text-tiny text-black-1">
                                    Email
                                </label>
                                <div
                                    className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEnvelopeEdit className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="email" value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button type="reset"
                                        className="min-w-max px-5 bg-primary h-[40px] rounded-md text-tiny font-semibold text-primary bg-primary-bg">
                                    Hủy
                                </button>
                                <button type="submit"
                                        className="min-w-max px-5 bg-primary h-[40px] rounded-md text-tiny font-semibold text-primary bg-primary-bg">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </UserLayout>
        </Helmet>
    );
}

export default UserProfile;