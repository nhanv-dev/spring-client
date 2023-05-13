import "./style.scss";
import {NavLink, Route, Routes, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Icon from '@iconscout/react-unicons';
import * as IconSolid from '@iconscout/react-unicons-solid';
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import Info from "./Info";
import Product from "./Product";
import Review from "./Review";
import {formatBetweenDate, formatToK} from "../../../util/format";
import {publicRequest} from "../../../util/request-method";
import StarRating from "../../../components/common/star-rating";
import {Loader} from "../../../router/Router";
import DefaultShop from '../../../assets/images/default-shop.png';
import DefaultShopBg from '../../../assets/images/default-shop-bg.png';

function Shop() {
    const {slug} = useParams();
    const [shop, setShop] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicRequest().get(`/shops/slug/${slug}`)
            .then(res => {
                setShop(res.data);
                setLoading(false);
            })
            .catch(err => {
                setShop({})
                setLoading(false);
            })
    }, [slug])

    if (loading) return <Loader/>

    return (
        <Helmet title={`Depot - ${shop ? shop.shopName : 'Cửa hàng'}`}>
            <Layout>
                <div className="pb-10 bg-app-1">
                    <div className="container pb-6">
                        <div className="bg-white rounded-b-[8px]">
                            <div className="h-[260px] overflow-hidden flex items-center justify-center bg-center bg-contain"
                                 style={{backgroundImage: `url(${shop.shopBackground || DefaultShopBg})`}}/>
                            <div className="flex gap-3 py-4 px-6 border-b-2 border-border-1">
                                <div
                                    className="flex items-center justify-center rounded-full w-[90px] h-[90px] overflow-hidden border-[3px] border-primary">
                                    <img src={shop.shopLogo || DefaultShop} alt="avatar" className="w-full"/>
                                </div>
                                <div className="flex gap-4 border-r-2 border-border-1 pr-4">
                                    <div className="flex-1">
                                        <h5 className="max-w-[250px] font-bold text-black text-lg line-clamp-1 break-words"
                                            title={shop.shopName}>
                                            {shop.shopName}
                                        </h5>
                                        {shop.ratingInfo && (
                                            <div className="flex items-center justify-start gap-2.5 mb-3">
                                                <div className="flex gap-[.075rem] items-center">
                                                    <StarRating rating={shop.ratingInfo.avgRating}
                                                                className="w-[16px]"/>
                                                </div>
                                                <p className="text-base font-[700] text-red">{shop.rating}</p>
                                                <p className="text-tiny font-bold text-black-1">
                                                    ({formatToK(shop.ratingInfo.totalRating)} Đánh giá)
                                                </p>
                                            </div>
                                        )}
                                        <div
                                            className="flex gap-3 items-center justify-start max-w-[250px] min-w-[250px]">
                                            <button
                                                className="flex items-center justify-center gap-2 font-bold bg-[#e7e8ea] text-md text-[#3f4b53] outline-none py-1.5 px-3.5 rounded-[5px]">
                                                <Icon.UilHeart className="w-[20px] relative top-[1px]"/>
                                                Theo dõi
                                            </button>
                                            <button
                                                className="flex-1 flex items-center justify-center gap-2 font-bold bg-[#e7e8ea] text-md text-[#3f4b53] outline-none py-1.5 px-3.5 rounded-[5px]">
                                                <Icon.UilCommentsAlt className="w-[20px] relative top-[1px]"/>
                                                Chat ngay
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-full flex flex-col justify-start gap-2">
                                        <button
                                            className="flex items-center justify-center rounded-full bg-[#D8EAFF] w-[36px] h-[36px]">
                                            <Icon.UilPhoneVolume
                                                className="fill-[#1CAC93] w-[20px] h-[20px] relative top-[1px] right-[.5px]"/>
                                        </button>
                                        <button
                                            className="flex items-center justify-center rounded-full bg-[#D8EAFF] w-[36px] h-[36px]">
                                            <Icon.UilExclamationTriangle
                                                className="fill-[#1CAC93] w-[20px] h-[20px] relative top-[-.5px]"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Icon.UilStore
                                                className="relative top-[-.5px] w-[22px] h-[22px] fill-black-1"/>
                                            <span
                                                className="font-semibold text-primary text-md">{formatBetweenDate(shop.createdAt)}</span>
                                        </div>
                                        <p className="text-center font-bold text-md text-black-2">
                                            Bán hàng trên Depot
                                        </p>
                                    </div>
                                    <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Icon.UilArchive
                                                className="relative top-[-.5px] w-[22px] h-[22px] fill-black-1"/>
                                            <span
                                                className="font-semibold text-primary text-md">{shop.productTotal || 0}</span>
                                        </div>
                                        <p className="text-center font-bold text-md text-black-2">
                                            Sản phẩm
                                        </p>
                                    </div>
                                    <div className="flex-1 relative py-1 border-r-[2px] border-border-1">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Icon.UilCommentAltLines
                                                className="relative top-[-.5px] w-[22px] h-[22px] fill-black-1"/>
                                            <span
                                                className="font-semibold text-primary text-md">{shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}</span>
                                        </div>
                                        <p className="text-center font-bold text-md text-black-2">
                                            Tỉ lệ phản hồi
                                        </p>
                                    </div>
                                    <div className="flex-1 relative py-1">
                                        <div className="flex items-center gap-2 justify-center mb-1">
                                            <Icon.UilHistory
                                                className="relative top-[-.5px] w-[22px] h-[22px] fill-black-1"/>
                                            <span
                                                className="font-semibold text-primary text-md">{shop.responseTime ? `${shop.responseTime}%` : 'Đang cập nhật'}</span>
                                        </div>
                                        <p className="text-center font-bold text-md text-black-2">
                                            Thời gian phản hồi
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-8 px-6">
                                    <NavigationLink to="" title="Trang chủ Shop"/>
                                    <NavigationLink to="san-pham" title="Tất cả sản phẩm"/>
                                    <NavigationLink to="thong-tin" title="Thông tin Shop"/>
                                    <NavigationLink to="danh-gia-phan-hoi" title="Đánh giá & Phản hồi"/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="san-pham" element={<Product shop={shop}/>}/>
                        <Route path="thong-tin" element={<Info shop={shop}/>}/>
                        <Route path="danh-gia-phan-hoi" element={<Review shop={shop}/>}/>
                        <Route path="" element={<Product shop={shop}/>}/>
                    </Routes>
                </div>
            </Layout>
        </Helmet>
    );
}

const NavigationLink = ({to, title}) => {
    const classes = "text-primary after:bg-primary";
    return (
        <NavLink to={to} end className={(value) => {
            return `hover:text-primary-hover pt-4 pb-3 px-3 transition-all font-bold text-md tracking-[-.1px] relative after:absolute after:bg-transparent after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-[50px] 
            ${value?.isActive ? classes : 'text-black'}`
        }}>
            {title}
        </NavLink>
    )
}

export default Shop;