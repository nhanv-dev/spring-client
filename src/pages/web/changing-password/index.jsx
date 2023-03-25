import React, {useState} from 'react';
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import {UilEyeSlash, UilKeyholeCircle} from '@iconscout/react-unicons'
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
        <Helmet title={'Depot - Đổi mật khẩu'}>
            <UserLayout>
                <div className="bg-white rounded-md shadow p-5">
                    <div className="font-semibold text-xl gap-3 mb-5">
                        Đổi mật khẩu
                    </div>
                    <form className="w-full max-w-[500px]" onClick={handleSubmit}>
                        <div className="mb-6 flex items-center gap-5 flex-wrap justify-start">
                            <label htmlFor="old-password"
                                   className="w-[150px] block font-semibold text-md text-black-1">
                                Mật khẩu hiện tại
                            </label>
                            <div
                                className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow">

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

                        <div className="mb-6 flex items-center gap-5 flex-wrap justify-start">
                            <label htmlFor="new-password"
                                   className="w-[150px] block font-semibold text-md text-black-1">
                                Nhập mật khẩu mới
                            </label>
                            <div
                                className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow">

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
                        <div className="mb-6 flex items-center gap-5 flex-wrap justify-start">
                            <label htmlFor="repeat-password"
                                   className="w-[150px] block font-semibold text-md text-black-1">
                                Nhập lại mật khẩu mới
                            </label>
                            <div
                                className="flex-1 bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow">

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

                        <div className="flex items-center justify-end gap-3">
                            <button type="reset"
                                    className="min-w-max px-5 bg-primary h-[40px] rounded-md text-tiny font-semibold text-primary bg-primary-bg">
                                Reset
                            </button>
                            <button type="submit"
                                    className="min-w-max px-5 bg-primary h-[40px] rounded-md text-tiny font-semibold text-primary bg-primary-bg">
                                Đổi mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </UserLayout>
        </Helmet>
    );
}

export default ChangingPassword;