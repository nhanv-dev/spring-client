import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import DefaultAvatar from "../../../assets/images/default-avatar.png";
import * as Icon from "@iconscout/react-unicons";

function ManageUserSidebar() {
    const user = useSelector(state => state.user);

    return (
        <div className="w-[250px]">
            <div className="mt-3">
                <div className="flex items-center justify-start gap-3 mb-6">
                    <div className="rounded-full border-[3px] border-primary">
                        <div style={{backgroundImage: `url(${user.avatar || DefaultAvatar})`}}
                             className="rounded-full bg-cover bg-center min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] "/>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-tiny line-clamp-1 mb-0.5">
                            {user?.name}
                        </p>
                        <Link to="/nguoi-dung/thong-tin"
                              className="flex items-center justify-start gap-1 text-sm text-[#888] hover:text-primary transition-all">
                            <Icon.UilEdit className="w-[16px] h-[16px]"/>
                            <span className="font-medium">Chỉnh sửa thông tin</span>
                        </Link>
                    </div>
                </div>
                <div className="mb-2">
                    <Link to="/nguoi-dung/thong-tin"
                          className="block font-semibold text-md mb-3 hover:text-primary transition-all">
                        Quản lý tài khoản
                    </Link>
                    <div className="flex flex-col gap-4 ml-5 mb-5">
                        <Link to="/nguoi-dung/thong-tin"
                              className="flex items-center justify-start gap-2 font-medium text-tiny text-black-1 transition-all hover:text-primary">
                            <Icon.UilUser className="w-[20px] h-[20px]"/>
                            <span>Tài khoản của tôi</span>
                        </Link>
                        <Link to="/nguoi-dung/dia-chi"
                              className="flex items-center justify-start gap-2 font-medium text-tiny text-black-1 transition-all hover:text-primary">
                            <Icon.UilMapMarker className="w-[20px] h-[20px]"/>
                            <span>Địa chỉ</span>
                        </Link>
                        <Link to="/nguoi-dung/doi-mat-khau"
                              className="flex items-center justify-start gap-2 font-medium text-tiny text-black-1 transition-all hover:text-primary">
                            <Icon.UilLock className="w-[20px] h-[20px]"/>
                            <span>Đổi mật khẩu</span>
                        </Link>
                    </div>
                </div>
                <div className="mb-2">
                    <Link to="/nguoi-dung/don-dat-hang" className="block font-semibold text-md mb-3 hover:text-primary transition-all">
                        Đơn hàng của tôi
                    </Link>
                    <div className="flex flex-col gap-4 ml-5 mb-5">
                        <Link to="/nguoi-dung/don-dat-hang"
                              className="flex items-center justify-start gap-2 font-medium text-tiny text-black-1 transition-all hover:text-primary">
                            <Icon.UilReceiptAlt className="w-[20px] h-[20px]"/>
                            <span>Đơn đặt hàng</span>
                        </Link>
                        <Link to="/nguoi-dung/hoa-don"
                              className="flex items-center justify-start gap-2 font-medium text-tiny text-black-1 transition-all hover:text-primary">
                            <Icon.UilCreditCardSearch  className="w-[20px] h-[20px]"/>
                            <span>Hóa đơn</span>
                        </Link>
                    </div>
                </div>
                <div className="mb-2">
                    <Link to="/nguoi-dung/danh-gia" className="block font-semibold text-md mb-3 hover:text-primary transition-all">
                        Đánh giá của tôi
                    </Link>
                </div>
                <div className="mb-2">
                    <Link to="/nguoi-dung/cau-hoi" className="block font-semibold text-md mb-3 hover:text-primary transition-all">
                        Câu hỏi của tôi
                    </Link>
                </div>
                <div className="mb-2">
                    <Link to="/kenh-ban-hang" className="block font-semibold text-md mb-3 hover:text-primary transition-all">
                        Bán hàng trên Depot
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ManageUserSidebar;