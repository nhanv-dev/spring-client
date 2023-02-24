import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import Menu from "./Menu";
import * as Icon from '@iconscout/react-unicons';
import Logo from "../../../assets/img/logo-white.svg";
import {publicRequest} from "../../../utils/requestMethods";
import UserComponent from "./UserComponent";
import {useSelector} from "react-redux";

function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [scrollTop, setScrollTop] = useState(0);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        publicRequest.get('/categories?limit=8').then((res) => {
            setCategories(res.data.categories)
        });
    }, [])

    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop])
    const handleSearch = (e) => {
        e.preventDefault();
        const {searching, type} = e.target;
        if (searching.value && type.value)
            navigate(`/tim-kiem?s=${searching.value}&t=${type.value}`)
    }
    return (
        <header>
            <div className="h-[35px] bg-[#D0011B] flex items-center">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                            <Link to="/kenh-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-white">
                                <span>Kênh người bán</span>
                            </Link>
                            <Link to="/dang-ky-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-white">
                                <span>Bán hàng cùng Shopio</span>
                            </Link>
                        </div>
                        <div className="flex justify-start items-center gap-4">
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-white">
                                <span>Chăm sóc khách hàng</span>
                            </p>
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-white">
                                <span>Hỗ trợ</span>
                            </p>
                            <p className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-white">
                                <span>Kiểm tra đơn hàng</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[95px] flex items-center bg-[#D0011B] border-b-[1px] border-[#E5E5E5]">
                <div className="container">
                    <div className="flex gap-6 justify-between items-center">
                        <div className="w-[200px]">
                            <Link to="/trang-chu" className="block w-[120px]">
                                <img className="w-full h-auto" src={Logo} alt="logo"/>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <div
                                className="max-w-max mx-auto rounded-[5px] px-1 py-2 h-[40px] flex bg-white  items-center justify-center">
                                <form onSubmit={handleSearch} className="flex item-center gap-4 relative">
                                    <input type="text" name="searching"
                                           className="w-[400px] pl-3 text-gray bg-white text-tiny font-normal bg-white flex-1 focus-visible:outline-none"
                                           placeholder="Tìm kiếm sản phẩm..."/>
                                    <div className="relative">
                                        <div
                                            className="absolute w-[2px] h-[80%] top-[50%] translate-y-[-50%] bg-[#00000017]"/>
                                    </div>
                                    <div className="cursor-pointer w-[100px]">
                                        <OptionSearch/>
                                    </div>
                                    <div className="w-[60px] h-[32px] flex items-center justify-end">
                                        <button type="submit"
                                                className="bg-primary w-[60px] h-[32px] rounded-[5px] flex items-center justify-center">
                                            <Icon.UilSearch className="w-[22px] h-[22px] text-white"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="w-[200px] flex items-center justify-end gap-10">
                            <UserComponent/>
                            <Link to="/gio-hang" className="relative outline-none group">
                                <Icon.UilShoppingBag className="w-[26px] h-[26px] text-white"/>
                                <p className="transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] left-[50%] translate-x-[-50%] min-w-max bg-black text-white font-medium rounded-[8px] text-sm px-2.5 py-1">
                                    <span
                                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#333333]"/>
                                    Giỏ hàng
                                </p>
                                <p className="absolute right-[-10px] top-[-10px] rounded-full bg-white w-[20px] h-[20px] flex items-center justify-center text-primary ">
                                    <span className="text-tiny font-medium relative top-[1px]">{cart?.items?.length || 0}</span>
                                </p>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`bg-[white] shadow-lg transition-all z-50 border-b-[1px] border-[#E5E5E5] ${scrollTop >= 150 && 'fixed top-0 left-0 right-0'}`}>
                <div className="container">
                    <div className="flex gap-6 py-2 relative">
                        <div
                            className="group bg-primary-hover min-w-[200px] px-4 py-2.5 rounded-[6px] flex items-center justify-between gap-4">
                            <Link to="/danh-muc" className="text-white flex items-center justify-between w-full">
                                <p className="flex items-center gap-3">
                                    <Icon.UilApps className="w-[20px] relative top-[1px]"/>
                                    <span className="font-bold tracking-tight capitalize">Danh mục</span>
                                </p>
                                <Icon.UilAngleDown className="relative top-[1px] w-[26px] w-[26px]"/>
                            </Link>
                            <div
                                className="min-w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                    shadow-tiny transition-all absolute top-full left-0 rounded-[4px] bg-white z-50">
                                <Menu categories={categories}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="h-[30px] w-[1.5px] bg-[#DDDEE3] align-middle"></div>
                        </div>
                        <div className="flex items-center justify-between flex-1">
                            <div className="flex items-center justify-start gap-8">
                                <Link to="/tin-tuc"
                                      className="hover:text-primary-hover transition-all text-black-1 font-bold text-md capitalize">
                                    Tin tức
                                </Link>
                                <Link to="/thong-bao"
                                      className="hover:text-primary-hover transition-all text-black-1 font-bold text-md capitalize">
                                    Thông báo
                                </Link>
                            </div>
                            <Link to="/dau-gia"
                                  className="group flex items-center gap-1 hover:text-primary-hover transition-all text-primary font-bold text-base capitalize">
                                <Icon.UilFire
                                    className="group-hover:fill-primary-hover fill-primary transition-all"/> Sàn đấu giá
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

const OptionSearch = () => {
    const [active, setActive] = useState(0);
    const options = [
        {value: 'san-pham', label: 'Sản phẩm'},
        {value: 'cua-hang', label: 'Cửa hàng'},
        {value: 'danh-muc', label: 'Danh mục'}
    ]
    return (
        <div className="flex items-center justify-center h-full">
            <div className="group relative">
                <div className="w-[90px] flex items-center justify-between">
                    <p className="flex-1 line-clamp-1 font-medium text-md">
                        {options[active].label}
                    </p>
                    <input type="text" name="type" value={options[active].value} className="hidden" onChange={() => {
                    }}/>
                    <Icon.UilAngleDown className="w-[20px] h-[20px]"/>
                </div>
                <div
                    className="group-hover:visible group-hover:opacity-100 opacity-0 invisible transition-all absolute top-[100%] left-[50%] translate-x-[-50%] pt-[20px] min-w-max z-[100]">
                    <div className="relative p-3 bg-white flex flex-col shadow-md rounded-[5px] w-[150px] z-[100]">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => setActive(index)} type="button"
                                    className="z-[100] font-medium text-md text-black-1 p-1 cursor-pointer z-50 flex items-center justify-between gap-3">
                                {option.label}
                                {index === active &&
                                    <Icon.UilCheck className="w-[20px] h-[20px] text-primary"/>
                                }
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;