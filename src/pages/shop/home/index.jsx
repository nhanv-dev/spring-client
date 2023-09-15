import React, {useEffect, useState} from 'react';
import Layout, {Footer} from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import {useDispatch, useSelector} from "react-redux";
import DefaultShop from "../../../assets/images/default-shop.png";
import DefaultShopBg from "../../../assets/images/default-shop-bg.png";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import StarRating from "../../../components/common/star-rating";
import {formatBetweenDate, formatCurrency, formatMediumDate} from "../../../util/format";
import ProfileShopUpdating from "./ProfileShopUpdating";
import ToastCustom from "../../../components/common/toast-custom";
import {toast} from "react-hot-toast";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../../service/FirebaseService";
import productService from "../../../service/ProductService";
import shopService from "../../../service/ShopService";
import {Grid} from "@mui/material";
import ProductCard from "../../../components/web/product-card";
import {UilAngleRight, UilPen} from "@iconscout/react-unicons";
import orderService from "../../../service/OrderService";
import StatusBadge from "../order/StatusBadge";
import {updateShop} from "../../../redux/actions/shopActions";
import * as types from "../../../redux/constants/ActionType";

function Home() {
    const {shop} = useSelector(state => state);
    const dispatch = useDispatch();
    const [shopDetail, setShopDetail] = useState({});
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!shop?.id) return;
        shopService.getShop({shopId: shop.id})
            .then(res => {
                setShopDetail(res.data)
            })
            .catch(err => {
                setShopDetail({})
            })
        productService.getProductByShop({page: 0, size: 8})
            .then(res => {
                setProducts(res.data.content)
            })
            .catch(err => {
                setProducts([])
            })
        orderService.getOrdersByShop({page: 0, size: 5})
            .then(res => {
                console.log(res)
                setOrders(res.data.content)
            })
            .catch(err => {
                setOrders([])
            })
    }, [shop.id])

    const handleUpdateShop = async (data) => {
        const action = await updateShop({shop: data});
        if (action.type === types.shop.UPDATE_SHOP) {
            toast.success("Cập nhật thông tin cửa hàng thành công");
            setShopDetail(action.payload);
            dispatch(action);
            return;
        }
        toast.error("Cập nhật thông tin cửa hàng thất bại")
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
                        <div className={"mb-5 p-3 rounded-md bg-white"}>
                            <div className="flex items-center gap-5 justify-between mb-3 pb-3 border-b border-border-1">
                                <h5 className="font-semibold text-black text-lg">
                                    Đơn đặt hàng
                                </h5>
                                <Link to={"/kenh-ban-hang/don-dat-hang"}
                                      className={"flex items-center gap-2 font-medium text-tiny hover:text-primary transition-all"}>
                                    Xem tất cả
                                    <UilAngleRight className={"w-[20px] h-[20px]"}/>
                                </Link>
                            </div>
                            {orders?.length <= 0 &&
                                <div className="flex items-center justify-center py-6 font-semibold">
                                    Bạn chưa có đơn đặt hàng nào.
                                </div>
                            }
                            {orders.length > 0 &&
                                <div>
                                    <div
                                        className="text-tiny font-semibold text-black flex items-center gap-5 mb-1 p-3">
                                        <div className="text-md min-w-[80px]">
                                            ID
                                        </div>
                                        <div className={"min-w-[150px] flex items-center justify-center"}>
                                            Trạng thái
                                        </div>
                                        <div className={"min-w-[150px] flex items-center justify-end"}>
                                            Tổng tiền
                                        </div>
                                        <div className={"min-w-[80px] flex-1 flex items-center justify-end"}>
                                            Ngày tạo
                                        </div>
                                        <div className={"min-w-[80px] flex-1 flex items-center justify-end"}>
                                            Ngày cập nhật
                                        </div>
                                        <div className={"min-w-[80px] flex items-center justify-end"}>
                                            Thao tác
                                        </div>
                                    </div>
                                    {orders.map(order => (
                                        <div key={order.id}
                                             className="text-tiny font-medium text-black-2 flex items-center gap-5 bg-app-1 mb-2 p-3 rounded-md">
                                            <div className="text-md min-w-[80px]">
                                                {order.id}
                                            </div>
                                            <div className={"min-w-[150px] flex items-center justify-center"}>
                                                <div className={"max-w-max"}>
                                                    <StatusBadge orderStatus={order.orderStatus}/>
                                                </div>
                                            </div>
                                            <div
                                                className={"min-w-[150px] flex items-center justify-end font-bold text-danger text-md"}>
                                                {formatCurrency(order.totalPrice)}
                                            </div>
                                            <div className={"min-w-[80px] flex-1 flex items-center justify-end"}>
                                                {formatMediumDate(order.createdAt)}
                                            </div>
                                            <div className={"min-w-[80px] flex-1 flex items-center justify-end"}>
                                                {formatMediumDate(order.updatedAt)}
                                            </div>
                                            <div className={"min-w-[80px] flex items-center justify-end"}>
                                                <Link to={`/kenh-ban-hang/don-dat-hang/${order.id}`}
                                                      className={"bg-primary-bg text-primary rounded-full w-[32px] h-[32px] flex items-center justify-center"}>
                                                    <UilPen size={"18px"}/>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className={"p-3 rounded-md bg-white"}>
                            <div className="flex items-center gap-5 justify-between mb-3 pb-3 border-b border-border-1">
                                <h5 className="font-semibold text-black text-lg">
                                    Quản lý sản phẩm
                                </h5>
                                <Link to={"/kenh-ban-hang/san-pham"}
                                      className={"flex items-center gap-2 font-medium text-tiny hover:text-primary transition-all"}>
                                    Xem tất cả
                                    <UilAngleRight className={"w-[20px] h-[20px]"}/>
                                </Link>
                            </div>
                            <div className="bg-app-1 p-3 rounded-md">
                                {products.length <= 0 &&
                                    <div
                                        className="flex items-center justify-center py-6 font-semibold">
                                        Cửa hàng chưa có sản phẩm nào.
                                    </div>
                                }
                                {products?.length > 0 &&
                                    <Grid container spacing={2}>
                                        {products.map((item) => (
                                            <Grid item lg={12 / 4} md={12 / 4} xs={12 / 2} key={item.id}>
                                                <ProductCard item={item}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="basis-1/3 bg-white rounded-md p-5">
                        <ProfileShopUpdating shopDetail={shopDetail} setShopDetail={setShopDetail}
                                             handleUpdateShop={handleUpdateShop}/>
                    </div>
                </div>
            </Layout>
            <Footer/>
        </Helmet>
    );
}

export default Home;