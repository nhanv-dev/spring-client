import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import DefaultAvatar from "../../../assets/images/default-avatar.png";
import {logout} from "../../../redux/actions/userActions";

function UserComponent() {
    const {user, shop} = useSelector(state => state);
    return (
        <>
            {user.token ? <Menu user={user} shop={shop}/> : <Button/>}
        </>
    )
}

const Button = () => {
    return (
        <Link to="/dang-nhap"
              className="relative outline-none group p-2 rounded-lg bg-white hover:bg-primary-bg transition-all">
            <Icon.UilUser className="w-[24px] h-[24px] text-primary"/>
            <p className="transition-all group-hover:opacity-100 group-hover:top-full mt-[10px] opacity-0 z-[20] absolute top-[70%] left-[50%] translate-x-[-50%] min-w-max bg-black text-white font-semibold rounded-[8px] text-sm px-2.5 py-1">
                    <span
                        className="absolute bottom-[99%] left-[50%] translate-x-[-50%] border-[7px] border-[transparent] border-b-[#333333]"/>
                Đăng nhập
            </p>
        </Link>
    )
}
const Menu = ({user, shop}) => {
    const dispatch = useDispatch();
    const handleSignOut = async (e) => {
        e.preventDefault();
        dispatch(await logout());
    }

    return (
        <div className="relative group">
            <Link to="/nguoi-dung/thong-tin"
                  className="block relative outline-none p-2 rounded-lg bg-white hover:bg-primary-bg transition-all">
                <Icon.UilUser className="w-[24px] h-[24px] text-primary"/>
            </Link>
            <div
                className="transition-all group-hover:opacity-100 group-hover:visible group-hover:top-full mt-[10px] opacity-0 invisible z-[20] absolute top-[70%] right-[-20px]  shadow min-w-max bg-white text-black font-medium rounded-[8px] text-sm">
                <span
                    className="absolute bottom-[99%] right-[19px] translate-x-[-50%] border-[7px] border-[transparent] border-b-[white]"/>
                <div className="min-w-[250px] max-w-[250px]">
                    <div
                        className="flex items-center justify-start gap-3 border-b-[1px] border-[#eee] py-3 px-4">
                        <Link to="/nguoi-dung/thong-tin"
                              className="bg-cover bg-center min-w-[35px] min-h-[35px] rounded-full border-2 border-primary"
                              style={{backgroundImage: `url(${DefaultAvatar})`}}/>
                        <div className="flex flex-col overflow-hidden w-full">
                            <Link to="/nguoi-dung/thong-tin"
                                  className="w-[150px] text-base text-primary-hover line-clamp-1 transition-all">
                                {user?.name}
                            </Link>
                            <Link to="/nguoi-dung/thong-tin"
                                  className="font-medium text-sm hover:text-primary flex items-center justify-start gap-2 transition-all">
                                <Icon.UilEditAlt className="w-[16px] h-[16px]"/> Chỉnh sửa thông tin
                            </Link>
                        </div>
                    </div>
                    <div className="py-3 px-4 border-b-[1px] border-[#eee] flex flex-col gap-4">
                        {user.isShop && shop.slug &&
                            <Link to={`/cua-hang/${shop.slug}`}
                                  className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary">
                                <Icon.UilStore className="w-[20px] h-[20px]"/> Shop của tôi
                            </Link>
                        }
                        <Link to="/nguoi-dung/thong-tin"
                              className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary">
                            <Icon.UilUserSquare className="w-[20px] h-[20px]"/> Tài khoản của tôi
                        </Link>
                        <Link to="/nguoi-dung/don-dat-hang"
                              className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary">
                            <Icon.UilCreditCardSearch className="w-[20px] h-[20px]"/> Đơn đặt hàng
                        </Link>
                        <Link to="/nguoi-dung/yeu-thich"
                              className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary">
                            <Icon.UilHeart className="w-[20px] h-[20px]"/> Yêu thích
                        </Link>
                        <Link to="/nguoi-dung/doi-mat-khau"
                              className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-primary">
                            <Icon.UilLock className="w-[20px] h-[20px]"/> Đổi mật khẩu
                        </Link>
                    </div>
                    <div className="py-3 px-4">
                        <button onClick={handleSignOut}
                                className="flex items-center justify-start gap-3 text-tiny transition-all hover:text-red">
                            <Icon.UilSignout className="w-[20px] h-[20px]"/> Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserComponent;