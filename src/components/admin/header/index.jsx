import {Link} from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "../../../assets/images/logo.png";

function Header() {
    return (
        <div className="fixed left-0 top-0 right-0 bg-white h-[76px] shadow-md z-50">
            <div className="w-full h-full px-4 py-1 flex items-center gap-10">
                <Link to="/trang-chu">
                    <img className="h-[26px]" alt="logo" src={Logo}/>
                </Link>
                <div className="flex justify-between flex-wrap flex-1">
                    <div className="flex items-center justify-start gap-8">

                    </div>
                    <div className="flex items-center justify-start gap-8">
                        <Avatar/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;