import React, {useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import {
    UilAt, UilEyeSlash, UilKeyholeCircle, UilPhoneAlt, UilUser
} from '@iconscout/react-unicons'
import {publicRequest} from "../../../util/request-method";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function handleSubmit() {
        if (!email || !password || !name || !phoneNumber) return;
        publicRequest().post("/auth/sign-up", {email, password, name, phoneNumber})
            .then(res => {
                if (res.status === 200) navigate("/dang-nhap")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Helmet title="Depot - Đăng ký">
            <div className="relative w-[100vw] h-[100vh] bg-cover bg-center"
                 style={{backgroundImage: `url(https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=2000)`}}>
                <div className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[black] opacity-50 z-10"/>
                <div
                    className="p-6 z-50 fixed md:w-[1000px] bg-white rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="w-full flex gap-6">
                        <div className="w-[55%] rounded-md bg-cover bg-center"
                             style={{backgroundImage: `url(https://website-assets-fd.freshworks.com/attachments/ckjuz8zld00c4ffg16djp4zuz-customer-service-training-material.one-half.png)`}}>
                        </div>
                        <div className="flex-1 py-5">
                            <div className="mb-8">
                                <Link to="/trang-chu">
                                    <img src={Logo} alt="logo" className="h-[40px] mx-auto"/>
                                </Link>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilUser className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="name" type="text" value={name}
                                               placeholder="Họ & tên"
                                               onChange={(e) => setName(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilPhoneAlt className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="number" value={phoneNumber}
                                               placeholder="Số điện thoại"
                                               onChange={(e) => setPhoneNumber(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilAt className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="email" type="text" value={email}
                                               placeholder="E-Mail"
                                               onChange={(e) => setEmail(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilKeyholeCircle className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="password" type="password" value={password}
                                               placeholder="Mật khẩu"
                                               onChange={(e) => setPassword(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                        <button tabIndex={-1}
                                                className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEyeSlash className="w-full h-full text-gray"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex items-center px-3 rounded-md border border-border h-[40px]">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilKeyholeCircle className="w-full h-full text-gray"/>
                                        </div>
                                        <input id="repeat-password" type="password" value={repeatPassword}
                                               placeholder="Nhập lại mật khẩu"
                                               onChange={(e) => setRepeatPassword(e.target.value)}
                                               className="flex-1 focus:outline-none text-md font-medium text-black-1"
                                        />
                                        <button tabIndex={-1}
                                                className="flex items-center justify-center w-[18px] h-[18px]">
                                            <UilEyeSlash className="w-full h-full text-gray"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mb-8">
                                <button onClick={handleSubmit}
                                        className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="mb-5">
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
            </div>
        </Helmet>
    );
}

export default SignUp;