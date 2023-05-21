import React from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import ToastCustom from "../../../components/common/toast-custom";

function Reviews() {

    return (
        <Helmet title="Depot - Kênh bán hàng - Đánh giá">
            <Layout>
                <ToastCustom/>
                <div className={"font-semibold text-lg flex items-center justify-center py-10 bg-white rounded-md"}>
                    Chức năng chưa hỗ trợ
                </div>
            </Layout>
        </Helmet>
    );
}

export default Reviews;