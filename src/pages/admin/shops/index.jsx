import {useEffect, useState} from 'react';
import Layout from "../../../components/admin/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import ShopTable from "./ShopTable";

function SalesRegister() {
    const [shops, setShops] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});

    useEffect(() => {
        if (pagination.loaded) return;
        protectedRequest().get("/shops")
            .then(res => {
                setShops(res.data.content);
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
                setShops([])
            })
    }, [pagination])

    return (
        <Helmet title="Depot - Quản trị - Đơn bán hàng">
            <Layout>
                <div className="flex justify-center gap-6">
                    <div className="bg-white p-5 rounded-md">
                        <ShopTable shops={shops} pagination={pagination} setPagination={setPagination}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default SalesRegister;