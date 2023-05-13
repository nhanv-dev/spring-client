import {Link} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import * as Icon from "@iconscout/react-unicons";
import {useSelector} from "react-redux";
import ShopComponent from "./ShopComponent";

function Header() {
    const user = useSelector(state => state.user);

    return (
        <div className="fixed left-0 top-0 right-0 bg-white h-[75px] max-h-[75px] shadow-md z-50">
            <div className="w-full h-full px-5 py-1 flex items-center gap-10">
                <div className={"flex items-end gap-3"}>
                    <Link to="/kenh-ban-hang/trang-chu" className={"h-[26px] block"}>
                        <img className="h-full" alt="logo" src={Logo}/>
                    </Link>
                    <p className={"select-none relative top-[1px] rounded flex items-center justify-center font-extrabold text-md text-primary px-3 h-[28px] bg-primary-bg "}>
                        Kênh bán hàng
                    </p>
                </div>
                <div className="flex justify-end items-center gap-10 flex-1 pr-3">
                    <div className="flex items-center justify-center gap-6">
                        <Link to="/kenh-ban-hang/san-pham/dang-ban"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-tiny font-semibold">
                            <Icon.UilArchive className="w-[20px] h-[20px]"/>
                            Đơn đặt hàng
                        </Link>
                        <Link to="/kenh-ban-hang/san-pham/dang-ban"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-tiny font-semibold">
                            <Icon.UilEnvelopeCheck className="w-[20px] h-[20px]"/>
                            Đánh giá & Nhận xét
                        </Link>
                        <Link to="/kenh-ban-hang/san-pham/dang-ban"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-tiny font-semibold">
                            <Icon.UilMessage className="w-[20px] h-[20px]"/>
                            Tin nhắn
                        </Link>
                        <Link to="/kenh-ban-hang/san-pham/dang-ban"
                              className="flex items-center justify-center gap-1.5 text-black-1 transition-all hover:text-primary-hover text-tiny font-semibold">
                            <Icon.UilCreateDashboard className="w-[20px] h-[20px]"/>
                            Đăng bán
                        </Link>
                    </div>
                    <ShopComponent user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Header;