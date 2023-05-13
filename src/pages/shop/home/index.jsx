import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import {useSelector} from "react-redux";
import DefaultShop from "../../../assets/images/default-shop.png";
import DefaultShopBg from "../../../assets/images/default-shop-bg.png";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import StarRating from "../../../components/common/star-rating";
import {formatBetweenDate} from "../../../util/format";
import ProfileShopUpdating from "./ProfileShopUpdating";
import ToastCustom from "../../../components/common/toast-custom";
import {toast} from "react-hot-toast";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../../service/FirebaseService";

function Home() {
    const {shop} = useSelector(state => state);
    const [shopDetail, setShopDetail] = useState({});

    useEffect(() => {
        if (!shop?.id) return;
        protectedRequest().get(`/shops/${shop.id}`)
            .then(res => {
                setShopDetail(res.data)
            })
            .catch(err => {
                setShopDetail({})
            })
    }, [shop])

    const handleUpdateShop = async (data) => {
        protectedRequest().put(`/shops/${shop.id}`, data)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.success("Cập nhật thông tin cửa hàng thành công")
                    setShopDetail(res.data)
                }
            })
            .catch(err => {
                toast.error("Cập nhật thông tin cửa hàng thất bại")
                console.log(err)
            })

    }

    const handleUploadBackgroundImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        uploadImage(file, "shopBackground");
    }
    const handleUploadLogoImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        uploadImage(file, "shopLogo");
    }
    const uploadImage = (file, prop) => {
        if (!file) return;
        let loading = false;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", () => {
                if (!loading) {
                    toast.loading("Đang lưu ảnh");
                    loading = true;
                }
            }, () => {
                toast.error("Xảy ra lỗi tại hệ thống")
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    handleUpdateShop({...shopDetail, [prop]: url});
                    toast.dismiss();
                })
            })
    }

    return (
        <Helmet title="Depot - Kênh bán hàng">
            <Layout>
                <ToastCustom/>
                <div className="bg-white rounded-md mb-6 ">
                    <div
                        className="relative border-b border-b-border-1 flex items-center justify-center h-[300px] rounded-t-md bg-contain bg-white bg-no-repeat bg-center"
                        style={{backgroundImage: `url(${shopDetail.shopBackground || DefaultShopBg})`}}>
                        <div className="absolute right-3 top-3 flex flex-col gap-3">
                            <label htmlFor={"backgroundImage"}
                                   className="cursor-pointer rounded-full bg-primary-bg text-primary p-2">
                                <Icon.UilImagePlus className={"w-[20px] h-[20px]"}/>
                            </label>
                            <input accept="image/png, image/jpeg" id={"backgroundImage"} name={"backgroundImage"}
                                   type={"file"} className="hidden" placeholder={"image"}
                                   onChange={handleUploadBackgroundImage}/>
                            <button className="rounded-full bg-primary-bg text-primary p-2">
                                <Icon.UilExpandRight className={"w-[20px] h-[20px]"}/>
                            </button>
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
                                        <label htmlFor={"logoImage"}
                                               className="cursor-pointer rounded-full bg-primary-bg text-primary p-1 outline-none">
                                            <Icon.UilCamera className={"w-[20px] h-[20px]"}/>
                                        </label>
                                        <input accept="image/png, image/jpeg" id={"logoImage"} name={"logoImage"}
                                               type={"file"} className="hidden" placeholder={"image"}
                                               onChange={handleUploadLogoImage}/>
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
                                            className="font-semibold text-primary text-base">{formatBetweenDate(shop.createdAt)}</span>
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
                                            className="font-semibold text-primary text-base">{shop.productTotal || 0}</span>
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
                                            className="font-semibold text-primary text-base">
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
                                            className="font-semibold text-primary text-base">
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
                                            className="font-semibold text-primary text-base">
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
                    <div className="px-5 border-t border-t-border-1 flex items-center justify-between gap-3">
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
                        <div className="font-medium text-tiny text-black-2">
                            <span>Đường dẫn của shop: </span>
                            <Link to={`/cua-hang/${shopDetail.slug}`} className="outline-none text-primary">
                                {window.location.origin}/cua-hang/{shopDetail.slug}
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
                        <ProfileShopUpdating shopDetail={shopDetail} setShopDetail={setShopDetail}
                                             handleUpdateShop={handleUpdateShop}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Home;