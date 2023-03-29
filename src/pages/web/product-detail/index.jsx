import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import Overview from "./Overview";
import {useDispatch} from "react-redux";
import Shop from "./Shop";
import Footer from "./Footer";
import {publicRequest} from "../../../util/request-method";
import ProductDescription from "./ProductDescription";
import Comment from "./Comment";
import {similarArray} from "../../../util/array";
import {addToCart} from "../../../redux/actions/cartActions";
import {UilAngleRightB} from "@iconscout/react-unicons";


function ProductDetail() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        publicRequest().get(`/products/slug/${slug}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {

            })
    }, [slug])

    useEffect(() => {
        if (!product || !product.variants || product.variants.length <= 0) return;
        const ids = selectedOptions.map(o => o.id);
        const list = product.variants?.filter(v => {
            return similarArray(ids, v.options.map(o => o.id));
        })
        if (list.length <= 0) return setSelectedVariant(null);
        setSelectedVariant(list[0]);
    }, [product, selectedOptions])

    const updateQuantity = (value) => {
        if (value <= 0) value = 1;
        setQuantity(value)
    }

    const handleAddToCart = async () => {
        if (product?.variants?.length > 0 && !selectedVariant) return;
        const payload = {
            quantity: quantity,
            productId: product.id,
            variantId: selectedVariant?.id
        }
        dispatch(await addToCart(payload));
    }

    return (
        <Helmet title={`Depot - ${product?.name}`}>
            <Layout>
                <div className="bg-app-1 pb-10">
                    <div className="container">
                        <div
                            className="py-5 text-tiny font-medium text-black-2 flex items-center justify-start gap-2">
                            <Link to={"/trang-chu"} className="hover:text-primary transition-all">
                                Trang Chủ
                            </Link>
                            {product?.category &&
                                <>
                                    <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                    <Link to={`/danh-muc/${product.category.slug}`}
                                          className="hover:text-primary transition-all">
                                        {product.category.title}
                                    </Link>
                                </>
                            }
                            {product?.subCategory &&
                                <>
                                    <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                    <Link
                                        to={`/danh-muc/${product.subCategory.slug}`}
                                        className="hover:text-primary transition-all">
                                        {product.subCategory.title}
                                    </Link>
                                </>
                            }
                            <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                            <p className="line-clamp-1">{product?.name}</p>
                        </div>
                        <Overview product={product}
                                  quantity={quantity}
                                  updateQuantity={updateQuantity}
                                  handleAddToCart={handleAddToCart}
                                  selectedVariant={selectedVariant}
                                  selectedOptions={selectedOptions}
                                  setSelectedOptions={setSelectedOptions}
                        />
                        <div className="flex flex-wrap justify-between mt-6 max-w-full gap-6 pb-6">
                            {product?.shop && <Shop shop={product.shop}/>}
                            <div className="flex-1">
                                <ProductDescription product={product}/>
                                <Comment product={product}/>
                            </div>
                        </div>
                        <Footer product={product}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default ProductDetail;