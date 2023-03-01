import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import Category from "./Category";
import {publicRequest} from "../../../util/request-method";
import UserComponent from "./UserComponent";
import {useSelector} from "react-redux";
import * as Icon from '@iconscout/react-unicons';
import Logo from "../../../assets/images/logo.png";

function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        publicRequest().get('/category?limit=10')
            .then((res) => {
                setCategories(res.data?.content || [])
            })
            .catch((err => {
                setCategories([])
            }));
    }, [])


    const handleSearch = (e) => {
        e.preventDefault();
        const {searching, type} = e.target;
        if (searching.value && type.value)
            navigate(`/tim-kiem?s=${searching.value}&t=${type.value}`)
    }

    return (
        <header className="shadow-xl">
            <div className="h-[35px] bg-white flex items-center border-b-border border-b-[1px]">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                            <Link to="/kenh-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Kênh người bán</span>
                            </Link>
                            <Link to="/dang-ky-ban-hang"
                                  className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium text-black">
                                <span>Bán hàng cùng Shopio</span>
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
            <div className="h-[95px] flex items-center bg-white border-b-[1px] border-b-border">
                <div className="container">
                    <div className="relative flex gap-6 justify-between items-center">
                        <div className="w-[150px]">
                            <Link to="/trang-chu" className="block w-[130px]">
                                <img className="w-full h-auto" src={Logo} alt="logo"/>
                            </Link>
                        </div>
                        <div className="flex-1 ">
                            <div className="flex items-center gap-5">
                                <div className="min-w-max">
                                    <div
                                        className="w-[40px] h-[40px] flex items-center justify-center group bg-primary-1-hover text-primary rounded-lg transition-all">
                                        <Link to="/danh-muc" className="flex items-center justify-center w-full">
                                            <Icon.UilApps className="w-[20px] relative top-[1px]"/>
                                        </Link>
                                        <Category categories={categories}/>
                                    </div>
                                </div>
                                <div
                                    className="border-border border flex-1 rounded-md min-h-[40px] h-[40px] flex bg-white items-center justify-center">
                                    <form onSubmit={handleSearch} className="flex item-center relative h-full w-full">
                                        <div className="cursor-pointer">
                                            <OptionSearch/>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="absolute w-[1px] h-[100%] top-[50%] translate-y-[-50%] bg-[#00000017]"/>
                                        </div>
                                        <input type="text" name="searching"
                                               className="px-3 w-[400px] text-[#666] bg-white text-tiny font-normal bg-white flex-1 focus-visible:outline-none"
                                               placeholder="Bạn tìm gì hôm nay"/>
                                        <div className="w-[60px] h-[40px] flex items-center justify-end">
                                            <button type="submit"
                                                    className="bg-primary w-full h-full rounded-r-md flex items-center justify-center">
                                                <Icon.UilSearch className="w-[20px] h-[20px] text-white"/>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] flex items-center justify-end gap-5">
                            <Link to="/gio-hang"
                                  className="relative outline-none group flex items-center gap-1 bg-primary-1-hover p-2 px-3.5 rounded-lg">
                                <Icon.UilEstate className="w-[22px] h-[22px] text-primary"/>
                                {/*<p className="transition-all font-medium text-primary text-tiny pt-0.5">*/}
                                {/*    Trang chủ*/}
                                {/*</p>*/}
                            </Link>
                            <UserComponent/>
                            <Link to="/gio-hang"
                                  className="relative outline-none group bg-primary-1-hover p-2 rounded-lg">
                                <Icon.UilShoppingBag className="w-[24px] h-[24px] text-primary"/>
                                <p className="transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] left-[50%] translate-x-[-50%] min-w-max bg-black text-white font-medium rounded-[8px] text-sm px-2.5 py-1">
                                    <span
                                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#333333]"/>
                                    Giỏ hàng
                                </p>
                                <p className="absolute right-[-5px] top-[-5px] rounded-full w-[20px] h-[20px] flex items-center justify-center text-white bg-[red]">
                                    <span
                                        className="text-tiny font-medium relative top-[1px]">{cart?.items?.length || 0}</span>
                                </p>
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
        {value: 'tat-ca', label: 'Tất cả'},
        {value: 'san-pham', label: 'Sản phẩm'},
        {value: 'cua-hang', label: 'Cửa hàng'}
    ]
    return (
        <div className="flex items-center justify-center h-full">
            <div className="group relative px-3 pt-1">
                <div className="w-[100px] flex items-center justify-between">
                    <p className="flex-1 line-clamp-1 font-medium text-md">
                        {options[active].label}
                    </p>
                    <input type="text" name="type" value={options[active].value} className="hidden" onChange={() => {

                    }}/>
                    <Icon.UilAngleDown className="w-[20px] h-[20px]"/>
                </div>
                <div
                    className="group-hover:visible group-hover:opacity-100 opacity-0 invisible transition-all absolute top-[100%] left-0 pt-[20px] min-w-max z-[100] ">
                    <div
                        className="relative bg-white flex flex-col shadow-md rounded-md w-[150px] z-[100] overflow-hidden">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => setActive(index)} type="button"
                                    className={`${index === active ? 'text-primary' : 'text-black-1'} px-3 py-1.5 hover:bg-primary-1-hover hover:text-primary z-[100] font-medium text-md p-1 cursor-pointer z-50 flex items-center justify-between gap-3`}>
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