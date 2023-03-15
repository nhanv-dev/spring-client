import {useState, useEffect} from 'react';
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import CartItem from "./CartItem";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons"
import {formatCurrency} from "../../../util/format";
import {useSelector} from "react-redux";
// import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let total = 0, discount = 0
        cart.items?.forEach(item => {
            if (item.combination && item.checked) {
                total += item.combination.price * item.quantity
                discount += (item.combination.price * item.quantity * item.product.discountPercent) / 100
            }
        })
        setTotal(total);
        setDiscount(discount);
    }, [cart])

    const handleOrder = () => {
        const items = cart.items.filter(item => (item.checked))
        // if (items.length <= 0) return toast.error("Bạn chưa chọn sản phẩm muốn mua")
        navigate("/thanh-toan")
    }

    return (
        <Helmet title="Depot - Giỏ hàng">
            <Layout>
                <div className="container py-8">
                    {/*<ToastContainer/>*/}
                    <div className="flex flex-wrap items-start justify-start gap-5 relative">
                        <div className="min-w-full">
                            <p className="font-bold text-lg">Giỏ hàng của bạn</p>
                        </div>
                        <div className="flex-1">
                            {cart?.items?.length <= 0 ?
                                <div className={`p-4 bg-white rounded-[8px] mb-5`}>
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
                                <div></div>
                                // <FilterCart cart={cart}/>
                            }
                        </div>
                        <div className="min-w-[300px]">
                            <div className="p-4 bg-white rounded-[8px] sticky top-[50px] right-0">
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
            </Layout>
        </Helmet>
    );
}

const FilterCart = ({cart}) => {
    const [filterCart, setFilterCart] = useState([]);

    useEffect(() => {
        // const array = [];
        // cart?.items?.forEach(item => {
        //     if (array.filter(obj => obj?.shop?._id === item.shop?._id).length > 0) {
        //         array.forEach(obj => obj?.shop?._id === item.shop?._id && obj.items.push({...item}))
        //     } else {
        //         array.push({shop: {...item?.shop}, items: [{...item}]})
        //     }
        // })
        // setFilterCart(array)
    }, [cart])

    return (
        <div>
            {filterCart.map((cart, index) => {
                return (
                    <div key={index}
                         className={`p-4 bg-white rounded-[8px] mb-5`}>
                        <div className="flex items-center justify-between pb-5">
                            <Link to={`/cua-hang/${cart.shop.slug}`}
                                  className="flex items-center gap-3 font-medium text-md">
                                <div style={{backgroundImage: `url(${cart.shop.avatar})`}}
                                     className="bg-cover bg-center min-w-[40px] min-h-[40px] border-2 border-primary rounded-full"/>
                                {cart.shop.name}
                            </Link>
                            <Link to={`/cua-hang/${cart.shop._id}`}
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
        </div>
    );
};


export default Cart;