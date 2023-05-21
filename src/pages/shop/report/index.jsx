import React, {useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import ToastCustom from "../../../components/common/toast-custom";
import {useNavigate, useParams} from "react-router-dom";

function Order() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [orderStatus, setOrderStatus] = useState([]);
    // const [loading, setLoading] = useState(true);
    //
    //
    // if (loading) return <Loader/>

    return (
        <Helmet title="Depot - Kênh bán hàng - Thống kê">
            <Layout>
                <ToastCustom/>
                <div className={"font-semibold text-lg flex items-center justify-center py-10 bg-white rounded-md"}>
                    Chức năng chưa hỗ trợ
                </div>
            </Layout>
        </Helmet>
    );
}

export default Order;