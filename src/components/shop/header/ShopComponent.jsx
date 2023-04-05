import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import {logout} from "../../../redux/actions/userActions";
import DefaultShop from "../../../assets/images/default-shop.png";

function ShopComponent(props) {
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);

    const handleSignOut = async (e) => {
        dispatch(await logout());
    }

    return (
        <>
            {shop?.id &&
                <div className="relative group ">
                    <Link to="/kenh-ban-hang/thong-tin" className="relative outline-none gap-1 flex items-center">
                        <div style={{backgroundImage: `url(${shop?.shopLogo || DefaultShop})`}}
                             className="bg-cover bg-center w-[42px] h-[42px] text-black border-primary border-[2px] rounded-full"/>
                    </Link>
                    <div
                        className="shadow-xl transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] right-[0px]  shadow min-w-max bg-white text-black font-medium rounded-[8px] text-sm">
                        <span
                            className="absolute bottom-[99%] right-[19px] translate-x-[-50%] border-[7px] border-[transparent] border-b-[white]"/>
                        <div className="min-w-[250px] max-w-[250px]">
                            <div
                                className="flex items-center justify-start gap-3 border-b-[1px] border-[#eee] py-3 px-4">
                                <Link to="/kenh-ban-hang/thong-tin"
                                      style={{backgroundImage: `url(${shop?.shopLogo || DefaultShop})`}}
                                      className="bg-cover min-w-[42px] min-h-[42px] rounded-full border-2 border-primary"/>
                                <div className="flex flex-col overflow-hidden w-full">
                                    <Link to="/kenh-ban-hang/thong-tin"
                                          className="w-[120px] text-base text-primary-hover line-clamp-1 transition-all">
                                        {shop?.shopName}
                                    </Link>
                                    <Link to="/kenh-ban-hang/thong-tin"
                                          className="font-medium text-sm hover:text-primary flex items-center justify-start gap-2 transition-all">
                                        <Icon.UilEditAlt className="w-[16px] h-[16px]"/> Chỉnh sửa tài khoản
                                    </Link>
                                </div>
                            </div>
                            <div className="py-3 px-4 border-b-[1px] border-[#eee] flex flex-col gap-4">
                                <Link to={`/cua-hang/${shop.slug}`}
                                      className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary-hover">
                                    <Icon.UilStore className="w-[20px] h-[20px]"/> Shop của tôi
                                </Link>
                                <Link to="/kenh-ban-hang/thong-tin"
                                      className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary-hover">
                                    <Icon.UilEditAlt className="w-[20px] h-[20px]"/> Cập nhật cửa hàng
                                </Link>
                                <Link to="/kenh-ban-hang/doi-mat-khau"
                                      className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary-hover">
                                    <Icon.UilLock className="w-[20px] h-[20px]"/> Đổi mật khẩu
                                </Link>
                            </div>
                            <div className="py-3 px-4">
                                <button onClick={handleSignOut}
                                        className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary-hover">
                                    <Icon.UilSignout className="w-[20px] h-[20px]"/> Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ShopComponent;