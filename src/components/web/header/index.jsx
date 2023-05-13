import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import Category from "./Category";
import {publicRequest} from "../../../util/request-method";
import UserComponent from "./UserComponent";
import {useSelector} from "react-redux";
import * as Icon from '@iconscout/react-unicons';
import Logo from "../../../assets/images/logo.png";
import SearchingBar from "./SearchingBar";

function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        publicRequest().get('/categories?page=1&limit=10')
            .then((res) => {
                setCategories(res.data?.content || [])
            })
            .catch((err => {
                setCategories([])
            }));
    }, [])



    return (
        <header className="shadow-xl border-primary border-b-[3px] max-w-full">
            <div className="h-[35px] bg-white flex items-center border-b-border-1 border-b-[1px]">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                            <Link to="/kenh-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Kênh bán hàng</span>
                            </Link>
                            <Link to="/nguoi-dung/dang-ky-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Bán hàng cùng Depot</span>
                            </Link>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Chăm sóc khách hàng</span>
                            </p>
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Hỗ trợ</span>
                            </p>
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Kiểm tra đơn hàng</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-5 flex items-center bg-white border-b-[1px] border-b-border">
                <div className="container">
                    <div className="relative flex flex-wrap gap-x-10 gap-y-3 justify-between items-center">
                        <div className="w-[150px]">
                            <Link to="/trang-chu" className="block w-[130px]">
                                <img className="w-full h-auto" src={Logo} alt="logo"/>
                            </Link>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex items-center gap-5">
                                <div className="min-w-max">
                                    <div
                                        className="w-[40px] h-[40px] flex items-center justify-center group bg-primary-bg text-primary rounded-md transition-all">
                                        <Link to="/danh-muc" className="flex items-center justify-center w-full">
                                            <Icon.UilApps className="w-[20px] relative top-[1px]"/>
                                        </Link>
                                        <Category categories={categories}/>
                                    </div>
                                </div>
                                <SearchingBar/>
                            </div>
                        </div>
                        <div className="min-w-max flex items-center justify-end gap-3">
                            <Link to="/"
                                  className="relative outline-none group flex items-center gap-1 bg-primary-bg p-2 px-3 rounded-md">
                                <Icon.UilEstate className="w-[20px] h-[20px] text-primary"/>
                                <p className="transition-all text-primary text-[.85rem] relative top-[1px] font-bold">
                                    Trang chủ
                                </p>
                            </Link>
                            <UserComponent/>
                            <Link to="/gio-hang"
                                  className="relative outline-none group bg-primary-bg p-2 rounded-md">
                                <Icon.UilShoppingBag className="w-[24px] h-[24px] text-primary"/>
                                <p className="transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] left-[50%] translate-x-[-50%] min-w-max bg-black text-white font-medium rounded-[8px] text-sm px-2.5 py-1">
                                    <span
                                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#333333]"/>
                                    Giỏ hàng
                                </p>
                                <p className="absolute right-[-9px] top-[-9px] rounded-full min-w-[22px] min-h-[22px] flex items-center justify-center text-white bg-red">
                                    <span
                                        className="text-sm font-semibold relative top-[0.5px]">{cart?.items?.length || 0}</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;