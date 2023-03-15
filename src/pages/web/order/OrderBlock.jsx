import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {formatCurrency, formatLongDate, formatToK} from "../../../util/format";
import {Link} from "react-router-dom";
import Feedback from "./Feedback";
import CancelOrder from "./CancelOrder";

function OrderBlock({order, reset}) {
    const [show, setShow] = useState(false)

    return (
        <div className="relative">
            <div className="p-5 flex items-center justify-between gap-6 pb-3 border-b border-[#f2f2f2]">
                <p className="font-medium text-sm">Ngày đặt hàng: {formatLongDate(order.createdAt)}</p>
                <div className="flex items-center gap-3">
                    <StatusOrder order={order}/>
                    <div className="font-medium text-[#0000001f]">|</div>
                    {!order.isFeedback ?
                        <button className="flex items-center gap-2 font-medium text-md text-[#E4A400]">
                            <Icon.UilStar className="w-[16px] h-[16px] relative top-[-1px]"/>
                            Chưa Đánh giá
                        </button> :
                        <button className="flex items-center gap-2 font-medium text-md text-[#E4A400]">
                            <Icon.UilStar className="w-[16px] h-[16px] relative top-[-1px]"/>
                            Đã đánh giá
                        </button>
                    }
                </div>
            </div>
            {order.items?.length <= 0 ? <NotFound/> :
                <>
                    <div className="px-5">
                        <FilterOrder order={order}/>
                    </div>
                    <div className="p-5 flex items-center justify-between gap-6 border-t border-[#f2f2f2]">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center justify-start gap-2">
                                <Icon.UilShieldCheck className="text-[#018749] w-[24px] h-[24px]"/>
                                <p className="font-medium text-md">48 giờ hoàn trả</p>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <Icon.UilShieldCheck className="text-[#018749] w-[24px] h-[24px]"/>
                                <p className="font-medium text-md">Bảo hành khi có lỗi từ Nhà sản xuất</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <CancelOrder show={show} setShow={setShow} order={order} reset={reset}/>
                            {order.status !== 'Cancel' &&
                                <button onClick={() => setShow(true)}
                                        className="text-md font-medium border-2 border-primary text-primary px-3 py-1 rounded-[5px]">
                                    Hủy đơn hàng
                                </button>
                            }
                            <button
                                className="text-md font-medium border-2 border-primary text-primary px-3 py-1 rounded-[5px]">
                                Mua lại
                            </button>
                            <button
                                className="text-md font-medium border-2 border-primary text-primary px-3 py-1 rounded-[5px]">
                                Xem sản phẩm Shop
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

const FilterOrder = ({order}) => {
    const [filter, setFilter] = useState([])
    const [showFeedback, setShowFeedback] = useState(false);
    const [active, setActive] = useState();

    useEffect(() => {
        const array = [];
        order?.items?.forEach(item => {
            const a = array.filter(obj => obj?.shop?._id === item?.product?.shop?._id)
            if (a.length > 0) {
                array.forEach(obj => obj?.shop?._id === item?.product?.shop?._id && obj.items.push({...item}))
            } else {
                array.push({shop: {...item?.product?.shop}, items: [{...item}]})
            }
        })
        setFilter(array)
    }, [order])

    const handleShowFeedback = (item) => {
        setActive(item);
        setShowFeedback(true)
    }

    return (
        <div>
            {filter.length > 0 &&
                filter.map((obj, index) => (
                    <div key={index} className="rounded-[5px] relative">
                        <div className="flex items-center gap-5 mb-3 pt-5">
                            <div className="flex items-center gap-3">
                                <div className="w-[50px] h-[50px] rounded-full border-[3px] border-primary-hover">
                                    <Link to={`/cua-hang/${obj.shop.slug}`}
                                          className="block w-full h-full bg-cover rounded-full"
                                          style={{backgroundImage: `url(${obj.shop.avatar})`}}>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/cua-hang/${obj.shop.slug}`}
                                          className="font-semibold text-base mb-1 block">
                                        {obj.shop.name}
                                    </Link>
                                    <div className="flex items-center gap-3 text-black-1">
                                        <p className="font-medium text-tiny">{formatToK(obj.shop.followed)} người theo
                                            dõi</p>
                                        <p className="font-medium text-tiny">|</p>
                                        <p className="font-medium text-tiny">{formatToK(obj.shop.following)} đang theo
                                            dõi</p>
                                        <p className="font-medium text-tiny">|</p>
                                        <p className="font-medium text-tiny flex items-center gap-1">
                                            {obj.shop.rating}
                                            <Icon.UilStar className="w-[15px] h-[15px]"/>
                                        </p>
                                        <p className="font-medium text-tiny">|</p>
                                        <p className="font-medium text-tiny">{obj.shop.numberOfRating} lượt đánh giá</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            {obj.items.map((item, index) => (
                                <div key={index}
                                     className={`py-5 border-t border-[#f2f2f2]`}>
                                    <div className="flex items-center gap-3 justify-between">
                                        <div className="flex items-start gap-3">
                                            <Link className="block w-[80px] h-[80px] bg-cover bg-center rounded-[5px]"
                                                  to={`/san-pham/${item.product.slug}`}
                                                  style={{backgroundImage: `url(${item.product.images?.length > 0 ? item.product.images[0].url : ImageNotFound})`}}>
                                            </Link>
                                            <div className="max-w-[600px]">
                                                <Link to={`/san-pham/${item.product.slug}`}
                                                      className="font-medium text-tiny line-clamp-2 mb-1.5 transition-all hover:text-primary-hover">
                                                    {item.product.name}
                                                </Link>
                                                <div className="flex items-center justify-start gap-3 mb-1.5">
                                                    <p className="py-[2px] px-[12px] w-max text-[12px] font-bold bg-[#e2e6f2] border-[#f2f2f2] text-[#133096] rounded-[16px]">
                                                        {item.combination.combinationString}
                                                    </p>
                                                    <p className="font-bold text-base text-primary-hover">
                                                        x{item.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {!item.isFeedback ?
                                                        <>    {
                                                            order.status !== 'Cancel' &&
                                                            <button onClick={() => handleShowFeedback(item)}
                                                                    className="font-medium text-sm text-primary underline">
                                                                Đánh giá
                                                            </button>
                                                        }</> :
                                                        <p className="font-medium text-sm text-primary">
                                                            Đã đánh giá
                                                        </p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-primary-hover font-semibold text-lg">
                                            {formatCurrency(item.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            <Feedback showFeedback={showFeedback} setShowFeedback={setShowFeedback} item={active}/>
        </div>
    )
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

const StatusOrder = ({order}) => {
    return (
        <>
            {order.status === "Processing" &&
                <div className="flex items-center gap-2 font-medium text-md text-[#26aa99]">
                    <Icon.UilSpinnerAlt className="w-[16px] h-[16px]"/>
                    Đang xử lý
                </div>
            }
            {order.status === "Cancel" &&
                <>
                    <div className="flex items-center gap-2 font-medium text-md text-primary">
                        <Icon.UilSpinnerAlt className="w-[16px] h-[16px]"/>
                        Đã hủy
                    </div>
                </>
            }
        </>
    )
}

export default OrderBlock;