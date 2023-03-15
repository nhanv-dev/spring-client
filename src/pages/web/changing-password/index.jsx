import React, {useState} from 'react';
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import {
    UilEyeSlash, UilKeyholeCircle
} from '@iconscout/react-unicons'
import UserSidebar from "../../../components/web/manage-user-sidebar";
import {publicRequest} from "../../../util/request-method";
import {useNavigate} from "react-router-dom";
import UserLayout from "../../../components/web/user-layout";

function ChangingPassword() {
    const navigate = useNavigate();
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    const handleSubmit = async (e) => {
        if (!oldPass || !newPass || !repeatPass) return;
        publicRequest().post("/auth/changing-password", {oldPass, newPass, repeatPass})
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

                <div className="bg-white rounded-md shadow-md p-5">
                    <div className="flex items-end font-semibold text-[1.4rem] gap-3 mb-3">
                        Đổi mật khẩu
                    </div>
                    <form className="w-full" onClick={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="old-password"
                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                Mật khẩu cũ
                            </label>
                            <div
                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilKeyholeCircle className="w-full h-full text-gray"/>
                                    </div>
                                    <input id="old-password" type="password" value={oldPass}
                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"

                                           onChange={(e) => setOldPass(e.target.value)}/>
                                    <button tabIndex={-1}
                                            className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilEyeSlash className="w-full h-full text-gray"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="new-password"
                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                Nhập mật khẩu mới
                            </label>
                            <div
                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilKeyholeCircle className="w-full h-full text-gray"/>
                                    </div>
                                    <input id="new-password" type="password" value={newPass}
                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                           onChange={(e) => setNewPass(e.target.value)}/>
                                    <button tabIndex={-1}
                                            className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilEyeSlash className="w-full h-full text-gray"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="repeat-password"
                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                Nhập lại mật khẩu mới
                            </label>
                            <div
                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilKeyholeCircle className="w-full h-full text-gray"/>
                                    </div>
                                    <input id="repeatPassword" type="password" value={repeatPass}
                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                           onChange={(e) => setRepeatPass(e.target.value)}/>
                                    <button tabIndex={-1}
                                            className="flex items-center justify-center w-[18px] h-[18px]">
                                        <UilEyeSlash className="w-full h-full text-gray"/>
                                    </button>
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
            </UserLayout>
        </Helmet>
    );
}

export default ChangingPassword;