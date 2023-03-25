import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import ProductTable from "./ProductTable";

function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});

    useEffect(() => {
        protectedRequest().get(`/shops/products?page=${pagination.page}&size=${pagination.size}`)
            .then(res => {
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                })
                setProducts([...res.data.content])
                window.scrollTo(0, 0);
            })
    }, [pagination.page, pagination.size])

    return (
        <Helmet title="Depot - Quản lý sản phẩm">
            <Layout>
                <div className="flex gap-6">
                    <div className="w-full p-5 bg-white rounded-md">
                        <ProductTable products={products} pagination={pagination} setPagination={setPagination}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Products;