import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {publicRequest} from "../../../util/request-method";
import OrderTable from "./OrderTable";
import ToastCustom from "../../../components/common/toast-custom";
import {UilSearch} from "@iconscout/react-unicons";
import orderService from "../../../service/OrderService";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});
    const [orderStatus, setOrderStatus] = useState([]);

    useEffect(() => {
        publicRequest().get("/order-status")
            .then(res => setOrderStatus(res.data))
            .catch(err => setOrderStatus([]))
    }, [])

    useEffect(() => {
        if (pagination.loaded) return;
        orderService.getOrdersByShop({page: pagination.page, size: pagination.size})
            .then(res => {
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                })
                setOrders([...res.data.content])
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setPagination(prev => ({...prev, loaded: true}))
            })
    }, [pagination])

    return (
        <Helmet title="Depot - Đơn đặt hàng">
            <Layout>
                <ToastCustom/>
                <div className="mb-5 p-5 bg-white rounded-md">
                    <div className="flex items-center gap-5 justify-start mb-4">
                        <form
                            className={"w-[500px] max-w-[500px] w-full flex items-center gap-3 rounded border-2 border-border-1 text-secondary text-md font-medium px-3 py-1.5"}>
                            <input className="w-full bg-[transparent] outline-none border-none rounded-md"
                                   placeholder="Tìm theo tên sản phẩm, từ khóa..."/>
                            <button type={"submit"} className="text-black-2">
                                <UilSearch className="w-[20px] h-[20px]"/>
                            </button>
                        </form>
                        <div className="min-w-max font-semibold text-md text-black-2">
                            Tìm thấy {pagination.totalElements} kết quả
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <p className="py-1.5 font-semibold text-black-2 text-md">Trạng thái:</p>
                        <div className="flex flex-wrap items-start gap-4">
                            {orderStatus.map(status => (
                                <button key={status.id}
                                        className="px-6 py-1.5 bg-secondary-bg font-semibold text-tiny rounded-md text-secondary cursor-pointer">
                                    <p>{status.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-md">
                    <OrderTable orderStatus={orderStatus} orders={orders} setOrders={setOrders}
                                pagination={pagination}
                                setPagination={setPagination}/>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Orders;