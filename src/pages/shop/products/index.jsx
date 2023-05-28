import React, {useEffect, useState} from 'react';
import Layout from "../../../components/shop/layout";
import Helmet from "../../../components/common/helmet";
import {protectedRequest} from "../../../util/request-method";
import ProductTable from "./ProductTable";
import ToastCustom from "../../../components/common/toast-custom";
import productService from "../../../service/ProductService";

function Products() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});

    useEffect(() => {
        if (pagination.loaded) return;
        productService.getProductByShop({page: pagination.page, size: pagination.size})
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
            .catch(err => {
                console.log(err)
            })
    }, [pagination])

    return (
        <Helmet title="Depot - Quản lý sản phẩm">
            <Layout>
                <ToastCustom/>
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