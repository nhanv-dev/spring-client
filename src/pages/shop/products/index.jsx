import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import ProductTable from "./ProductTable";
import {ToastContainer} from "react-toastify";

function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({page: 1, size: 10, loaded: false});

    useEffect(() => {
        if (pagination.loaded) return;
        protectedRequest().get(`/shops/products?page=${pagination.page}&size=${pagination.size}`)
            .then(res => {
                console.log(res)
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
            .catch(err => {
                console.log(err)
            })
    }, [pagination])

    return (
        <Helmet title="Depot - Quản lý sản phẩm">
            <Layout>
                <ToastContainer className="font-medium text-md"/>
                <div className="w-full p-5 bg-white rounded-md mb-5 shadow">
                    <p className="font-bold text-base text-black">
                        Quản lý sản phẩm
                        <span> ({pagination.totalElements}+)</span>
                    </p>

                </div>
                <div className="w-full p-5 bg-white rounded-md">
                    <ProductTable products={products} pagination={pagination} setPagination={setPagination}/>
                </div>
            </Layout>
        </Helmet>
    );
}

export default Products;