import React from 'react';
import Layout from "../../../components/admin/layout";
import Helmet from "../../../components/common/helmet";
import EnhancedTable from "./EnhancedTable";

function SalesRegister(props) {
    return (
        <Helmet title="Depot - Duyệt đơn đăng ký bán hàng">
            <Layout>
                <div className="container">
                    <div className="bg-white p-5 rounded-md">
                        <EnhancedTable/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default SalesRegister;