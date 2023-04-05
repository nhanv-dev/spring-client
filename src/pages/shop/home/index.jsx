import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import {useSelector} from "react-redux";
import DefaultShop from "../../../assets/images/default-shop.png";
import DefaultShopBg from "../../../assets/images/default-shop-bg.png";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import StarRating from "../../../components/common/star-rating";
import {formatBetweenDate} from "../../../util/format";

function Home() {
    const {shop} = useSelector(state => state);
    const [shopDetail, setShopDetail] = useState({});

    useEffect(() => {
        if (!shop?.id) return;
        protectedRequest().get(`/shops/${shop.id}`)
            .then(res => {
                console.log(res)
                setShopDetail(res.data)
            })
            .catch(err => {
                setShopDetail({})
            })
    }, [shop])

    return (
        <Helmet title="Depot - Kênh bán hàng">
            <Layout>
                <div className="bg-white rounded-md mb-6">
                    <div className="relative border-b border-b-border-1 flex items-center justify-center h-[300px]">
                        <img className="p-3" alt="background shop"
                             src={shopDetail.shopBackground || DefaultShopBg}/>

                        <div className="absolute right-3 top-3 flex flex-col gap-3">
                            <button className="rounded-full bg-primary-bg text-primary p-2">
                                <Icon.UilImagePlus className={"w-[20px] h-[20px]"}/>
                            </button>
                            <button className="rounded-full bg-primary-bg text-primary p-2">
                                <Icon.UilExpandRight className={"w-[20px] h-[20px]"}/>
                            </button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                            <div
                                className="font-medium text-tiny text-black-2 bg-[rgba(255,255,255,.7)] backdrop-blur rounded px-2">
                                <span>Đường dẫn của shop: </span>
                                <Link to={`/cua-hang/${shopDetail.slug}`} className="outline-none text-primary">
                                    {window.location.origin}/cua-hang/{shopDetail.slug}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-3">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-start gap-3">
                                <div
                                    className="relative rounded-full border-[3px] border-danger max-w-max max-h-max flex items-center justify-center">
                                    <img className="rounded-full w-[70px] h-[70px] object-cover" alt="avatar shop"
                                         src={shopDetail.shopLogo || DefaultShop}/>
                                    <div className="absolute right-[-4px] bottom-[-4px] flex flex-col gap-3">
                                        <button className="rounded-full bg-primary-bg text-primary p-1 outline-none">
                                            <Icon.UilCamera className={"w-[20px] h-[20px]"}/>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg mb-1">
                                        {shopDetail.shopName}
                                    </p>
                                    <div className="mb-1 flex items-center gap-2">
                                        <StarRating rating={shopDetail?.ratingInfo?.avgRating || 0}
                                                    className="w-[16px] h-[16px]"/>
                                        <p className="relative top-[.5px] font-medium text-tiny text-black-2">
                                            ({shopDetail?.ratingInfo?.totalRating} đánh giá)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <div
                                    className="flex-1 relative py-1 border-r-[2px] border-border-1  border-l-[2px] border-r-border-1 ">
                                    <div className="flex items-center gap-3 justify-center mb-1">
                                        <Icon.UilShop
                                            className="relative top-[-.5px] w-[20px] h-[20px] fill-black-1"/>
                                        <span
                                            className="font-medium text-primary text-md">{formatBetweenDate(shop.createdAt)}</span>
                                    </div>
                                    <p className="text-center font-medium text-tiny text-black-1">
                                        Bán hàng trên Depot
                                    </p>
                                </div>
                                <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                    <div className="flex items-center gap-3 justify-center mb-1">
                                        <Icon.UilArchive
                                            className="relative top-[-.5px] w-[20px] h-[20px] fill-black-1"/>
                                        <span
                                            className="font-medium text-primary text-md">{shop.amountProducts || 0}</span>
                                    </div>
                                    <p className="text-center font-medium text-tiny text-black-1">
                                        Sản phẩm
                                    </p>
                                </div>
                                <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                    <div className="flex items-center gap-3 justify-center mb-1">
                                        <Icon.UilCommentAltChartLines
                                            className="relative top-[-.5px] w-[20px] h-[20px] fill-black-1"/>
                                        <span
                                            className="font-medium text-primary text-md">
                                            {shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}
                                        </span>
                                    </div>
                                    <p className="text-center font-medium text-tiny text-black-1">
                                        Tỉ lệ phản hồi
                                    </p>
                                </div>
                                <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                    <div className="flex items-center gap-3 justify-center mb-1">
                                        <Icon.UilCommentAltChartLines
                                            className="relative top-[-.5px] w-[20px] h-[20px] fill-black-1"/>
                                        <span
                                            className="font-medium text-primary text-md">
                                            {shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}
                                        </span>
                                    </div>
                                    <p className="text-center font-medium text-tiny text-black-1">
                                        Tỉ lệ phản hồi
                                    </p>
                                </div>
                                <div className="flex-1 relative py-1">
                                    <div className="flex items-center gap-3 justify-center mb-1">
                                        <Icon.UilHistory
                                            className="relative top-[-.5px] w-[20px] h-[20px] fill-black-1"/>
                                        <span
                                            className="font-medium text-primary text-md">
                                            {shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}
                                        </span>
                                    </div>
                                    <p className="text-center font-medium text-tiny text-black-1">
                                        Thời gian phản hồi
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5  border-t border-t-border-1">
                        <div className="flex items-center gap-8">
                            <Link to={"/kenh-ban-hang/san-pham"}
                                  className="py-3.5 flex items-center gap-2 font-semibold text-md text-black-2 group hover:text-primary transition-all relative">
                                Quản lý sản phẩm
                                <p className="opacity-0 group-hover:opacity-100 absolute w-full h-[3px] bg-primary rounded-full left-0 right-0 bottom-0 transition-all"></p>
                            </Link>
                            <Link to={"/kenh-ban-hang/san-pham"}
                                  className="py-3.5 flex items-center gap-2 font-semibold text-md text-black-2 group hover:text-primary transition-all relative">
                                Đơn đặt hàng
                                <p className="opacity-0 group-hover:opacity-100 absolute w-full h-[3px] bg-primary rounded-full left-0 right-0 bottom-0 transition-all"></p>
                            </Link>
                            <Link to={"/kenh-ban-hang/san-pham"}
                                  className="py-3.5 flex items-center gap-2 font-semibold text-md text-black-2 group hover:text-primary transition-all relative">
                                Doanh thu
                                <p className="opacity-0 group-hover:opacity-100 absolute w-full h-[3px] bg-primary rounded-full left-0 right-0 bottom-0 transition-all"></p>
                            </Link>
                            <Link to={"/kenh-ban-hang/san-pham"}
                                  className="py-3.5 flex items-center gap-2 font-semibold text-md text-black-2 group hover:text-primary transition-all relative">
                                Xem sản phẩm
                                <p className="opacity-0 group-hover:opacity-100 absolute w-full h-[3px] bg-primary rounded-full left-0 right-0 bottom-0 transition-all"></p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <div className="basis-1/3 flex gap-6">
                            <div className="flex-1 bg-white rounded-md p-5"></div>
                            <div className="flex-1 bg-white rounded-md p-5"></div>
                        </div>
                    </div>
                    <div className="basis-1/3 bg-white rounded-md p-5">
                        <div className="flex items-center justify-end">
                            <Link to={"/kenh-ban-hang/thong-tin"} className="font-medium text-tiny text-black-2">
                                Chỉnh sửa
                            </Link>
                        </div>
                        {shop?.slogan &&
                            <span className="font-medium text-md italic mb-3">
                                "{shopDetail.slogan}"
                            </span>
                        }
                        <div
                            className="px-3 font-medium text-tiny text-black-2 mb-3">
                            <span>Đường dẫn của shop: </span>
                            <Link to={`/cua-hang/${shopDetail.slug}`}
                                  className="outline-none text-primary hover:underline transition-all">
                                {window.location.origin}/cua-hang/{shopDetail.slug}
                            </Link>
                        </div>
                        <h5 className="py-2 px-3 mb-3 bg-app-1 rounded-md flex items-center font-medium text-base">
                            Hoạt động
                        </h5>
                        <div className="px-3">
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-black-2 font-medium text-md">Thời gian hoạt động: </span>
                                <span
                                    className="text-black-2 font-medium text-md"> {formatBetweenDate(shopDetail.createdAt)}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-black-2 font-medium text-md">Thời gian phản hồi: </span>
                                <span className="text-black-2 font-medium text-md">
                                {shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}
                            </span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-black-2 font-medium text-md">Tỉ lệ phản hồi: </span>
                                <span className="text-black-2 font-medium text-md">
                                {shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}
                            </span>
                            </div>
                        </div>
                        <h5 className="py-2 px-3 mb-3 bg-app-1 rounded-md flex items-center font-medium text-base">
                            Thông tin cửa hàng
                        </h5>
                        <div className="px-3">
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Địa chỉ kho hàng: </span>
                                <span
                                    className="text-md font-medium text-black-2">{shopDetail.warehouseRegionName}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Thành phố: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.city}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Quận: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.district}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Phường: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.wards}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Địa chỉ chi tiết: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.addressDetail}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Email: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.shopEmail}</span>
                            </div>
                            <div className="mb-3 flex items-center gap-3 justify-between">
                                <span className="text-md font-medium text-black-2">Số điện thoại: </span>
                                <span className="text-md font-medium text-black-2">{shopDetail.shopPhone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Home;