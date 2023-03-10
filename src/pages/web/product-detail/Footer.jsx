import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {formatCurrency} from "../../../util/format";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";

function Footer({product}) {
    const cart = useSelector(state => state.cart);
    const [scrollTop, setScrollTop] = useState(0);
    const [combinations, setCombinations] = useState([]);
    const [total, setTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);

    // useEffect(() => {
    //     if (!product || !cart.items) return;
    //     setCombinations(cart.items?.filter(item => (item.product._id === product._id)) || [])
    //     console.log(cart.items?.filter(item => (item.product._id === product._id)))
    // }, [product, cart])
    //
    // useEffect(() => {
    //     let total = 0;
    //     let discountTotal = 0;
    //     combinations.forEach(item => {
    //         total += item.combination.price * item.quantity
    //         discountTotal += (item.combination.price * item.quantity) * (100 - item.product.discountPercent) / 100
    //     })
    //     setTotal(total);
    //     setDiscountTotal(discountTotal);
    // }, [combinations])

    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop])

    return (
        <>
            {product &&
                <div
                    className={`bg-white fixed bottom-[0] py-2 z-50 left-0 right-0 overflow-hidden ${scrollTop >= 100 ? '' : 'hidden'}`}
                    style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                    <div className="container relative flex items-center justify-between gap-6">
                        <div className="flex items-center gap-8">
                            <div className="flex items-start min-w-[400px] justify-start gap-3">
                                <div style={{backgroundImage: `url(${product.images[0].url})`}}
                                     className="border-[1px] min-w-[65px] min-h-[65px] overflow-hidden rounded-[5px] border-[#e7e8ea] bg-origin-content bg-center bg-cover bg-no-repeat">
                                </div>
                                <div className="mt-2">
                                    <p className="text-ellipsis font-medium line-clamp-2 overflow-hidden text-tiny">
                                        {product.name}
                                    </p>
                                    <div
                                        className="relative mt-1 flex items-center justify-start gap-1.5 overflow-hidden max-w-[400px]">
                                        {combinations.map(item => (
                                            <p key={item.combination.combinationString}
                                               className="min-w-max text-[12px] font-medium rounded-full bg-primary-hover text-white px-2 py-0.5">
                                                ({item.combination.combinationString}) x {item.quantity}
                                            </p>
                                        ))}
                                        <div
                                            className="absolute bg-gradient-to-r from-[#ECE9E92D] to-[#fff] absolute z-50 w-4/12 h-full right-0"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-primary font-bold text-lg">{formatCurrency(discountTotal)}</p>
                                <p className="text-[#9e9e9e] font-bold text-base line-through">{formatCurrency(total)}</p>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-start gap-2">
                            <Link to={`/cua-hang/${product?.shop?.slug}/san-pham`}
                                className="flex items-center justify-center min-w-max rounded-[5px] w-[40px] h-[40px] p-3  bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea] ">
                                <Icon.UilStore className="w-[20px] h-[20px] text-[#3f4b53]"/>
                            </Link>
                            <Link to="/gio-hang"
                                  className="flex items-center justify-center min-w-max rounded-[5px] w-[40px] h-[40px] p-3 bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea] ">
                                <Icon.UilShoppingBag className="w-[20px] h-[20px] text-[#3f4b53]"/>
                            </Link>
                            <button
                                className="flex rounded-[5px] items-center justify-center flex-1 px-4 h-[40px] min-w-[400px] bg-primary text-white hover:bg-primary-hover active:bg-primary ">
                                <span className="font-bold text-md">Mua ngay</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Footer;