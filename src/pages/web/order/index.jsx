import {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest, publicRequest} from "../../../util/request-method";
import OrderBlock from "./OrderBlock";
import UserLayout from "../../../components/web/user-layout";
import ToastCustom from "../../../components/common/toast-custom";

function Order() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [params, setParams] = new useSearchParams();
    const [status, setStatus] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, totalPages: 1, loaded: false})

    useEffect(() => {
        const id = params.get('status');
        setStatus(parseInt(id) || null);
        setPagination({page: 0, size: 10, totalPages: 1, loaded: false})
    }, [params])

    useEffect(() => {
        publicRequest().get(`/order-status`)
            .then(res => {
                setOrderStatus(res.data)
            })
            .catch(err => {
                setOrderStatus([])
            })
    }, [params])

    useEffect(() => {
        if (!user.token) navigate("/dang-nhap");
        if (pagination.loaded) return;
        protectedRequest().get(`/users/${user.id}/orders?page=${pagination.page}&size=${pagination.size}${status ? `&status=${status}` : ''}`)
            .then(res => {
                setOrders(res.data.content);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                });
            })
            .catch(err => {
                setOrders([])
            })
    }, [pagination, navigate, user, status])

    const load = () => {
        protectedRequest().get(`/users/${user.id}/orders?page=${pagination.page + 1}&size=${pagination.size}${status ? `&status=${status}` : ''}`)
            .then(res => {
                setOrders([...orders, ...res.data.content]);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                });
            })
            .catch(err => {
                setOrders([])
            })
    }

    return (
        <Helmet title="Depot - Đơn đặt hàng">
            <UserLayout>
                <ToastCustom/>
                <div className="mb-5 shadow rounded-md bg-white overflow-hidden">
                    <div
                        className="flex justify-between items-center font-semibold text-black text-tiny">
                        <Link to={`/nguoi-dung/don-dat-hang`}
                              className={`${status === null ? 'bg-primary-bg text-primary' : ''} duration-500 text-center flex-1 py-2.5 hover:bg-primary-bg hover:text-primary transition-all`}>
                            Tất cả
                        </Link>
                        {orderStatus.map(s => (
                            <Link key={s.id} to={`/nguoi-dung/don-dat-hang?status=${s.id}`}
                                  className={`${status === s.id ? 'bg-primary-bg text-primary' : ''} duration-500 text-center flex-1 py-2.5 hover:bg-primary-bg hover:text-primary transition-all`}>
                                {s.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mb-5 shadow rounded-md bg-white py-3 px-3">
                    <form
                        className="flex justify-between items-center gap-5 font-medium text-md text-black-1">
                        <button type={"submit"} className="text-black-2">
                            <Icon.UilSearch className={"w-[20px] h-[20px]"}/>
                        </button>
                        <input type="text" className="bg-white w-full outline-none text-black-1"
                               placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"/>
                    </form>
                </div>

                <div className="w-full mb-8">
                    {orders.length > 0 ?
                        <div className="flex flex-col gap-5">
                            {orders.map((order) => (
                                <div key={order.id}
                                     className={`${order.status !== 'Cancel' ? 'bg-white' : 'bg-[#EAEAEA]'} shadow rounded-md`}>
                                    <OrderBlock order={order} setOrders={setOrders}/>
                                </div>
                            ))}
                        </div> :
                        <div
                            className="rounded-md bg-white p-8 flex items-center justify-center h-[300px] flex-col gap-6">
                            <div className="w-[100px] h-[100px] bg-cover bg-center"
                                 style={{backgroundImage: 'url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png)'}}></div>
                            <div className="font-semibold text-lg text-black-2">Chưa có đơn hàng</div>
                        </div>
                    }
                </div>
                {pagination?.page < pagination?.totalPages - 1 &&
                    <div className="mb-8 flex items-center justify-center">
                        <button onClick={load} className="px-5 py-1 bg-info-bg text-info font-bold text-md rounded-md">
                            Xem thêm
                        </button>
                    </div>
                }
            </UserLayout>
        </Helmet>
    );
}


export default Order;