import React, {useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import {UilAt, UilEyeSlash, UilInfoCircle, UilKeyholeCircle, UilPhoneAlt, UilUser} from '@iconscout/react-unicons'
import userService from "../../../service/UserService";
import {toast} from "react-hot-toast";
import ToastCustom from "../../../components/common/toast-custom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);


    function validateEmpty() {
        const error = {};
        if ((name && email && password && repeatPassword && phoneNumber && repeatPassword === password)) return null;
        if (!name) error.name = {title: 'Tên người dùng không được bỏ trống.'}
        if (!email) error.email = {title: 'Email không được bỏ trống.'}
        if (!password) error.password = {title: 'Mật khẩu không được bỏ trống.'}
        if (repeatPassword !== password) error.repeatPassword = {title: 'Mật khẩu nhập lại không trùng khớp.'}
        if (!repeatPassword) error.repeatPassword = {title: 'Mật khẩu nhập lại không trùng khớp.'}
        if (!phoneNumber) error.phoneNumber = {title: 'Số điện thoại không được bỏ trống.'}
        return error;
    }

    function validateServerResponse(data) {
        const error = {};
        if (data.message === 'Error: Email is already in use!') error.email = {title: 'Email đã tồn tại.'}
        if (data.email === "must be a well-formed email address") error.email = {title: 'Email không hợp lệ.'}
        if (data.password === "size must be between 8 and 2147483647") error.password = {title: 'Mật khẩu nên ít nhất 8 ký tự.'}
        if (data.phoneNumber === "must match \"^\\d{10}$\"") error.phoneNumber = {title: 'Số điện thoại không hợp lệ.'}
        if (data.phoneNumber === "size must be between 10 and 10") error.phoneNumber = {title: 'Số điện thoại không hợp lệ.'}
        return error;
    }

    function handleSubmit() {
        if (isWaiting) return;
        const emptyError = validateEmpty();
        if (emptyError) return setError(emptyError);
        userService.signUp({email, password, name, phoneNumber})
            .then(res => {
                if (res.status === 200) {
                    setIsWaiting(true)
                    toast.success('Đăng ký tài khoản thành công');
                    setTimeout(() => {
                        toast.dismiss();
                        navigate("/dang-nhap")
                    }, 1000)
                }
            })
            .catch(err => {
                const error = validateServerResponse(err.response.data);
                setError(error)
                toast.error('Đăng ký thất bại.')
            })
    }

    return (
        <Helmet title="Depot - Đăng ký">
            <ToastCustom/>
            <div className="w-full h-[100vh] flex">
                <div className={"w-[500px] bg-app-1 px-10 border-r-2 border-border-1"}>
                    <div className="h-full flex items-center justify-start">
                        <div className={"w-full"}>
                            <div className="mb-8">
                                <Link to="/trang-chu" className="max-w-max block">
                                    <img src={Logo} alt="logo" className="h-[30px]"/>
                                </Link>
                                <p className="font-medium text-tiny text-black mt-3">
                                    Depot mang đến cho bạn một trải nghiệm mua sắm online bắt đầu bằng chữ tín.
                                </p>
                            </div>
                            <div className="mb-6">
                                <div
                                    className={`${error?.name ? 'border-danger' : 'border-border'} flex items-center px-3 rounded-md border h-[40px] bg-white`}>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilUser className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="name" type="text" value={name}
                                               placeholder="Họ & tên"
                                               onChange={(e) => {
                                                   setError(prev => ({...prev, name: null}))
                                                   setName(e.target.value)
                                               }}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                                <div className={"absolute mt-0.5"}>
                                    {error?.name &&
                                        <ErrorLabel title={error.name.title}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-6">
                                <div
                                    className={`${error?.phoneNumber ? 'border-danger' : 'border-border'} flex items-center px-3 rounded-md border h-[40px] bg-white`}>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilPhoneAlt className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="number" value={phoneNumber}
                                               placeholder="Số điện thoại"
                                               onChange={(e) => {
                                                   setError(prev => ({...prev, phoneNumber: null}))
                                                   setPhoneNumber(e.target.value)
                                               }}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                                <div className={"absolute mt-0.5"}>
                                    {error?.phoneNumber &&
                                        <ErrorLabel title={error.phoneNumber.title}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-6">
                                <div
                                    className={`${error?.email ? 'border-danger' : 'border-border'} flex items-center px-3 rounded-md border h-[40px] bg-white`}>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilAt className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="text" value={email}
                                               placeholder="E-mail"
                                               onChange={(e) => {
                                                   setError(prev => ({...prev, email: null}))
                                                   setEmail(e.target.value)
                                               }}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                                <div className={"absolute mt-0.5"}>
                                    {error?.email &&
                                        <ErrorLabel title={error.email.title}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-6">
                                <div
                                    className={`${error?.password ? 'border-danger' : 'border-border'} flex items-center px-3 rounded-md border h-[40px] bg-white`}>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilKeyholeCircle className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="password" type="password" value={password}
                                               placeholder="Mật khẩu"
                                               onChange={(e) => {
                                                   setError(prev => ({...prev, password: null}))
                                                   setPassword(e.target.value)
                                               }}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                        <button tabIndex={-1}
                                                className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEyeSlash className="w-full h-full text-gray"/>
                                        </button>
                                    </div>
                                </div>
                                <div className={"absolute mt-0.5"}>
                                    {error?.password &&
                                        <ErrorLabel title={error.password.title}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-10">
                                <div
                                    className={`${error?.repeatPassword ? 'border-danger' : 'border-border'} flex items-center px-3 rounded-md border h-[40px] bg-white`}>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilKeyholeCircle className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="repeat-password" type="password" value={repeatPassword}
                                               placeholder="Nhập lại mật khẩu"
                                               onChange={(e) => {
                                                   setError(prev => ({...prev, repeatPassword: null}))
                                                   setRepeatPassword(e.target.value)
                                               }}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                        <button tabIndex={-1}
                                                className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEyeSlash className="w-full h-full text-gray"/>
                                        </button>
                                    </div>
                                </div>
                                <div className={"absolute mt-0.5"}>
                                    {error?.repeatPassword &&
                                        <ErrorLabel title={error.repeatPassword.title}/>
                                    }
                                </div>
                            </div>
                            <div className="mb-5">
                                <button onClick={handleSubmit}
                                        className="w-full bg-primary h-[40px] rounded-md text-md font-semibold text-white">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="">
                                <div className="flex justify-center items-center gap-1">
                                    <span className="font-medium text-tiny text-gray">Bạn đã có tài khoản? </span>
                                    <Link to="/dang-nhap"
                                          className="font-medium text-tiny text-primary">
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 rounded-md bg-cover bg-center"
                     style={{backgroundImage: `url(https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=2000)`}}>
                </div>
            </div>
        </Helmet>
    );
}

const ErrorLabel = ({title}) => {
    return (
        <div className="min-w-max flex items-center gap-2 px-3">
            <UilInfoCircle className={"w-[18px] h-[18px] text-danger relative top-[-0.5px]"}/>
            <p className="font-semibold text-sm text-danger">
                {title}
            </p>
        </div>
    )
}

export default SignUp;