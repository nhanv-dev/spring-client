import React, {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {UilCalling, UilEnvelope, UilUser} from '@iconscout/react-unicons'
import UserLayout from "../../../components/web/user-layout";
import {useDispatch, useSelector} from "react-redux";
import ToastCustom from "../../../components/common/toast-custom";
import {toast} from "react-hot-toast";
import {updateUser} from "../../../redux/actions/userActions";
import * as types from '../../../redux/constants/ActionType';
import {Link} from "react-router-dom";

function UserProfile() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        if (!user) return;
        setName(user.name);
        setPhone(user.phoneNumber);

    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return toast.error('Vui lòng điền tên người dùng.');
        if (!phone) return toast.error('Vui lòng điền số điện thoại người dùng.');
        const action = await updateUser({id: user.id, name, phoneNumber: phone})
        dispatch(action);
        if (action.type === types.user.UPDATE_USER_SUCCESS)
            toast.success("Cập nhật thông tin người dùng thành công");
        else
            toast.error("Cập nhật thông tin người dùng thất bại");
    }

    return (
        <Helmet title={'Depot - Thông tin người dùng'}>
            <UserLayout>
                <ToastCustom/>
                <div className="flex-1">
                    <div className="bg-white rounded-md shadow-md p-5">
                        <div className="font-semibold text-xl gap-3 mb-5">
                            Thông tin khách hàng
                        </div>
                        <form className="w-full max-w-[500px]" onSubmit={handleSubmit}>
                            <div className="mb-6 flex flex-wrap items-center justify-start gap-5">
                                <label htmlFor="name"
                                       className="min-w-[150px] w-[150px] block font-semibold text-tiny text-black-1">
                                    Email
                                </label>
                                <div
                                    className="flex-1 bg-app-2 flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEnvelope className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="name" type="text" value={user.email} disabled={true} readOnly={true}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1 bg-app-2"/>
                                    </div>
                                </div>
                            </div>
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
                            <div className="flex items-center justify-end gap-3 pt-8">
                                <button type="reset"
                                        className="min-w-max px-6 py-1.5 rounded-md text-tiny font-semibold text-secondary bg-secondary-bg">
                                    Hủy
                                </button>
                                <Link to={"/nguoi-dung/doi-mat-khau"}
                                      className="min-w-max px-6 py-1.5 rounded-md text-tiny font-semibold text-info bg-info-bg">
                                    Đổi mật khẩu
                                </Link>
                                <button type="submit"
                                        className="min-w-max px-5 py-1.5 rounded-md text-tiny font-semibold text-primary bg-primary-bg">
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