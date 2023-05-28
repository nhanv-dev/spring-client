import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import {UilEllipsisH, UilStar, UilTimes} from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {formatCurrency, formatLongDate, formatToK} from "../../../util/format";
import {Link, useNavigate} from "react-router-dom";
import Feedback from "./Feedback";
import CancelOrder from "./CancelOrder";
import DefaultShop from '../../../assets/images/default-shop.png';
import {
    ORDER_CANCELLED,
    ORDER_COMPLETED,
    ORDER_CONFIRMED,
    ORDER_PENDING,
    ORDER_SHIPPING
} from "../../../constant/StatusOrder";
import {protectedRequest} from "../../../util/request-method";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {Backdrop} from "@mui/material";

function OrderBlock({order, setOrders}) {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false);
    const [active, setActive] = useState(null);
    const [items, setItems] = useState([]);
    const [openAddress, setOpenAddress] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    useEffect(() => {
        setItems(order.items);
    }, [order])

    useEffect(() => {
        document.body.style.overflowY = openAddress ? "hidden" : "";
    }, [openAddress])

    const handleShowFeedback = (item) => {
        setActive(item);
        setShowFeedback(true)
    }

    const handleSetItem = (id) => {
        setItems(prev => {
            return [...prev].map(item => {
                if (item.id === id) return {...item, isEvaluated: true}
                return {...item};
            })
        })
    }

    const handleSubmit = (order, note) => {
        const data = {orderId: order.id, note}
        protectedRequest().post(`/users/${user.id}/orders/${order.id}/cancel-order`, data)
            .then(res => {
                setOrders(prev => {
                    return [...prev].map(o => (o.id === res.data.id ? res.data : o))
                })
                toast.success("Bạn đã hủy đơn hàng thành công");
            })
            .catch((err) => {
                toast.error("Bạn đã hủy đơn hàng thất bại")
                if (err.status === 403) navigate("/dang-nhap")
            })
        setShow(false)
    }

    return (
        <div className="relative">
            <div className="px-5">
                <div className="rounded-md relative">
                    <div className="flex items-center flex-wrap justify-between gap-5 mb-3 pt-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <div
                                className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full border-[3px] border-primary">
                                <Link to={`/cua-hang/${order.shop.slug}`}
                                      className="block w-full h-full bg-cover bg-center rounded-full"
                                      style={{backgroundImage: `url(${order.shop.shopLogo || DefaultShop})`}}>
                                </Link>
                            </div>
                            <div className="flex-1">
                                <Link to={`/cua-hang/${order.shop.slug}`}
                                      className="max-w-max font-semibold text-base mb-0.5 block hover:text-primary transition-all">
                                    {order.shop.shopName}
                                </Link>
                                <div className="flex items-center gap-3 text-black-2">
                                    <p className="font-medium text-sm">
                                        {formatToK(order.shop.followed || 0)} người theo dõi
                                    </p>
                                    <p className="font-medium text-sm">|</p>
                                    <p className="font-medium text-sm">
                                        {formatToK(order.shop.following || 0)} đang theo dõi
                                    </p>
                                    <p className="font-medium text-sm">|</p>
                                    <p className="font-medium text-sm flex items-center gap-1">
                                        {order.shop?.ratingInfo?.avgRating || 0}
                                        <Icon.UilStar className="w-[15px] h-[15px]"/>
                                    </p>
                                    <p className="font-medium text-sm">|</p>
                                    <p className="font-medium text-sm">
                                        {order.shop.totalRating || 0} lượt đánh giá
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className={"flex items-center gap-5"}>
                                <StatusOrder orderStatus={order.orderStatus}/>
                                <div>
                                    <button onClick={() => {
                                        setOpenAddress(true)
                                    }}
                                            className={"font-medium text-black-2 text-tiny outline-none border-none p-1 hover:bg-app-1 transition-all rounded-full"}>
                                        <UilEllipsisH className={"w-[20px] h-[20px]"}/>
                                    </button>
                                    {/*<div>*/}
                                    {/*    Thông tin nhận hàng*/}
                                    {/*</div>*/}
                                    <div
                                        className={`${openAddress ? 'opacity-100 visible' : 'opacity-0 hidden'} z-[1000] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all w-[450px] bg-white rounded-md`}>
                                        <div
                                            className="p-3 mb-3 flex items-center justify-between border-b border-border-1">
                                            <h5 className="font-semibold">
                                                Thông tin nhận hàng
                                            </h5>
                                            <button onClick={() => setOpenAddress(false)}
                                                    className={"text-danger rounded-full hover:bg-danger-bg transition-all"}>
                                                <UilTimes/>
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <div className={"flex items-center font-medium text-md mb-4 text-black-2"}>
                                                <p className="w-[140px] min-w-[140px]">Họ tên:</p>
                                                <p className={"font-semibold"}>
                                                    {order.address?.customerName}
                                                </p>
                                            </div>
                                            <div className={"flex items-center font-medium text-md mb-4 text-black-2"}>
                                                <p className="w-[140px] min-w-[140px]">Số điện thoại:</p>
                                                <p className={"font-semibold"}>
                                                    {order.address?.phoneNumber}
                                                </p>
                                            </div>
                                            {order.address?.email &&
                                                <div
                                                    className={"flex items-center font-medium text-md mb-5 text-black-2"}>
                                                    <p className="w-[140px] min-w-[140px]">Email:</p>
                                                    <p>
                                                        {order.address?.email}
                                                    </p>
                                                </div>
                                            }
                                            <div className={"flex items-center font-medium text-md mb-4 text-black-2"}>
                                                <p className="w-[140px] min-w-[140px]">Địa chỉ nhận hàng:</p>
                                                <p className={"font-semibold"}>
                                                    {order.address?.addressDetail}
                                                </p>
                                            </div>
                                            {order.note &&
                                                <div
                                                    className={"flex items-center font-medium text-md mb-5 text-black-2"}>
                                                    <p className="w-[140px] min-w-[140px]">Ghi chú:</p>
                                                    <p>
                                                        {order.note}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Backdrop
                                        sx={{color: '#fff', zIndex: 999}}
                                        open={openAddress}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setOpenAddress(false)
                                        }}>

                                    </Backdrop>
                                </div>
                            </div>
                            <p className="font-medium text-sm text-black-2">
                                Đặt hàng {formatLongDate(order.createdAt)}
                            </p>
                        </div>
                    </div>
                    {items.map((item) => (
                        <div key={item.id} className="w-full">
                            <div className={`py-5 border-t border-border-1`}>
                                <div className="flex items-start gap-5 justify-between">
                                    <div className="flex-1 flex items-start gap-3">
                                        <div className="border border-border-1 rounded-md">
                                            <Link className="block w-[80px] h-[80px] bg-cover bg-center rounded-md"
                                                  to={`/san-pham/${item.product.slug}`}
                                                  style={{backgroundImage: `url(${item.product.images?.length > 0 ? item.product.images[0].url : ImageNotFound})`}}>
                                            </Link>
                                        </div>
                                        <div className="w-full max-w-full">
                                            <Link to={`/san-pham/${item.product.slug}`}
                                                  className="font-semibold text-black-2 text-md line-clamp-2 leading-6 transition-all hover:text-primary">
                                                {item.variant?.attributeHash &&
                                                    <div
                                                        className="inline-flex items-center justify-center px-3 py-0.5 h-[20px] min-w-max mr-1.5 text-sm font-extrabold bg-primary-bg text-primary rounded-full">
                                                        <p className="relative top-[.5px]">
                                                            {item.variant?.attributeHash}
                                                        </p>
                                                    </div>
                                                }
                                                {item.product.name}
                                            </Link>
                                            {(order.orderStatus.status === ORDER_COMPLETED) &&
                                                <div className="mt-2">
                                                    {item.isEvaluated ?
                                                        <p className="font-semibold text-sm text-rating flex items-center justify-center max-w-max gap-1">
                                                            <UilStar className={"w-[16px] h-[16px]"}/>
                                                            <span className="relative top-[1.5px]">Đã đánh giá</span>
                                                        </p> :
                                                        <>
                                                            <button onClick={() => handleShowFeedback(item)}
                                                                    className="font-bold text-sm text-primary hover:underline transition-all">
                                                                Đánh giá
                                                            </button>
                                                            <Feedback showFeedback={showFeedback}
                                                                      setShowFeedback={setShowFeedback}
                                                                      item={active} handleSetItem={handleSetItem}/>
                                                        </>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="min-w-[300px] max-w-[300px] flex items-center justify-end gap-3">
                                        <div className="min-w-max flex-1 flex items-center justify-start gap-3">
                                            <p className="text-primary-hover font-semibold text-lg">
                                                {formatCurrency(item.finalPrice)}
                                            </p>
                                            <div className="text-primary-hover font-semibold text-base">
                                                <p className="font-bold text-base text-red relative top-[1px]">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="min-w-[130px] max-w-[130px] text-red font-bold text-lg text-end">
                                            {formatCurrency(item.finalPrice * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className={"p-5 bg-[#FFFEFB]  border-t border-border-1 border-dashed"}>
                <div
                    className="mb-5 flex flex-col items-end justify-center gap-2">
                    <p className="flex flex-wrap gap-2 items-center justify-between">
                        <span className="text-md font-semibold text-black-1">
                            Tạm tính:
                        </span>
                        <span className="font-bold text-base text-black-1 min-w-[200px] text-end">
                            {formatCurrency(order.totalPrice)}
                        </span>
                    </p>
                    <p className="flex flex-wrap gap-2 items-center justify-between">
                        <span className="text-md font-semibold text-black-1">
                           Phí vận chuyển:
                        </span>
                        <span className="font-bold text-base text-black-1 min-w-[200px] text-end">
                            {formatCurrency(0)}
                        </span>
                    </p>
                    <p className="flex flex-wrap gap-2 items-center justify-between">
                        <span className="text-md font-semibold text-black-1">
                            Tổng tiền:
                        </span>
                        <span className="font-bold text-xl text-red min-w-[200px] text-end">
                            {formatCurrency(order.totalPrice)}
                        </span>
                    </p>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <button
                        className="text-tiny font-bold text-primary bg-primary-bg border border-primary-bg px-5 py-1.5 rounded-md">
                        Liên hệ người bán
                    </button>
                    {(order.orderStatus.status !== ORDER_CANCELLED && order.orderStatus.status !== ORDER_SHIPPING && order.orderStatus.status !== ORDER_COMPLETED) &&
                        <>
                            <CancelOrder show={show} setShow={setShow} order={order} handleSubmit={handleSubmit}/>
                            <button onClick={() => setShow(true)}
                                    className="text-tiny font-semibold text-secondary border border-secondary-bg px-5 py-1.5 rounded-md bg-secondary-bg">
                                Hủy đơn hàng
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

const StatusOrder = ({orderStatus}) => {
    return (
        <div className="">
            {orderStatus.status === ORDER_PENDING &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-warning rounded-full bg-warning-bg px-5 py-1">
                    <p className="relative top-[0.5px]">
                        {orderStatus.title}
                    </p>
                </div>
            }
            {orderStatus.status === ORDER_CONFIRMED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-5 py-1">
                    <p className="relative top-[0.5px]">
                        {orderStatus.title}
                    </p>
                </div>
            }
            {orderStatus.status === ORDER_SHIPPING &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-5 py-1">
                    <p className="relative top-[0.5px]">
                        {orderStatus.title}
                    </p>
                </div>
            }
            {orderStatus.status === ORDER_COMPLETED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-5 py-1">
                    <p className="relative top-[0.5px]">
                        {orderStatus.title}
                    </p>
                </div>
            }
            {orderStatus.status === ORDER_CANCELLED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-danger rounded-full bg-danger-bg px-5 py-1">
                    <p className="relative top-[0.5px]">
                        {orderStatus.title}
                    </p>
                </div>
            }
        </div>
    )
}

export default OrderBlock;