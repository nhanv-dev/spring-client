import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './style.scss';
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import Overview from "./Overview";
import {useDispatch, useSelector} from "react-redux";
import {productSample} from "../../../constant/ProductSample";
import Breadcrumb from "../../../components/web/breadcrumb";
import Shop from "./Shop";
import Footer from "./Footer";

// import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [options, setOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [combinations, setCombinations] = useState([]);
    const [userCombination, setUserCombination] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        setProduct(productSample)
    }, [slug])


    const updateQuantity = (value) => {
        setQuantity(value)
    }

    const handleAddToCart = async () => {

    }

    return (
        <Helmet title={`Depot - ${product?.name}`}>
            <Layout>
                <div className="bg-app-1 pb-10">
                    <div className="container">
                        <Breadcrumb>
                            <Link to={"/trang-chu"}>Trang Chủ</Link>
                            {product?.category &&
                                <Link to={`/danh-muc/${product.category.slug}`}>{product.category.name}</Link>}
                            {product?.subCategory &&
                                <Link to={`/danh-muc/${product.subCategory.slug}`}>{product.subCategory.name}</Link>}
                            <p className="line-clamp-1">{product?.name}</p>
                        </Breadcrumb>
                        {/*<ToastContainer/>*/}
                        <Overview product={product}
                                  slug={slug}
                                  userCombination={userCombination}
                                  options={options}
                                  combinations={combinations}
                                  userOptions={userOptions}
                                  setUserOptions={setUserOptions}
                                  updateQuantity={updateQuantity}
                                  handleAddToCart={handleAddToCart}
                                  quantity={quantity}/>
                        <div className="flex flex-wrap justify-between mt-6 max-w-full gap-6 pb-6">
                            {product?.shop && <Shop shop={product.shop} relatedProducts={relatedProducts}/>}
                            {/*<div className="flex-1">*/}
                            {/*    <ProductDescription product={product}/>*/}
                            {/*    <QuestionBlock product={product} shop={shop}/>*/}
                            {/*</div>*/}
                        </div>
                        {/*<Comment product={product} shop={shop}/>*/}
                        <Footer product={product}/>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default ProductDetail;