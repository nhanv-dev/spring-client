import {useEffect, useState} from "react";
import ProductCard from "../../../components/web/product-card";
import {publicRequest} from "../../../util/request-method";

function Product({shop}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (!shop) return;
        publicRequest().get(`/products/shops/${shop.id}`)
            .then(res => {
                setProducts([...res.data.content]);
            })
            .catch(err => {
                setProducts([]);
            })
    }, [shop])

    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-3">
                {products?.map((product) => {
                    return (
                        <ProductCard key={product.id} item={product}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Product;