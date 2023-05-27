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
import * as types from '../../../redux/constants/ActionType';
import toast from "react-hot-toast";
import ToastCustom from "../../../components/common/toast-custom";
import LoginPopup from "../../../components/web/login-popup";


function ProductDetail() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        setSelectedOptions([]);
        publicRequest().get(`/products/slug/${slug}`)
            .then(res => {
                setProduct(res.data)
                setSuccess(true)
            })
            .catch(err => {
                setSuccess(false)
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
        if (product?.variants?.length > 0 && !selectedVariant) {
            return toast.error("Vui lòng chọn loại sản phẩm.");
        }
        if (selectedVariant && quantity > selectedVariant.quantity) {
            return toast.error("Sản phẩm không đủ số lượng.");
        }
        const payload = {
            quantity: quantity,
            productId: product.id,
            variantId: selectedVariant?.id
        }
        const action = await addToCart(payload);
        dispatch(action);
        if (action.type === types.cart.ADD_CART_ITEM) {
            return toast.success("Đã thêm sản phẩm vào giỏ hàng.")
        }
        if (action.type === types.user.USER_LOGIN_FAILED) {
            return setShowLogin(true);
        }
        toast.error("Vui lòng thử lại sau.")
    }

    return (
        <Helmet title={`Depot - ${product?.name || 'Not found'} `}>
            <Layout>
                <ToastCustom/>
                <LoginPopup show={showLogin} setShow={setShowLogin}/>
                <div className="bg-app-1 pb-10">
                    {success ?
                        <div className="container">
                            <div
                                className="py-5 text-tiny font-medium text-black-2 flex items-center justify-start gap-2">
                                <Link to={"/trang-chu"} className="hover:text-primary transition-all min-w-max block">
                                    Trang Chủ
                                </Link>
                                {product?.category &&
                                    <>
                                        <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                        <Link to={`/danh-muc/${product.category.slug}`}
                                              className="hover:text-primary transition-all min-w-max block">
                                            {product.category.title}
                                        </Link>
                                    </>
                                }
                                {product?.subCategory &&
                                    <>
                                        <UilAngleRightB className={"w-[16px] h-[16px]"}/>
                                        <Link
                                            to={`/danh-muc/${product.subCategory.slug}`}
                                            className="hover:text-primary transition-all min-w-max block">
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
                                    <div className="mb-6">
                                        <ProductDescription content={product?.shortDescription}
                                                            title={"Mô tả sản phẩm"}/>
                                    </div>
                                    <ProductDescription content={product?.description} title={"Chi tiết sản phẩm"}/>
                                </div>
                            </div>
                            <Comment product={product}/>
                            <Footer product={product}/>
                        </div> :
                        <div className="container">
                            <div className=" py-10 h-[600px] flex flex-col items-center justify-center">
                                <img className="w-[500px] mb-8"
                                     src={"https://1.bp.blogspot.com/-W_8l-L7BARo/Xs0wlcD8GcI/AAAAAAAAJhQ/H5ztSXUAVYIKy2cEynjAOMd1M9qicizcgCLcBGAsYHQ/s1600/404.png"}
                                     alt={"product not found"}/>
                                <div className="text-center font-bold text-xl">
                                    Sản phẩm không tồn tại hoặc đã dừng bán.
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Layout>
        </Helmet>
    );
}

export default ProductDetail;