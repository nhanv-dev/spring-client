import {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest, publicRequest} from "../../../util/request-method";
import OrderBlock from "./OrderBlock";
import UserLayout from "../../../components/web/user-layout";
import ToastCustom from "../../../components/common/toast-custom";

function Order() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);

    useEffect(() => {
        publicRequest().get(`/order-status`)
            .then(res => {
                setOrderStatus(res.data)
            })
            .catch(err => {
                setOrderStatus([])
            })
    }, [])

    useEffect(() => {
        if (!user.token) navigate("/dang-nhap");
        protectedRequest().get(`/users/${user.id}/orders`)
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                setOrders([])
            })
    }, [navigate, user])

    const reset = () => {
        if (!user.token) navigate("/dang-nhap");
        protectedRequest().get(`/users/${user.id}/orders`)
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                setOrders([])
            })
    }

    return (
        <Helmet title="Depot - Đơn đặt hàng">
            <UserLayout>
                <ToastCustom/>
                <div className="mb-5 shadow rounded-md bg-white">
                    <div className="flex justify-between items-center font-semibold text-black-2 text-md">
                        <button
                            className="text-center flex-1 py-3 hover:bg-primary-bg hover:text-primary rounded-md transition-all">
                            Tất cả
                        </button>
                        {orderStatus.map(status => (
                            <button key={status.id}
                                    className="text-center flex-1 py-3 hover:bg-primary-bg hover:text-primary rounded-md transition-all">
                                {status.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-5 shadow rounded-md bg-[#fff] py-3 px-3">
                    <div
                        className="flex justify-between items-center gap-5 font-medium text-md text-black-1">
                        <button>
                            <Icon.UilSearch/>
                        </button>
                        <input type="text" className="bg-[#fff] w-full outline-none text-black-1"
                               placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-5">
                        {orders.map((order) => (
                            <div key={order.id}
                                 className={`${order.status !== 'Cancel' ? 'bg-white' : 'bg-[#EAEAEA]'} shadow rounded-md`}>
                                <OrderBlock order={order} reset={reset}/>
                            </div>
                        ))}
                    </div>
                </div>
            </UserLayout>
        </Helmet>
    );
}


export default Order;