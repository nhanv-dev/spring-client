import {useEffect, useState} from "react";
import ProductCard from "../../../components/web/product-card";
import {publicRequest} from "../../../util/request-method";

function Product({shop}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (!shop) return;
        publicRequest().get(`/shops/v-products?shopId=${shop._id}`).then(res => {
            console.log(res)
            setProducts(res.data.products)
        })
    }, [shop])

    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-3">
                {products.map((product, index) => {
                    return (
                        <ProductCard key={index} product={product}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Product;