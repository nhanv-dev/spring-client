import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {formatCurrency, formatLongDate, formatToK} from "../../../util/format";
import {Link} from "react-router-dom";
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

function OrderBlock({order, reset}) {
    const [show, setShow] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false);
    const [active, setActive] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(order.items);
    }, [order])
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
    return (
        <div className="relative">
            <div className="px-5">
                <div className="rounded-md relative">
                    <div className="flex items-center flex-wrap justify-between gap-5 mb-3 pt-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <div
                                className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full border-[3px] border-primary">
                                <Link to={`/cua-hang/${order.shop.slug}`}
                                      className="block w-full h-full bg-cover rounded-full"
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
                            <StatusOrder orderStatus={order.orderStatus}/>
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
                                                <div>
                                                    {item.isEvaluated ?
                                                        <p className="font-semibold text-sm text-rating">
                                                            Đã đánh giá
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
                    <div className="flex flex-col items-end justify-center gap-2 border-t border-border-1 py-2.5">
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
                </div>
            </div>
            {(order.orderStatus.status !== ORDER_CANCELLED && order.orderStatus.status !== ORDER_SHIPPING && order.orderStatus.status !== ORDER_COMPLETED) &&
                <div className="p-5 flex items-center justify-end gap-6 border-t border-border-1">
                    <CancelOrder show={show} setShow={setShow} order={order} reset={reset}/>
                    <button onClick={() => setShow(true)}
                            className="text-tiny font-bold text-danger bg-danger-bg px-3 py-2 rounded-md">
                        Hủy đơn hàng
                    </button>
                </div>
            }
        </div>
    );
}


const NotFound = () => {
    return (
        <div className="h-[130px] flex items-center justify-center">
            <h5 className="font-medium text-lg flex flex-col items-center justify-center gap-3">
                Không tìm thấy dữ liệu
                <Icon.UilSpinnerAlt/>
            </h5>
        </div>
    )
}

const StatusOrder = ({orderStatus}) => {
    return (
        <div className="h-[24px]">
            {orderStatus.status === ORDER_PENDING &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-warning rounded-full bg-warning-bg px-2.5 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_CONFIRMED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-2.5 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_SHIPPING &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-2.5 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_COMPLETED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-2.5 py-1">
                    {orderStatus.title}
                </div>
            }
            {orderStatus.status === ORDER_CANCELLED &&
                <div
                    className="flex items-center gap-2 font-bold text-sm text-info rounded-full bg-info-bg px-2.5 py-1">
                    {orderStatus.title}
                </div>
            }
        </div>
    )
}

export default OrderBlock;