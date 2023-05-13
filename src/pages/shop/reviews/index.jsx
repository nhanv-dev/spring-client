import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest, publicRequest} from "../../../util/request-method";
import ReviewsTable from "./ReviewsTable";
import ToastCustom from "../../../components/common/toast-custom";
import StatusBadge from "../order/StatusBadge";

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
        protectedRequest().get(`/shops/orders?page=${pagination.page}&size=${pagination.size}`)
            .then(res => {
                console.log(res.data.content)
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
        <Helmet title="Depot - Kênh bán hàng - Đánh giá shop">
            <Layout>
                <ToastCustom/>
                <div className="flex items-start gap-6">
                    <div className="flex-1 p-5 bg-white rounded-md">
                        <ReviewsTable orderStatus={orderStatus} orders={orders} setOrders={setOrders}
                                      pagination={pagination}
                                      setPagination={setPagination}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Orders;