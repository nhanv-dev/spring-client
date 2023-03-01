import React, {useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {Link} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import {UilAt, UilEye, UilEyeSlash, UilKeyholeSquare} from '@iconscout/react-unicons'

function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Helmet title="Depot - Đăng nhập">
            <div className="relative w-[100vw] h-[100vh] bg-cover bg-center"
                 style={{backgroundImage: `url(https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=2000)`}}>
                <div className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[black] opacity-50 z-10"/>
                <div
                    className="p-6 z-50 fixed md:w-[1000px] bg-white rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="w-full flex gap-6">
                        <div className="w-[55%] rounded-md bg-cover bg-center"
                             style={{backgroundImage: `url(https://www.commbox.io/wp-content/uploads/2019/10/53-1-1024x600.jpg)`}}>
                        </div>
                        <div className="flex-1 py-5">
                            <div className="mb-8">
                                <Link to="/trang-chu">
                                    <img src={Logo} alt="logo" className="h-[40px] mx-auto"/>
                                </Link>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block font-medium text-tiny text-black-1 mb-2">
                                    E-Mail
                                </label>
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilAt className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="text" value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block font-medium text-tiny text-black-1 mb-2">
                                    Mật khẩu
                                </label>
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilKeyholeSquare className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="password" type="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                        <button className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEyeSlash className="w-full h-full text-gray"/>
                                        </button>
                                    </div>
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
                                <button
                                    className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="mb-10">
                                <div className="flex items-center justify-center gap-5 mb-8">
                                    <span className="flex-1 opacity-30 bg-gray h-[1px]"></span>
                                    <span className="font-medium text-gray text-md">
                                        đăng nhập với
                                    </span>
                                    <span className="flex-1 opacity-30 bg-gray h-[1px]"></span>
                                </div>
                                <div className="flex items-center justify-center gap-5">
                                    <button
                                        className="rounded-md shadow-md bg-primary-hover w-[42px] h-[42px] flex items-center justify-center">
                                        <img className="w-[20px]"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                                             alt="google"/>
                                    </button>
                                    <button
                                        className="rounded-md shadow-md bg-primary-hover w-[42px] h-[42px] flex items-center justify-center">
                                        <img className="w-[20px]"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
                                             alt="apple"/>
                                    </button>
                                    <button
                                        className="rounded-md shadow-md bg-primary-hover w-[42px] h-[42px] flex items-center justify-center">
                                        <img className="w-[20px]"
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                                             alt="facebook"/>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex justify-center items-center gap-1">
                                    <span className="font-medium text-tiny text-gray">Bạn chưa có tài khoản? </span>
                                    <Link to="/dang-ky"
                                          className="font-medium text-tiny text-primary">
                                        Đăng ký
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Index;