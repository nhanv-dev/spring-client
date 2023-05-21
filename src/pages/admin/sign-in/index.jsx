import React, {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import Logo from "../../../assets/images/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {UilAt, UilExclamationTriangle, UilEyeSlash, UilKeyholeCircle} from '@iconscout/react-unicons'
import {login} from "../../../redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {isRole, ROLE_ADMIN} from "../../../service/AuthService";
import {toast} from "react-hot-toast";
import ToastCustom from "../../../components/common/toast-custom";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isRole(user, ROLE_ADMIN)) return navigate('/quan-tri')
    }, [navigate, user])

    function isValidate() {
        if (!email) {
            setError(prev => ({...prev, email: "Vui lòng nhập địa chỉ email"}))
            return false;
        }
        if (!password) {
            setError(prev => ({...prev, password: "Vui lòng nhập password"}))
            return false;
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isValidate()) return;
        const action = await login({email, password});
        if (action?.error === 'Email invalid') {
            setError(prev => ({...prev, email: 'Địa chỉ email không đúng'}))
            return;
        }
        if (action?.error === 'Password invalid') {
            setError(prev => ({...prev, password: 'Mật khẩu không đúng'}))
            return;
        }
        if (!isRole(action.payload, ROLE_ADMIN)) {
            toast.error("Bạn không có quyền truy cập trang này.")
            setTimeout(() => {
                navigate("/trang-chu")
                toast.dismiss()
            }, 2000)
            return;
        }
        dispatch(action);
    }

    return (
        <Helmet title="Depot - Quản trị - Đăng nhập">
            <ToastCustom/>
            <div className="relative w-[100vw] h-[100vh] bg-cover bg-center"
                 style={{backgroundImage: `url(https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=2000)`}}>
                <div className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[black] opacity-50 z-10"/>
                <div
                    className="p-6 z-50 fixed md:w-[500px] bg-white rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="w-full flex gap-6">
                        <div className="flex-1 py-5">
                            <div className="mb-8">
                                <Link to="/trang-chu">
                                    <img src={Logo} alt="logo" className="h-[30px] mx-auto"/>
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="email" className="block font-semibold text-tiny text-black-1 mb-2">
                                        E-Mail
                                    </label>
                                    <div
                                        className={`${error?.email ? 'border-danger' : 'border-border-1'} flex items-center px-3 rounded-md border h-[40px]`}>
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                <UilAt className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="email" type="email" value={email}
                                                   onChange={(e) => {
                                                       setError(prev => ({...prev, email: null, password: null}))
                                                       setEmail(e.target.value)
                                                   }}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="h-[22px] text-danger font-semibold text-tiny mt-2">
                                        {error?.email &&
                                            <p className="flex items-center gap-3">
                                                <UilExclamationTriangle className={"w-[18px] h-[18px]"}/>
                                                {error?.email}
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password"
                                           className="block font-semibold text-tiny text-black-1 mb-2">
                                        Mật khẩu
                                    </label>
                                    <div
                                        className={`${error?.password ? 'border-danger' : 'border-border-1'} flex items-center px-3 rounded-md border h-[40px]`}>
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                <UilKeyholeCircle className="w-full h-full text-gray"/>
                                            </div>
                                            <input id="password" type="password" value={password}
                                                   onChange={(e) => {
                                                       setError(prev => ({...prev, password: null}))
                                                       setPassword(e.target.value)
                                                   }}
                                                   className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                            />
                                            <button className="flex items-center justify-center w-[18px] h-[18px]">
                                                <UilEyeSlash className="w-full h-full text-gray"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-[22px] text-danger font-semibold text-tiny mt-2">
                                        {error?.password &&
                                            <p className="flex items-center gap-3">
                                                <UilExclamationTriangle className={"w-[18px] h-[18px]"}/>
                                                {error?.password}
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <div className="flex justify-end items-center">
                                        <Link to="/quen-mat-khau"
                                              className="font-medium text-tiny text-black hover:text-primary">
                                            Quên mật khẩu ?
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full mb-8">
                                    <button type={"submit"}
                                            className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default SignIn;