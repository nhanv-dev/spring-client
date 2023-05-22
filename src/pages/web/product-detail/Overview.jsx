import {formatCurrency, formatToK} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";
import Images from "./Images";
import StarRating from "../../../components/common/star-rating";
import {useEffect} from "react";
import Tooltip from "@mui/material/Tooltip";


function Overview(props) {
    const {
        product,
        quantity,
        updateQuantity,
        selectedVariant,
        selectedOptions,
        setSelectedOptions,
        handleAddToCart
    } = props;

    const handleSelectOption = (option) => {
        setSelectedOptions((prev) => {
            const filter = prev.filter(item => {
                return item.attributeId !== option.attributeId
            })
            return [...filter, option]
        })
    }

    return (
        <>
            {product && <div className="flex gap-6 bg-white h-auto rounded-md px-6">
                <div className="py-6 w-[450px] h-full">
                    <Images images={product?.images}/>
                    <div className="mb-8 flex items-center gap-2">
                        <p className="font-medium text-md text-black-1">Chia sẻ:</p>
                        <button
                            className="ml-3 rounded-full w-[30px] h-[30px] flex items-center justify-center bg-[#4267B2]">
                            <Icon.UilFacebookMessenger className="w-[18px] h-[18px] text-white"/>
                        </button>
                        <button
                            className="rounded-full w-[30px] h-[30px] flex items-center justify-center bg-[#1DA1F2]">
                            <Icon.UilTwitter className="w-[18px] h-[18px] text-white"/>
                        </button>
                        <button
                            className="rounded-full w-[30px] h-[30px] flex items-center justify-center bg-[#898F9C]">
                            <Icon.UilLinkAlt className="w-[18px] h-[18px] text-white"/>
                        </button>
                    </div>
                    <div>
                        <img alt={"banner"} className="rounded-md"
                             src={"https://salt.tikicdn.com/cache/w1080/ts/tka/1e/c3/a2/d7e9419f67148a988f923f4692e94d14.png.webp"}/>
                    </div>
                </div>
                <div className="w-[1px] min-h-full bg-border"/>
                <div className="py-6 flex-1">
                    <div className="border-b border-border mb-5">
                        <h1 className="mb-2 font-medium text-2xl">{product.name}</h1>
                        <div className="flex items-center justify-between gap-5 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-0.5">
                                    <StarRating rating={product?.ratingInfo?.avgRating || 0}
                                                className="w-3.5 h-3.5"/>
                                    <p className="pl-2 text-[#787878] text-tiny font-medium leading-5">
                                        (Xem {formatToK(product?.ratingInfo?.totalRating || 0)} đánh giá)
                                    </p>
                                </div>
                                <div className="min-h-[14px] w-[2px] bg-[#787878] opacity-60"></div>
                                <p className="text-[#787878] text-tiny font-medium leading-5">
                                    Đã bán {formatToK(product.orderCount || 0)}
                                </p>
                            </div>
                            <button
                                className="flex items-center gap-1 font-medium text-md text-black-1 transition-all hover:text-primary-hover">
                                <Icon.UilInfoCircle className="w-[18px] h-[18px]"/>
                                Tố cáo
                            </button>
                        </div>
                        <div className="p-5 pt-3 rounded-md bg-[#FAFAFA] mb-5">
                            {selectedVariant &&
                                <div>
                                    {selectedVariant.deal.discountPercent > 0 ?
                                        <div>
                                            <p className="mb-1 text-[#778899] text-lg font-semibold opacity-80">
                                                <span className="line-through">
                                                    {formatCurrency(selectedVariant.deal.price)}
                                                </span>
                                            </p>
                                            <div className="flex items-center justify-start gap-5">
                                                <p className="text-2xl font-extrabold text-red">
                                                    {formatCurrency(selectedVariant.deal.finalPrice)}
                                                </p>
                                                <div
                                                    className="mt-1 relative font-bold bg-red text-white px-3 rounded-md text-tiny">
                                                    <p className="absolute left-[-6px] top-[50%] translate-y-[-50%] w-0 h-0 border-t-[8px] border-r-[8px] border-b-[8px] border-t-[transparent] border-r-red border-b-[transparent]"/>
                                                    -{selectedVariant.deal.discountPercent}%
                                                </div>
                                            </div>
                                        </div> :
                                        <p className="text-2xl font-extrabold text-red">
                                            {formatCurrency(selectedVariant.deal.finalPrice)}
                                        </p>
                                    }
                                </div>
                            }
                            {!selectedVariant &&
                                <div>
                                    {product.deal.discountPercent > 0 ?
                                        <div>
                                            <p className="mb-1 text-[#778899] text-lg font-semibold opacity-80">
                                                <span className="line-through">
                                                    {formatCurrency(product.deal.price)}
                                                </span>
                                            </p>
                                            <div className="flex items-center justify-start gap-5">
                                                <p className="text-2xl font-extrabold text-red">
                                                    {formatCurrency(product.deal.finalPrice)}
                                                </p>
                                                <div
                                                    className="mt-1 relative font-bold bg-red text-white px-3 rounded-md text-tiny">
                                                    <p className="absolute left-[-6px] top-[50%] translate-y-[-50%] w-0 h-0 border-t-[8px] border-r-[8px] border-b-[8px] border-t-[transparent] border-r-red border-b-[transparent]"/>
                                                    -{product.deal.discountPercent}%
                                                </div>
                                            </div>
                                        </div> :
                                        <p className="text-2xl font-extrabold text-red">
                                            {formatCurrency(product.deal.finalPrice)}
                                        </p>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    {product?.attributes?.map(attribute => {
                        return (
                            <div key={attribute.id} className="flex items-center flex-row mb-5">
                                <div className="basis-1/4">
                                    <p className="font-medium text-[#6f787e] text-md">
                                        {attribute.name}:
                                    </p>
                                </div>
                                <div className="flex-1 flex items-center gap-2.5 flex-wrap">
                                    {attribute?.options?.map(option => {
                                        const isActive = selectedOptions?.filter(selected => selected.id === option.id).length > 0;
                                        return (
                                            <button key={option.id}
                                                    onClick={() => {
                                                        handleSelectOption(option)
                                                    }}
                                                    className={`${isActive ? 'bg-[#E5F2FF] border-[#0d5cb6]' : 'border-border border-border'} outline-none relative group hover:bg-[#E5F2FF] hover:border-[#0d5cb6] border-2 min-w-[50px] transition-all rounded-md`}>
                                                {option.image &&
                                                    <span className="flex items-center justify-center">
                                                        <img src={option.image} alt="option"
                                                             className="rounded-l-md h-[60px]"/>
                                                        <span
                                                            className="block font-medium text-tiny text-black-1 px-3 py-1.5">
                                                            {option.name}
                                                        </span>
                                                    </span>
                                                }
                                                {!option.image &&
                                                    <p className="font-medium text-tiny text-black-1 px-3 py-1.5">{option.name}</p>
                                                }
                                                <img alt="check"
                                                     src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/selected-variant-indicator.svg"
                                                     className={`${isActive ? 'visible opacity-100' : 'invisible opacity-0'} group-hover:visible group-hover:opacity-100 transition-all absolute top-[-1px] right-[-1px]`}/>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className="mb-5 pb-5 border-b border-border">
                        <div className="flex items-center flex-row">
                            <div className="basis-1/4">
                                <p className="font-medium text-[#6f787e] text-md">Chọn số lượng:</p>
                            </div>
                            <div className="min-w-max flex items-center">
                                <button onClick={() => updateQuantity(quantity - 1)}
                                        className="hover:bg-[#F3F3F3] rounded-md bg-[#e7e8ea] w-[30px] h-[30px] flex items-center justify-center">
                                    <Icon.UilMinus className="text-center text-[#3f4b53] w-[16px] h-[16px]"/>
                                </button>
                                <input value={quantity} type="number"
                                       onChange={(e) => updateQuantity(e.target.value)}
                                       className="text-center mx-1 rounded-md border-2 border-border w-[35px] h-[30px] outline-none font-medium text-md"/>
                                <button onClick={() => updateQuantity(quantity + 1)}
                                        className="hover:bg-[#F3F3F3] rounded-md bg-[#e7e8ea] w-[30px] h-[30px] flex items-center justify-center">
                                    <Icon.UilPlus className="text-center text-[#3f4b53] w-[16px] h-[16px]"/>
                                </button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-tiny rounded-full px-4 py-1 bg-[#e7e8ea] max-w-max">
                                {product?.variants?.length > 0 ?
                                    <>
                                        {selectedVariant ? `Hiện có ${selectedVariant.quantity} sản phẩm` : 'Vui lòng chọn loại sản phẩm'}
                                    </> :
                                    <>
                                        Hiện có {product.quantity} sản phẩm
                                    </>
                                }
                            </p>
                        </div>

                        <div className="mt-5 flex items-center flex-row gap-3">
                            <div className="basis-1/2 ">
                                <button
                                    className="text-base text-[#3f4b53] font-bold hover:bg-[#F3F3F3] rounded-md bg-[#e7e8ea] w-[100%] h-[44px]"
                                    onClick={() => handleAddToCart()}>
                                    Thêm vào giỏ
                                </button>
                            </div>
                            <div className="basis-1/2">
                                <button
                                    className="text-base text-white font-medium hover:bg-primary-hover rounded-md bg-primary w-[100%] h-[44px]">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 pb-5 border-b border-border">
                        <div className="flex items-center justify-between gap-5 mb-5">
                            <h5 className="font-medium text-base">Tùy chọn giao hàng</h5>
                            <Icon.UilInfoCircle className="text-[#6f787e]"/>
                        </div>
                        <div className="flex items-center gap-5">
                            <div
                                className="rounded-[12px] px-3 py-2 border border-[#eeeeee] max-w-max min-w-[260px]">
                                <div className="mb-0.5 flex items-center justify-start gap-2.5">
                                    <img alt="shipping" className="w-[32px]"
                                         src="https://salt.tikicdn.com/ts/upload/85/45/34/2fc25c6a660d84a41a6bf9276ce160ba.png"/>
                                    <p className="text-tiny font-semibold text-[#00ab56]">Trước 16:00 hôm nay</p>
                                </div>
                                <p className="mb-0.5 text-sm font-medium">Vận chuyển: 25.000đ</p>
                                <div
                                    className="flex items-center justify-start gap-2.5 bg-[#f2f0fe] rounded-md text-[#402da1] p-1 max-w-max">
                                    <img alt="shipping" className="w-[13px]"
                                         src="https://salt.tikicdn.com/ts/upload/df/e2/b4/063c4d55ca380f818547f00f5175d39f.png"/>
                                    <p className="text-sm font-medium">Freeship 100% với {formatCurrency(85999)}</p>
                                </div>
                            </div>
                            <div
                                className="rounded-[12px] px-3 py-2 border border-[#eeeeee] max-w-max min-w-[260px]">
                                <div className="mb-0.5 flex items-center justify-start gap-2.5">
                                    <img alt="shipping" className="w-[32px]"
                                         src="https://salt.tikicdn.com/ts/upload/67/e4/c2/02b5400b39bb3371e06d33c1e9f4d854.png"/>
                                    <p className="text-tiny font-semibold text-[#00ab56]">Ngày mai, trước 23:00</p>
                                </div>
                                <p className="mb-0.5 text-sm font-medium">Vận chuyển: 14.000đ</p>
                                <div
                                    className="flex items-center justify-start gap-2.5 bg-[#f2f0fe] rounded-md text-[#402da1] p-1 max-w-max">
                                    <img alt="shipping" className="w-[13px]"
                                         src="https://salt.tikicdn.com/ts/upload/df/e2/b4/063c4d55ca380f818547f00f5175d39f.png"/>
                                    <p className="text-sm font-medium">Freeship 100% với {formatCurrency(48999)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(product.returnPolicies && product.returnPolicies.length > 0) &&
                        <div>
                            <div className="flex items-center justify-between gap-5 mb-5">
                                <h5 className="font-medium text-base">Quyền lợi khách hàng & Bảo hành</h5>
                                <Icon.UilInfoCircle className="text-[#6f787e]"/>
                            </div>
                            <div className="flex items-center gap-6 flex-wrap">
                                {product.returnPolicies.map(policy => (
                                    <Tooltip title={policy.title} followCursor key={policy.id}>
                                        <div className="flex items-center justify-start gap-2">
                                            <Icon.UilShieldCheck className="text-[#018749] w-[24px] h-[24px]"/>
                                            <p className="font-medium text-md">{policy.title}</p>
                                        </div>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
            }
        </>
    );
}

export default Overview;