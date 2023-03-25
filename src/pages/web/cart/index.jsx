import React, {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import CartItem from "./CartItem";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons"
import {formatCurrency} from "../../../util/format";
import {useDispatch, useSelector} from "react-redux";
import {initializeCart} from "../../../redux/actions/cartActions";
import DefaultShop from "../../../assets/images/default-shop.png";
import StarRating from "../../../components/common/star-rating";

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            dispatch(await initializeCart());
            return {status: true}
        }
        load().then(data => {
            if (data.status) setLoading(false)
        })
    }, [])

    useEffect(() => {
        // let total = 0, discount = 0
        // cart.items?.forEach(item => {
        //     if (item.combination && item.checked) {
        //         total += item.combination.price * item.quantity
        //         discount += (item.combination.price * item.quantity * item.product.discountPercent) / 100
        //     }
        // })
        // setTotal(total);
        // setDiscount(discount);
        console.log(cart)
    }, [cart])

    const handleOrder = () => {
        const items = cart.items.filter(item => (item.checked))
        // if (items.length <= 0) return toast.error("Bạn chưa chọn sản phẩm muốn mua")
        navigate("/thanh-toan")
    }

    if (loading)
        return (
            <div className="fixed z-50 bg-white top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <img src="https://www.pngrepo.com/png/199956/512/loading-loader.png" alt="spinner"
                     className="w-[60px] h-[60x] animate-spin"/>
            </div>
        )

    return (
        <Helmet title="Depot - Giỏ hàng">
            <Layout>
                <div className="bg-app-1">
                    <div className="container py-10">
                        <div className="flex flex-wrap items-start justify-start gap-6 relative">
                            <div className="min-w-full">
                                <p className="font-bold text-lg">Giỏ hàng của bạn</p>
                            </div>
                            <div className="flex-1">
                                {cart?.cartByShop?.length <= 0 ?
                                    <div className={`p-5 bg-white rounded-md mb-5`}>
                                        <div className="flex flex-col items-center justify-center"
                                             style={{backgroundImage: `url()`}}>
                                            <img alt="Your cart is empty"
                                                 className="block w-[400px]"
                                                 src="https://mir-s3-cdn-cf.behance.net/projects/404/54b13147340145.Y3JvcCw0MDUsMzE3LDAsNDI.png"/>
                                            <h5 className="absolute bottom-[100px] font-bold text-base">
                                                Bạn chưa thêm sản phẩm vào giỏ hàng
                                            </h5>
                                        </div>
                                    </div> :
                                    <div>
                                        <FilterCart cartByShop={cart.cartByShop}/>
                                    </div>
                                }
                            </div>
                            <div className="min-w-[300px]">
                                <div className="p-4 bg-white rounded-md sticky top-[50px] right-0">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="font-semibold text-md">Tổng tiền:</p>
                                        <p className="font-bold text-primary-hover text-lg">
                                            {formatCurrency(total || 0)}
                                        </p>
                                    </div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="font-semibold text-md">Giảm:</p>
                                        <p className="font-bold text-primary-hover text-lg">
                                            -{formatCurrency(discount || 0)}
                                        </p>
                                    </div>
                                    <div className="mb-8 flex items-center justify-between">
                                        <p className="font-semibold text-md">Thành tiền:</p>
                                        <p className="font-bold text-primary-hover text-lg">
                                            {formatCurrency(total - discount || 0)}
                                        </p>
                                    </div>
                                    <button onClick={handleOrder}
                                            className="w-full p-2 bg-primary rounded-[5px] font-bold text-white hover:bg-primary-hover">
                                        Mua hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

const FilterCart = ({cartByShop}) => {
    const [filterCart, setFilterCart] = useState([]);

    useEffect(() => {
        console.log(cartByShop)
    }, [cartByShop])

    return (
        <>
            {cartByShop.map((cart, index) => {
                return (
                    <div key={index} className={`p-5 bg-white rounded-md mb-6`}>
                        <div className="flex items-center justify-between pb-5">
                            <div className="flex items-start justify-start gap-3">
                                <Link to={`/cua-hang/${cart.shop.slug}`}
                                      className=" block rounded-full flex items-center justify-center w-[50px] h-[50px] border-2 border-primary p-[2px]">
                                    <img alt="shop"
                                         className="rounded-full"
                                         src={cart.shop.shopLogo || 'https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png'}/>
                                </Link>
                                <div>
                                    <Link to={`/cua-hang/${cart.shop.slug}`}
                                          className="mb-.5 block font-semibold text-base text-black-1 hover:text-primary transition-all">
                                        {cart.shop.shopName}
                                    </Link>
                                    <StarRating rating={cart.shop.ratingInfo?.avgRating || 0}
                                                className="w-[16px] h-[16px]"/>
                                </div>
                            </div>
                            <Link to={`/cua-hang/${cart.shop.slug}`}
                                  className="flex items-center gap-2 text-tiny font-medium">
                                <Icon.UilCommentAltLines className="w-[16px]"/>
                                Chat với Shop
                            </Link>
                        </div>
                        {cart?.items?.map((item, i) => (
                            <CartItem key={i} item={item}/>
                        ))}
                    </div>
                )
            })}
        </>
    );
};


export default Cart;