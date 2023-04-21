import {memo} from "react";
import {Link} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import {formatCurrency} from "../../../util/format";
import NotFoundImage from "../../../assets/images/image-not-found.jpg";
import {removeFromCart, selectCartItem, unSelectCartItem, updateQuantity} from "../../../redux/actions/cartActions";
import {useDispatch} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import * as types from "../../../redux/constants/ActionType";
import toast from "react-hot-toast";

function CartItem({item}) {
    const dispatch = useDispatch();
    const handleDelete = async (item) => {
        const action = await removeFromCart(item);
        dispatch(action)
        if (action.type === types.cart.REMOVE_CART_ITEM) {
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng.")
        } else {
            toast.error("Vui lòng thử lại sau.")
        }
    }
    const handleUpdateQuantity = async (quantity) => {
        if (quantity <= 0) quantity = 1;
        const action = await updateQuantity({item, quantity});
        dispatch(action);
    }
    const handleCheck = async (e) => {
        e.preventDefault();
        if (e.target.checked) dispatch(await selectCartItem(item))
        else dispatch(await unSelectCartItem(item))
    }

    return (
        <div className="flex items-center gap-6 pt-5 max-w-full justify-between">
            <div className="h-[80px] flex items-center">
                <Checkbox size="small" tabIndex="-1"
                          onChange={handleCheck} checked={item.checked || false}/>
            </div>
            <div className="flex-1 min-w-[350px] flex items-start gap-4">
                <div
                    style={{backgroundImage: `url(${item.product?.images?.length > 0 ? item.product?.images[0].url : NotFoundImage})`}}
                    className="bg-cover bg-center min-w-[70px] min-h-[70px] w-[70px] h-[70px] rounded-md"/>
                <div className="flex-1 h-[70px]">
                    <Link to={`/san-pham/${item.product.slug}`}
                          className="line-clamp-2 text-tiny font-medium text-black-1 hover:text-primary transition-all">
                        {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                        {item.variant &&
                            <p className="py-[2px] px-[12px] w-max text-[12px] font-bold bg-[#e2e6f2] border-[#7182c0] text-[#133096] rounded-[16px]">
                                {item.variant.options.map(o => o.name).join(" + ")}
                            </p>
                        }
                        <p className="py-[2px] px-[12px] w-max text-[12px] font-bold bg-[#e2e6f2] border-[#7182c0] text-[#133096] rounded-[16px]">
                            Mua trước trả sau
                        </p>
                    </div>
                </div>
            </div>
            <div className="min-w-[100px] flex flex-col justify-center items-end">
                {item.variant ?
                    <>
                        <p className="line-clamp-1 font-bold text-base text-primary">
                            {formatCurrency(item.variant.deal.finalPrice)}
                        </p>
                        <p className="line-clamp-1 font-bold text-tiny text-gray line-through">
                            {formatCurrency(item.variant.deal.price)}
                        </p>
                    </> :
                    <>
                        <p className="line-clamp-1 font-bold text-base text-primary">
                            {formatCurrency(item.product.deal.finalPrice)}
                        </p>
                        <p className="line-clamp-1 font-bold text-tiny text-gray line-through">
                            {formatCurrency(item.product.deal.price)}
                        </p>
                    </>
                }

            </div>
            <div className="flex items-center justify-center gap-1 py-1 px-2.5 bg-secondary-bg rounded-md h-max">
                <button onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        className="flex items-center justify-center">
                    <Icon.UilMinus className="text-center w-[14px] h-[14px]"/>
                </button>
                <input value={item.quantity} type="number"
                       onChange={(e) => handleUpdateQuantity(e.target.value)}
                       className="text-center bg-secondary-bg w-[35px] outline-none text-tiny font-semibold text-black"/>
                <button onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        className="flex items-center justify-center">
                    <Icon.UilPlus className="text-center w-[14px] h-[14px]"/>
                </button>
            </div>
            <div className="min-w-[100px] flex justify-center">
                <p className="line-clamp-1 font-semibold text-base text-primary">
                    {item.variant ?
                        <> {formatCurrency(item.variant.deal.finalPrice * item.quantity)}</> :
                        <> {formatCurrency(item.product.deal.finalPrice * item.quantity)}</>
                    }
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <button
                    className="text-secondary hover:bg-secondary-bg rounded-md w-[30px] h-[30px] flex items-center justify-center transition-all">
                    <Icon.UilHeart className="w-[20px] h-[20px]"/>
                </button>
                <button
                    className="text-danger hover:bg-danger-bg rounded-md w-[30px] h-[30px] flex items-center justify-center transition-all"
                    onClick={() => handleDelete(item)}>
                    <Icon.UilTrashAlt className="w-[20px] h-[20px]"/>
                </button>
            </div>

        </div>
    );
}

export default CartItem;