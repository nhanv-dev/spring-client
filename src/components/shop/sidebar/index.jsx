import {NavLink} from "react-router-dom";
import * as Icon from '@iconscout/react-unicons';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/actions/userActions";

function Sidebar() {
    const dispatch = useDispatch();
    const {shop} = useSelector(state => state);

    async function handleLogout() {
        dispatch(await logout());
    }

    return (
        <div className="fixed z-[50] left-0 bottom-0 top-[76px] bg-white w-[66px] border-r-[1px] border-[#EBEDF5]">
            <div className="w-full h-full flex flex-col items-center py-3 justify-between">
                <div className="flex flex-col items-center gap-4">
                    <NavigationLink to="/kenh-ban-hang/trang-chu" title="Trang quản trị"
                                    icon={<Icon.UilEstate className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/san-pham" title="Sản phẩm"
                                    icon={<Icon.UilApps className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/don-dat-hang" title="Đơn đặt hàng"
                                    icon={<Icon.UilFileGraph className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/thong-ke" title="Thống kê"
                                    icon={<Icon.UilChartGrowth className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/danh-gia-shop" title="Đánh giá Shop"
                                    icon={<Icon.UilStarHalfAlt className={"w-[20px]"}/>}/>
                </div>
                <div className="flex flex-col items-center gap-4 justify-end">
                    <NavigationLink to={`/cua-hang/${shop?.slug}`} title="Cửa hàng"
                                    icon={<Icon.UilStore className={"w-[20px]"}/>}/>
                    <button type={"button"} onClick={handleLogout}
                            className={'bg-white text-black-2 w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-md flex items-center justify-center group relative'}>
                        <Icon.UilSignOutAlt className={"w-[20px]"}/>
                        <p className="min-w-max absolute left-full top-[50%] translate-x-[12px] translate-y-[-50%] bg-white z-[999] text-sm text-black-2 px-3 py-2 rounded-r-md font-semibold capitalize opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow">
                            Đăng xuất
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

const NavigationLink = ({to, title, icon}) => {
    return (
        <NavLink to={to}
                 className={(value) => `${value.isActive ? 'bg-primary-bg text-primary' : 'bg-white text-black-2'} w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-md flex items-center justify-center group relative`}>
            {icon}
            <p className="min-w-max absolute left-full top-[50%] translate-x-[12px] translate-y-[-50%] bg-white z-[999] text-sm text-black-2 px-3 py-2 rounded-r-md font-semibold capitalize opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow">
                {title}
            </p>
        </NavLink>
    )
}

export default Sidebar;