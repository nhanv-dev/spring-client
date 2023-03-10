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
import {publicRequest} from "../../../util/request-method";
import ProductDescription from "./ProductDescription";
import Comment from "./Comment";

// import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        publicRequest().get(`/products/slug/${slug}`)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => {

            })
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
                                <Link to={`/danh-muc/${product.category.slug}`}>{product.category.title}</Link>}
                            {product?.subCategory &&
                                <Link to={`/danh-muc/${product.subCategory.slug}`}>{product.subCategory.title}</Link>}
                            <p className="line-clamp-1">{product?.name}</p>
                        </Breadcrumb>
                        {/*<ToastContainer/>*/}
                        <Overview product={product}
                                  updateQuantity={updateQuantity}
                                  handleAddToCart={handleAddToCart}
                                  selectedOptions={selectedOptions}
                                  setSelectedOptions={setSelectedOptions}
                                  quantity={quantity}/>
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