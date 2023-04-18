import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest, publicRequest} from "../../../util/request-method";
import StatusStepper from "./StatusStepper";
import ToastCustom from "../../../components/common/toast-custom";
import {UilArrowLeft, UilArrowRight, UilBan} from "@iconscout/react-unicons";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {Link, useNavigate, useParams} from "react-router-dom";
import {formatCurrency} from "../../../util/format";
import {Loader} from "../../../router/Router";

function Order() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [orderStatus, setOrderStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        publicRequest().get("/order-status")
            .then(res => setOrderStatus(res.data))
            .catch(err => setOrderStatus([]))
    }, [id])

    useEffect(() => {
        protectedRequest().get(`/shops/orders/${id}`)
            .then(res => {
                setOrder(res.data)
                setLoading(false)
            })
    }, [id])

    if (loading) return <Loader/>

    return (
        <Helmet title="Depot - Đơn đặt hàng">
            <Layout>
                <ToastCustom/>
                <div className="mb-3 flex justify-between items-center gap-3">
                    <button onClick={() => navigate(-1)}
                            className="font-semibold text-md flex items-center gap-1 justify-start transition-all hover:text-primary text-black">
                        <UilArrowLeft className="w-[20px] h-[20px]"/>
                        Quay lại
                    </button>
                </div>
                <div className="flex gap-5 flex-wrap mb-10">
                    <div className="basis-4/12 p-5 bg-white rounded-md">
                        <StatusStepper order={order} orderStatus={orderStatus} setOrder={setOrder}/>
                    </div>
                    <div className="flex-1">
                        <div
                            className="w-full bg-white rounded-md mb-5 overflow-hidden p-3">
                            {order.items?.map(item => (
                                <div key={item.id}
                                     className="hover:bg-app-1 transition-all rounded-md relative flex flex-wrap items-start justify-between gap-8 p-3">
                                    {item.product.isDeleted &&
                                        <div
                                            className="absolute left-0 top-0 right-0 bottom-0 bg-[rgba(255,255,255,0.6)] z-0 rounded-md">
                                            <div
                                                className="absolute left-[50%] top-[50%] translate-x-[-50%] z-10 translate-y-[-50%]">
                                                <p className="font-semibold text-danger flex items-center gap-2 bg-danger-bg py-2 px-3 rounded-md text-md z-10">
                                                    <UilBan
                                                        className={"w-[18px] h-[18px]"}/>
                                                    Sản phẩm đã bị xóa
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    <div className="flex-1 flex items-start gap-2">
                                        <div
                                            className="rounded-md border border-border-1">
                                            <img alt="product"
                                                 className="w-[70px] h-[70px] rounded-md"
                                                 src={item?.product?.images?.length > 0 ? item?.product?.images[0]?.url : ImageNotFound}/>
                                        </div>
                                        <div className="min-w-[300px] max-w-[500px]">
                                            <Link to={`/san-pham/${item.product.slug}`}
                                                  title={item.product.name}
                                                  className=" font-medium text-tiny max-w-full line-clamp-2 leading-6">
                                                {item.product.name}
                                            </Link>
                                            <div
                                                className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                        <span className="font-medium text-tiny">
                                                                           Giá bán hiện tại:
                                                                        </span>
                                                <span
                                                    className="text-danger font-bold text-base">
                                                                             {formatCurrency(item.product.deal.finalPrice)}
                                                                        </span>
                                            </div>
                                            <div
                                                className="pt-1 flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                <div className="font-medium text-tiny">
                                                    Hiện có <span
                                                    className="font-semibold text-danger">
                                                                                {item.product.quantity}
                                                                            </span> sản phẩm
                                                </div>
                                                {item.variant &&
                                                    <>
                                                        <div>|</div>
                                                        <div
                                                            className="font-medium text-tiny">
                                                            Phiên bản có <span
                                                            className="font-semibold text-danger">
                                                                                {item.variant.quantity}
                                                                            </span> sản phẩm
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {item.variant &&
                                        <div
                                            className="w-[150px] flex items-end gap-2 text-black-2 font-medium text-tiny">
                                            <div
                                                className="font-medium text-tiny leading-6">
                                                Phiên bản:
                                            </div>
                                            <div
                                                className="text-danger font-bold text-lg leading-6">
                                                {item.variant.attributeHash}
                                            </div>
                                        </div>
                                    }
                                    <div
                                        className="w-[150px] flex items-end gap-2 text-black-2 font-medium text-tiny">
                                        <div
                                            className="font-medium text-tiny leading-6">
                                            Số lượng đặt:
                                        </div>
                                        <div
                                            className="text-danger font-bold text-lg leading-6">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div
                                        className="w-[200px] flex items-end gap-2 text-black-2 font-medium text-tiny">
                                        <div
                                            className="font-medium text-tiny leading-6">
                                            Giá đặt mua:
                                        </div>
                                        <div
                                            className="text-danger font-bold text-lg leading-6">
                                            {formatCurrency(item.finalPrice)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-border-1 pt-3 mt-3">
                                <div className="flex items-center justify-end gap-3">
                                    <p className="font-medium">
                                        Tổng tiền:
                                    </p>
                                    <p className="text-danger font-semibold text-xl">
                                        {formatCurrency(order.totalPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded-md">
                            <div className="font-medium mb-3">
                                Thông tin nhận hàng
                            </div>
                            <div className="mb-5 font-medium text-md">
                                Tên người nhận: {order.address.customerName}
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="mb-5 font-medium text-md">
                                    SĐT: {order.address.phoneNumber}
                                </div>
                                <div className="mb-5 font-medium text-md">
                                    Email: {order.address.email}
                                </div>
                            </div>
                            <div className="mb-5 font-medium text-md">
                                Khu
                                vực: {order.address.city}, {order.address.wards}, {order.address.district}
                            </div>
                            <div className="mb-5 font-medium text-md">
                                Địa chỉ chi tiết: {order.address.addressDetail}
                            </div>
                            {order.note &&
                                <div>
                                    <p className="mb-1 font-medium text-md">
                                        Ghi chú từ người mua:
                                    </p>
                                    <div
                                        className="rounded-md p-3 bg-app-1 font-medium text-md">
                                        {order.note}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Order;