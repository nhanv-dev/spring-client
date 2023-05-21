import React from 'react';
import Header from "../../shop/header";
import Sidebar from "../../shop/sidebar";
import {Link} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <div className="w-full max-w-full relative">
            <Header></Header>
            <Sidebar></Sidebar>
            <div className="ml-[66px] mt-[76px] p-10 bg-app-1 min-h-[100vh]">
                {children}
            </div>
        </div>
    )
}
export const Footer = () => {
    return (
        <div className="ml-[66px] px-7 pt-10 bg-app-1">
            <div className={"bg-white p-6 pb-10 rounded-t-md"}>
                <div className="flex flex-wrap gap-10 border-b border-border-1 pb-5 mb-5">
                    <div className={"min-w-max"}>
                        <h5 className={"mb-4 font-semibold text-black text-lg"}>
                            Hỗ trợ khách hàng
                        </h5>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Các câu hỏi thường gặp
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Gửi yêu cầu hỗ trợ
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Hướng dẫn đặt hàng
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Chính sách hàng nhập khẩu
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Hỗ trợ khách hàng: hotro@depot.vn
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Báo lỗi bảo mật: security@depot.vn
                        </Link>
                    </div>
                    <div className={"min-w-max"}>
                        <h5 className={"mb-4 font-semibold text-black text-lg"}>
                            Giới thiệu Depot
                        </h5>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Depot Blog
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Chính sách bảo mật thanh toán
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Chính sách bảo mật thông tin cá nhân
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Chính sách hàng giải quyết khiếu nại
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Điều khoản sử dụng
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Giới thiệu Tiki Xu
                        </Link>
                    </div>
                    <div className={"min-w-max"}>
                        <h5 className={"mb-4 font-semibold text-black text-lg"}>
                            Hợp tác liên kết
                        </h5>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Quy chế hoạt động Sàn GDTMDT
                        </Link>
                        <Link to={""}
                              className={"hover:underline transition-all text-[#808089] block mb-2 text-sm"}>
                            Bán hàng cùng Depot
                        </Link>
                    </div>
                </div>
                <div>
                    <h5 className="font-semibold text-black text-lg">
                        Depot - Thật nhanh, thật chất lượng, thật rẻ
                    </h5>
                    <h6 className={"font-semibold text-[#808089] text-md mb-1.5 mt-3"}>
                        Depot có tất cả
                    </h6>
                    <p className={"text-sm text-[#808089]"}>
                        Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại mặt hàng từ Điện
                        thoại
                        smartphone tới Rau củ quả tươi, kèm theo dịch vụ giao hàng siêu tốc DepotNOW, Depot mang đến cho
                        bạn
                        một trải nghiệm mua sắm online bắt đầu bằng chữ tín. Thêm vào đó, ở Depot bạn có thể dễ dàng sử
                        dụng
                        vô vàn các tiện ích khác như mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.
                    </p>
                    <h6 className={"font-semibold text-[#808089] text-md mb-1.5 mt-3"}>
                        Khuyến mãi, ưu đãi tràn ngập
                    </h6>
                    <p className={"text-sm text-[#808089]"}>
                        Bạn muốn săn giá sốc, Depot có giá sốc mỗi ngày cho bạn! Bạn là tín đồ của các thương hiệu, các
                        cửa
                        hàng Official chính hãng đang chờ đón bạn. Không cần săn mã freeship, vì Depot đã có hàng triệu
                        sản
                        phẩm trong chương trình Freeship+, không giới hạn lượt đặt, tiết kiệm thời gian vàng bạc của
                        bạn.
                        Mua thêm gói DepotNOW tiết kiệm để nhận 100% free ship 2h & trong ngày, hoặc mua gói DepotNOW
                        cao
                        cấp
                        để nhận được 100% freeship, áp dụng cho 100% sản phẩm, 100% tỉnh thành Việt Nam. Bạn muốn tiết
                        kiệm
                        hơn nữa? Đã có DepotCARD, thẻ tín dụng Depot hoàn tiền 15% trên mọi giao dịch (tối đa hoàn
                        600k/tháng)
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Layout;