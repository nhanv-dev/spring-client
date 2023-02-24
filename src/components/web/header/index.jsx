import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import Category from "./Category";
import {publicRequest} from "../../../util/request-method";
import UserComponent from "./UserComponent";
import {useSelector} from "react-redux";
import * as Icon from '@iconscout/react-unicons';
import Logo from "../../../assets/images/logo.svg";

function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        setCategories([
            {
                name: 'Máy Lạnh',
                slug: 'may-lanh',
                image: 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn'
            },
            {
                name: 'Máy Lạnh',
                slug: 'may-lanh',
                image: 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn'
            },
            {name: 'Máy Lạnh', slug: 'may-lanh', image: 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn'}
        ])
        // publicRequest().get('/categories?limit=8').then((res) => {
        // });
    }, [])


    const handleSearch = (e) => {
        e.preventDefault();
        const {searching, type} = e.target;
        if (searching.value && type.value)
            navigate(`/tim-kiem?s=${searching.value}&t=${type.value}`)
    }

    return (
        <header>
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
                    <div className="flex gap-6 justify-between items-center">
                        <div className="w-[200px]">
                            <Link to="/trang-chu" className="block w-[120px]">
                                <img className="w-full h-auto" src={Logo} alt="logo"/>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <div>
                                    <div
                                        className="group hover:bg-primary-hover bg-[red] p-2 rounded-[6px] flex items-center justify-between gap-4">
                                        <Link to="/danh-muc"
                                              className="text-white flex items-center justify-between w-full">
                                            <Icon.UilApps className="w-[20px] relative top-[1px]"/>
                                        </Link>
                                        <Category categories={categories}/>
                                    </div>
                                </div>
                                <div
                                    className="border-border border flex-1 max-w-max mx-auto rounded-[5px] h-[40px] flex bg-white items-center justify-center">
                                    <form onSubmit={handleSearch} className="flex item-center relative h-full">
                                        <div className="cursor-pointer w-[] ">
                                            <OptionSearch/>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="absolute w-[1px] h-[80%] top-[50%] translate-y-[-50%] bg-[#00000017]"/>
                                        </div>
                                        <input type="text" name="searching"
                                               className="px-3 w-[400px] text-[#666] bg-white text-tiny font-normal bg-white flex-1 focus-visible:outline-none"
                                               placeholder="Bạn tìm gì hôm nay"/>
                                        <div className="w-[40px] h-full flex items-center justify-end">
                                            <button type="submit"
                                                    className="bg-primary w-full h-full rounded-[5px] flex items-center justify-center">
                                                <Icon.UilSearch className="w-[22px] h-[22px] text-white"/>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-[200px] flex items-center justify-end gap-10">
                            <UserComponent/>
                            <Link to="/gio-hang" className="relative outline-none group">
                                <Icon.UilShoppingBag className="w-[26px] h-[26px] text-primary"/>
                                <p className="transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] left-[50%] translate-x-[-50%] min-w-max bg-black text-white font-medium rounded-[8px] text-sm px-2.5 py-1">
                                    <span
                                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#333333]"/>
                                    Giỏ hàng
                                </p>
                                <p className="absolute right-[-10px] top-[-10px] rounded-full bg-white w-[20px] h-[20px] flex items-center justify-center text-white bg-[red]">
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
        {value: 'cua-hang', label: 'Cửa hàng'},
        {value: 'danh-muc', label: 'Danh mục'}
    ]
    return (
        <div className="flex items-center justify-center h-full">
            <div className="group relative px-3">
                <div className="w-[90px] flex items-center justify-between">
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
                        className="relative bg-white flex flex-col shadow-md rounded-[5px] w-[150px] z-[100] overflow-hidden">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => setActive(index)} type="button"
                                    className="px-3 py-1.5 hover:bg-secondary-hover z-[100] font-medium text-md text-black-1 p-1 cursor-pointer z-50 flex items-center justify-between gap-3">
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