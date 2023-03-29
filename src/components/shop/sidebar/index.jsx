import {NavLink} from "react-router-dom";
import * as Icon from '@iconscout/react-unicons';

function Sidebar() {
    return (
        <div className="fixed z-[50] left-0 bottom-0 top-[76px] bg-white w-[66px] border-r-[1px] border-[#EBEDF5]">
            <div className="w-full h-full flex flex-col items-center py-5 justify-between">
                <div className="flex flex-col items-center gap-7">
                    <NavigationLink to="/kenh-ban-hang/trang-chu" title="Trang quản trị"
                                    icon={<Icon.UilEstate className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/san-pham" title="Sản phẩm"
                                    icon={<Icon.UilApps className={"w-[20px]"}/>}/>
                    {/*<NavigationLink to="/kenh-ban-hang/danh-muc" title="Danh mục"*/}
                    {/*                icon={<Icon.UilApps className={"w-[20px]"}/>}/>*/}
                    <NavigationLink to="/kenh-ban-hang/file" title="Báo cáo"
                                    icon={<Icon.UilFileGraph className={"w-[20px]"}/>}/>
                    <NavigationLink to="/kenh-ban-hang/thong-ke" title="Thống kê"
                                    icon={<Icon.UilChartGrowth className={"w-[20px]"}/>}/>
                </div>
                <div className="flex flex-col items-center py-5 gap-7 justify-end">
                    <NavigationLink to="/ho-tro" title="Hỗ trợ"
                                    icon={<Icon.UilInfoCircle className={"w-[20px]"}/>}/>
                    <NavigationLink to="/trang-chu" title="Trang chủ"
                                    icon={<Icon.UilEstate className={"w-[20px]"}/>}/>
                </div>
            </div>
        </div>
    );
}

const NavigationLink = ({to, title, icon}) => {
    return (
        <NavLink to={to} className={(value) => `group relative`}>
            {icon}
            <p className="min-w-max absolute left-full top-[50%] translate-x-[12px] translate-y-[-50%] bg-white z-[999] text-sm px-3 py-2 rounded-md font-semibold capitalize opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow">
                {title}
            </p>
        </NavLink>
    )
}

export default Sidebar;