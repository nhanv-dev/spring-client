import {Link} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import * as Icon from "@iconscout/react-unicons";
import {useSelector} from "react-redux";
import AdminComponent from "./AdminComponent";

function Header() {
    const user = useSelector(state => state.user);

    return (
        <div className="fixed left-0 top-0 right-0 bg-white h-[75px] shadow-md z-50">
            <div className="w-full h-full px-5 py-1 flex items-center gap-10">
                <Link to="/kenh-ban-hang/trang-chu">
                    <img className="h-[24px]" alt="logo" src={Logo}/>
                </Link>
                <div className="flex justify-end items-center gap-10 flex-1 pr-3">
                    <div className="flex items-center justify-center gap-6">
                        <Link to="/kenh-ban-hang/don-ban-hang"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-md font-semibold">
                            <Icon.UilMessage className="w-[20px] h-[20px]"/>
                            Đơn bán hàng
                        </Link>
                        <Link to="/kenh-ban-hang/dang-ban"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-md font-semibold">
                            <Icon.UilMessage className="w-[20px] h-[20px]"/>
                            Thông báo
                        </Link>
                    </div>
                    <AdminComponent user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Header;