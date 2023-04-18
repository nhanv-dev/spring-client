import {useEffect, useState} from 'react';
import Layout from "../../../components/admin/layout";
import Helmet from "../../../components/common/helmet";
import SalesRegisterTable from "./SalesRegisterTable";
import {protectedRequest} from "../../../util/request-method";

function SalesRegister() {
    const [salesRegisters, setSalesRegisters] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});

    useEffect(() => {
        if (pagination.loaded) return;
        protectedRequest().get(`/sales-register?page=${pagination.page}&size=${pagination.size}`)
            .then(res => {
                setSalesRegisters(res.data.content);
                console.log(res.data.content)
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
                setSalesRegisters([]);
                setPagination(prev => ({...prev, loaded: true}))
            })
    }, [pagination])

    return (
        <Helmet title="Depot - Quản trị - Đơn bán hàng">
            <Layout>
                <div className="bg-white p-5 rounded-md">
                    <SalesRegisterTable salesRegisters={salesRegisters} pagination={pagination}
                                        setPagination={setPagination}/>
                </div>
            </Layout>
        </Helmet>
    );
}

export default SalesRegister;