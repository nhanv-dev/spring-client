import React, {useEffect, useState} from 'react';
import {UilKeyholeCircle, UilMessage, UilTimes, UilUser} from "@iconscout/react-unicons";
import {Link} from "react-router-dom";
import {login} from "../../../redux/actions/userActions";
import * as types from "../../../redux/constants/ActionType";
import {isRole, ROLE_SHOP, ROLE_USER} from "../../../service/AuthService";
import {initializeCart} from "../../../redux/actions/cartActions";
import {initShop} from "../../../redux/actions/shopActions";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";

function LoginPopup({show, setShow}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [beginLogin, setBeginLogin] = useState(false);

    useEffect(() => {
        if (show)
            document.body.style.overflow = "hidden";
        else
            document.body.style.overflow = "auto";
    }, [show])

    useEffect(() => {
        if (beginLogin && user?.token) {
            toast.success("Đăng nhập thành công");
            setShow(false);
            setBeginLogin(false);
        }
    }, [setShow, user])

    async function handleSubmit(e) {
        e.preventDefault();
        setBeginLogin(true)
        const action = await login({email: e.target.email.value, password: e.target.password.value});
        if (action?.error === 'Email invalid') {
            toast.error('Địa chỉ email không đúng')
            return;
        }
        if (action?.error === 'Password invalid') {
            toast.error("Mật khẩu không chính xác")
            return;
        }
        dispatch(action);
        if (action.type === types.user.USER_LOGIN_SUCCESS) {
            if (isRole(action.payload, ROLE_USER)) {
                const cart = await initializeCart();
                dispatch(cart);
            }
            if (isRole(action.payload, ROLE_SHOP)) {
                const shop = await initShop({userId: action.payload.id});
                dispatch(shop);
            }
        }
    }

    return (
        <div
            className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300 relative z-[100]`}>
            <div
                className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] w-[430px] rounded-md bg-app-1`}>
                <div className="p-5 pb-3 flex items-center justify-between border-b border-b-border-1 rounded">
                    <h5 className="font-semibold text-xl text-black-1">Đăng nhập ngay</h5>
                    <button className="bg-danger-bg text-danger rounded-full p-1" onClick={() => setShow(false)}>
                        <UilTimes
                            className={"w-[20px] h-[20px] transition-all duration-300"}/>
                    </button>
                </div>
                <form className="p-5" onSubmit={handleSubmit}>
                    <div
                        className="mb-5 flex shadow items-center gap-3 w-full border border-white rounded-md p-2 px-3 text-md font-medium bg-white">
                        <UilUser className={"w-[20px] h-[20px] text-black-2"}/>
                        <input type={"email"} id={"email"} name={"email"} placeholder={"Email"}
                               className="h-[20px] flex-1 border-none outline-none text-md font-medium bg-white text-black-2"/>
                    </div>
                    <div
                        className="mb-6 flex shadow items-center gap-3 w-full border border-white rounded-md p-2 px-3 text-md font-medium bg-white">
                        <UilKeyholeCircle className={"w-[20px] h-[20px] text-black-2"}/>
                        <input type={"password"} id={"password"} name={"password"} placeholder={"Mật khẩu"}
                               className="h-[20px] flex-1 border-none outline-none text-md font-medium bg-white text-black-2"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type={"submit"}
                                className={"max-w-max relative w-full py-1.5 pl-3.5 pr-3 gap-3 rounded-full bg-primary text-white font-bold text-tiny flex items-center justify-between"}>
                            <p className={""}>Đăng nhập ngay</p>
                            <UilMessage className={"w-[20px] h-[20px]"}/>
                        </button>
                        <Link to={""}
                              className={"flex items-center justify-center text-md text-info font-semibold"}>
                            Quên mật khẩu ?
                        </Link>
                    </div>
                </form>
                <div className={"flex items-center justify-center gap-1 p-5 pt-0 font-semibold text-tiny text-black-2"}>
                    Chưa có tài khoản? <Link to={"/dang-ky"} className={"text-primary"}>Đăng ký ngay</Link>
                </div>
            </div>
            <div className={`fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,.6)] z-[999]`}
                 onClick={() => setShow(false)}>
            </div>
        </div>
    );
}

export default LoginPopup;