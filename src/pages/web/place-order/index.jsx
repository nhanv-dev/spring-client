import {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import Layout from "../../../components/web/layout";
import {Link, useNavigate} from "react-router-dom";
import {protectedRequest} from "../../../util/request-method";
import {useDispatch, useSelector} from "react-redux";
import {formatCurrency} from "../../../util/format";
import NotFoundImage from "../../../assets/images/image-not-found.jpg";
import * as Icon from '@iconscout/react-unicons';
import {Radio} from "@mui/material";
import {placeOrder} from "../../../redux/actions/orderActions";
import ToastCustom from "../../../components/common/toast-custom";
import {toast} from "react-hot-toast";
import * as types from "../../../redux/constants/ActionType";

function PlaceOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, cart} = useSelector(state => state);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [note, setNote] = useState("");
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [shippingMethod, setShippingMethod] = useState("now");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (!isSending && cart.items.filter(item => item.checked).length <= 0) navigate("/gio-hang")
    }, [cart.items, isSending, navigate])

    useEffect(() => {
        let items = cart.items.filter(item => item.checked);
        let total = 0, finalTotal = 0;
        let list = [];
        items.forEach(item => {
            if (item.variant) {
                total += item.variant.deal.price * item.quantity;
                finalTotal += item.variant.deal.finalPrice * item.quantity;
            } else {
                total += item.product.deal.price * item.quantity;
                finalTotal += item.product.deal.finalPrice * item.quantity;
            }
            const shop = item.product.shop;
            const index = list.findIndex(item => item.shop?.id === shop.id);
            if (index !== -1) {
                list[index].items = [...list[index].items, item];
            } else {
                list = [...list, {shop, items: [item]}];
            }
        })
        setTotal(total);
        setFinalTotal(finalTotal);
        setList(list);
    }, [cart])

    const handlePlaceOrder = async () => {
        if (!address) {
            return toast.error("Bạn chưa chọn địa chỉ nhận hàng");
        }
        setIsSending(true);
        const action = await placeOrder({
            list, note, address, userId: user.id
        });
        if (action.type === types.order.PLACE_ORDER_FAILED) {
            setIsSending(false)
            return toast.error("Đặt hàng thất bại. Vui lòng thử lại sau.")
        } else {
            dispatch(action)
            navigate("/dat-hang-thanh-cong")
        }
    }

    return (
        <Helmet title={"Depot - Đặt hàng"}>
            <Layout>
                <div className="bg-app-1">
                    <div className="container py-8">
                        <ToastCustom/>
                        <div className="flex flex-wrap flex-row gap-6">
                            <div className="basis-[65%]">
                                <Information user={user} address={address} setAddress={setAddress}
                                             paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                                             shippingMethod={shippingMethod} setShippingMethod={setShippingMethod}
                                />
                            </div>
                            <div className="flex-1 flex flex-wrap flex-col gap-6">
                                <div className="rounded-md shadow-md bg-white">
                                    <div
                                        className="flex items-center justify-between px-5 pt-3.5 pb-3 rounded-t-md border-b border-border-1 ">
                                        <div className="flex items-center gap-2">
                                            <Icon.UilClipboardAlt className="w-[20px] h-[20px] text-primary"/>
                                            <h5 className="text-md font-bold text-primary">Thông tin đơn hàng</h5>
                                        </div>
                                    </div>
                                    <div className="px-5 border-b border-border-1">
                                        {list.map((order, index) => (
                                            <div key={order.shop.id}
                                                 className={`${index < list.length - 1 && 'border-b'}  border-border-1 py-5`}>
                                                <Link to={`/cua-hang/${order.shop?.slug}`}
                                                      className="max-w-max flex items-center gap-2 font-semibold text-md transition-all text-black hover:text-primary">
                                                    <Icon.UilStore className="w-[20px] h-[20px]"/>
                                                    <p className="line-clamp-1">{order.shop?.shopName}</p>
                                                </Link>
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex gap-3 pt-4">
                                                        <Link to={`/san-pham/${item.product.slug}`}
                                                              className="block min-w-[65px] max-w-[65px] min-h-[65px] max-h-[65px] overflow-hidden rounded-md border border-border-1">
                                                            <img alt={""} className="w-full h-auto rounded-md"
                                                                 src={item.product?.images?.length > 0 ? item.product.images[0].url : NotFoundImage}/>
                                                        </Link>
                                                        <div className="w-full">
                                                            <div className="mb-2">
                                                                <Link to={`/san-pham/${item.product.slug}`}
                                                                      className="text-tiny font-medium line-clamp-1 mb-1 transition-all hover:text-primary-hover">
                                                                    {item.product.name}
                                                                </Link>

                                                            </div>
                                                            <div
                                                                className="flex justify-between items-center gap-3 w-full">
                                                                {item.variant &&
                                                                    <p className="px-5 font-bold text-sm bg-primary-bg rounded-full text-primary min-w-max max-w-max">
                                                                        <span
                                                                            className="relative top-[1px] select-none">
                                                                            {item.variant.attributeHash}
                                                                        </span>
                                                                    </p>
                                                                }
                                                                <div className="flex items-center gap-3 justify-end">
                                                                    {item.variant ?
                                                                        <p className="text-base text-danger font-bold">
                                                                            {formatCurrency(item.variant.deal.finalPrice)}
                                                                        </p> :
                                                                        <p className="text-base text-primary font-bold">
                                                                            {formatCurrency(item.product.deal.finalPrice)}
                                                                        </p>
                                                                    }
                                                                    <p className="text-primary font-bold text-base">x{item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-5">
                                        <div className="relative">
                                            <p className="absolute top-[-10px] left-2 bg-white text-tiny font-semibold text-black-1 px-1">
                                                Ghi chú cho cửa hàng
                                            </p>
                                            <textarea rows="4"
                                                      value={note} onChange={(e) => setNote(e.target.value)}
                                                      style={{resize: 'none'}}
                                                      className="block p-3 w-full text-md rounded-md border border-border-1 focus:outline-none font-medium text-black-1"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md shadow-md bg-white">
                                    <div className="p-5">
                                        <div className="flex justify-between items-center pb-3">
                                            <p className="font-bold text-md">Tiền hàng</p>
                                            <p className="text-lg font-bold text-black">
                                                {formatCurrency(total)}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center pb-3">
                                            <p className="font-bold text-md">Giảm giá</p>
                                            <p className="text-lg font-bold text-red">
                                                - {formatCurrency(total - finalTotal)}
                                            </p>
                                        </div>
                                        <div
                                            className="flex justify-between items-center border-b pb-3 border-border-1">
                                            <p className="font-bold text-md">Vận chuyển</p>
                                            <p className="text-lg font-bold text-black">
                                                {formatCurrency(0)}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <p className="font-bold text-base">Tổng thanh toán</p>
                                            <p className="font-bold text-xl text-red">
                                                {formatCurrency(finalTotal)}
                                            </p>
                                        </div>
                                        <button onClick={handlePlaceOrder}
                                                className="rounded-md px-8 py-2 font-bold w-full bg-primary text-white hover:bg-primary hover:text-white active:bg-primary transition duration-400 cursor-pointer">
                                            Đặt mua
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

const Information = (props) => {
    const {
        user,
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        shippingMethod,
        setShippingMethod
    } = props
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        protectedRequest().get(`/users/${user.id}/addresses`)
            .then(res => {
                if (res.data.message === 'User address is empty')
                    setAddresses([])
                else {
                    const defaultAddress = res.data.filter(a => a.isDefault);
                    if (defaultAddress.length > 0) setAddress(defaultAddress[0])
                    setAddresses(res.data)
                }
            })
            .catch(err => {
                if (err.status === 403) navigate("/dang-nhap")
                setAddresses([])
            })
    }, [user])

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-md shadow-md bg-white">
                <div
                    className="flex items-center justify-between px-5 pt-3.5 pb-3 rounded-t-md border-b border-border-1 ">
                    <div className="flex items-center gap-2">
                        <Icon.UilMapMarker className="w-[20px] h-[20px] text-primary"/>
                        <h5 className="text-md font-bold text-primary">Địa chỉ nhận hàng</h5>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                        <Link to='/nguoi-dung/dia-chi' className="font-semibold text-md">
                            Thay đổi
                        </Link>
                        <Icon.UilAngleRight className="w-[20px] h-[20px]"/>
                    </div>
                </div>
                <div className="px-5">
                    {addresses.length <= 0 &&
                        <div className="text-center font-bold text-base py-10 text-black-1">
                            Chưa thêm địa chỉ nhận hàng
                        </div>
                    }
                    {addresses.map((item, index) => (
                        <div key={index}
                             className={`${index < addresses.length - 1 && 'border-b border-border-1'} py-5 flex gap-6 items-center`}>
                            <div>
                                <input type="radio" id={`address-${index}`} name="address"
                                       checked={address ? address?.id === item.id : item.isDefault}
                                       onChange={(e) => {
                                           if (e.target.checked) setAddress(item)
                                       }}
                                       className="w-4 h-4 accent-primary"/>
                            </div>
                            <label className="flex-1" htmlFor={`address-${index}`}>
                                <p className="font-medium text-black-1 flex items-center gap-3">
                                    <span className="text-md font-semibold">
                                        Người nhận: {item.customerName}
                                    </span>
                                    <span className="font-medium text-tiny text-[#A5B4BE]">|</span>
                                    <span className="text-tiny flex items-center gap-2">
                                        <Icon.UilPhoneVolume className="w-[16px] h-[16px]"/>
                                        {item.phoneNumber}
                                    </span>
                                    {item.email &&
                                        <>
                                            <span className="font-medium text-md text-[#A5B4BE]">|</span>
                                            <span className="text-tiny flex items-center gap-2">
                                                <Icon.UilEnvelopeCheck className="w-[16px] h-[16px]"/>
                                                {item.email}
                                            </span>
                                        </>
                                    }
                                </p>
                                <p className="flex items-center gap-1 font-medium text-md text-black-1 mt-1.5">
                                    <Icon.UilMapMarker className="w-[20px] h-[20px]"/>
                                    {item.addressDetail}, {item.wards}, {item.district}, {item.city}
                                </p>
                                {item.isDefault &&
                                    <p className="text-sm font-bold uppercase text-[#F66E23] mt-2">
                                        Địa chỉ mặc định
                                    </p>
                                }
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-md shadow-md bg-white">
                <div
                    className="flex items-center justify-between px-5 pt-3.5 pb-3 rounded-t-md border-b border-border-1">
                    <div className="flex items-center gap-2">
                        <Icon.UilTruck className="w-[20px] h-[20px] text-primary"/>
                        <h5 className="text-md font-bold text-primary">Phương thức giao hàng</h5>
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setShippingMethod("now")}
                                className={`${shippingMethod === "now" ? "border-primary" : "border-border-1"} block text-left rounded-lg p-2.5 border-2 max-w-max min-w-[260px]`}>
                            <div className="mb-0.5 flex items-center justify-start gap-2">
                                <img alt="shipping" className="w-[32px]"
                                     src="https://salt.tikicdn.com/ts/upload/85/45/34/2fc25c6a660d84a41a6bf9276ce160ba.png"/>
                                <p className="text-md font-semibold text-success">Trước 16:00 hôm nay</p>
                            </div>
                            <p className="mb-1 text-tiny font-medium text-secondary">Vận chuyển: 25.000đ</p>
                            <div
                                className="flex items-center justify-start gap-2 bg-primary-bg rounded-md text-primary py-1 px-3 max-w-max">
                                <img alt="shipping" className="h-[18px]"
                                     src="https://salt.tikicdn.com/ts/upload/df/e2/b4/063c4d55ca380f818547f00f5175d39f.png"/>
                                <p className="relative top-[1px] text-sm font-semibold">Freeship 100%
                                    với {formatCurrency(85999)}</p>
                            </div>
                        </button>
                        <button onClick={() => setShippingMethod("fast")}
                                className={`${shippingMethod === "fast" ? "border-primary" : "border-border-1"} block text-left rounded-lg p-2.5 border-2 max-w-max min-w-[260px]`}>
                            <div className="mb-0.5 flex items-center justify-start gap-2">
                                <img alt="shipping" className="w-[32px]"
                                     src="https://salt.tikicdn.com/ts/upload/67/e4/c2/02b5400b39bb3371e06d33c1e9f4d854.png"/>
                                <p className="text-md font-semibold text-success">Ngày mai, trước 23:00</p>
                            </div>
                            <p className="mb-1 text-tiny font-medium text-secondary">Vận chuyển: 14.000đ</p>
                            <div
                                className="flex items-center justify-start gap-2 bg-primary-bg rounded-md text-primary py-1 px-3 max-w-max">
                                <img alt="shipping" className="h-[18px]"
                                     src="https://salt.tikicdn.com/ts/upload/df/e2/b4/063c4d55ca380f818547f00f5175d39f.png"/>
                                <p className="relative top-[1px] text-sm font-semibold">Freeship 100%
                                    với {formatCurrency(48999)}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="rounded-md shadow-md bg-white">
                <div
                    className="flex items-center justify-between px-5 pt-3.5 pb-3 rounded-t-md border-b border-border-1">
                    <div className="flex items-center gap-2">
                        <Icon.UilWallet className="w-[20px] h-[20px] text-primary"/>
                        <h5 className="text-md font-bold text-primary">Phương thức thanh toán</h5>
                    </div>
                </div>
                <div className="p-5">
                    <fieldset id="paymentMethod">
                        <label htmlFor="radio4"
                               className={`flex gap-2 items-center py-2.5 px-1.5 rounded-md transition-all duration-400 ${paymentMethod !== 'cod' ? 'bg-secondary-bg' : 'bg-white shadow-md'}`}>
                            <Radio
                                id="radio4"
                                size={"small"}
                                checked={paymentMethod === 'cod'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                value="cod"
                                name="paymentMethod"
                            />
                            <div>
                                <p className="font-semibold text-md text-black-1">Tiền mặt (COD)</p>
                                <p className="text-sm font-semibold text-black-2">Phí thu hộ: Miễn phí</p>
                            </div>
                        </label>
                        <label htmlFor="radio5"
                               className={`mt-6 flex gap-2 items-center py-2.5 px-1.5 rounded-md transition-all duration-400 ${paymentMethod !== 'depot' ? 'bg-secondary-bg' : 'bg-white shadow-md'}`}>
                            <Radio
                                id="radio5"
                                size={"small"}
                                checked={paymentMethod === 'depot'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                value="depot"
                                name="paymentMethod"
                            />
                            <div>
                                <p className="font-semibold text-md text-black-1">Ví DepotPay</p>
                                <p className="text-sm font-semibold text-black-2">
                                    Số dư trong ví DepotPay phải có ít nhất 1.000đ để thanh toán
                                </p>
                            </div>
                        </label>
                    </fieldset>
                    <div className="mt-8 text-center">
                        <button type={"button"}
                                className="rounded-md w-[40%] px-4 py-3 text-md font-bold bg-secondary-bg text-black transition-all">
                            Thêm phương thức khác
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder;