import React from 'react';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="pt-8 pb-[200px] bg-[#232F3E]">
            <div className="container">
                <div className="flex">
                    <div className="w-1/4">
                        <h5 className="mb-3 font-bold text-white text-base uppercase">Về chúng tôi</h5>
                        <div className="flex flex-col gap-2.5 text-tiny font-medium text-white">
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Giới thiệu GMall.vn
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Giới thiệu SeMall
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Quy chế hoạt động
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <h5 className="mb-3 font-bold text-white text-base uppercase">Dành cho người mua</h5>
                        <div className="flex flex-col gap-2.5 text-tiny font-medium text-white">
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Giải quyết khiếu nại
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Hướng dẫn mua hàng
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Chính sách đổi trả
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Chăm sóc khách hàng
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <h5 className="mb-3 font-bold text-white text-base uppercase">Dành cho người bán</h5>
                        <div className="flex flex-col gap-2.5 text-tiny font-medium text-white">
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Mở shop trên Gmall
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Quy định đối với người bán
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Chính sách bán hàng
                            </Link>
                            <Link to="/gioi-thieu" className="hover:text-[hsla(0,0%,100%,.8)] transition-all">
                                Hệ thống tiêu chí kiểm duyệt
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;