import {formatCurrency, formatPercent, formatToK} from "../../../util/format";
import * as SolidIcon from "@iconscout/react-unicons-solid";
import * as Icon from "@iconscout/react-unicons";
import Images from "./Images";
import {Link} from "react-router-dom";
import StarRating from "../../../components/common/star-rating/indext";
import {useEffect} from "react";


function Overview(props) {
    const {product, quantity, selectedOptions, setSelectedOptions} = props;

    const handleSelectOption = (option) => {
        setSelectedOptions((prev) => {
            const filter = prev.filter(item => {
                return item.attributeId !== option.attributeId
            })
            return [...filter, option]
        })
    }

    useEffect(() => {

    }, [selectedOptions])

    return (
        <>
            {product &&
                <div className="flex gap-6 bg-white h-auto rounded-md px-6">
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
                            <img
                                src={"https://salt.tikicdn.com/cache/w1080/ts/tka/1e/c3/a2/d7e9419f67148a988f923f4692e94d14.png.webp"}
                                alt={"banner"}
                                className="rounded-md"/>
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
                                {/*<p className="text-3xl font-medium text-primary-hover my-2">*/}
                                {/*    /!*{userCombination && !userCombination.isNotExist ?*!/*/}
                                {/*    /!*    formatCurrency(userCombination.price * (100 - product.discountPercent) / 100) :*!/*/}
                                {/*    /!*    formatCurrency(product.basePrice * (100 - product.discountPercent) / 100)*!/*/}
                                {/*    /!*}*!/*/}
                                {/*</p>*/}
                                {product.discount &&
                                    <div className="">
                                        <p className="text-lg font-medium flex items-center gap-3">
                                            <span className="text-black">
                                                Giá gốc:
                                            </span>
                                            <span className="line-through text-[#808089]">
                                               {/*{selectedOption ? formatCurrency(selectedOption.price) : formatCurrency(product.price)}*/}
                                            </span>
                                        </p>
                                        <div className="flex items-center justify-start gap-5">
                                            <p className="text-3xl font-semibold text-red">
                                                {/*{selectedOption ? formatCurrency(selectedOption.price) : formatCurrency(product.price * (1 - product.discount.percent))}*/}
                                            </p>
                                            <div
                                                className="relative font-bold bg-red text-white px-3 rounded-md text-md">
                                                <p className="absolute left-[-6px] top-[50%] translate-y-[-50%] w-0 h-0 border-t-[8px] border-r-[8px] border-b-[8px] border-t-[transparent] border-r-red border-b-[transparent]"/>
                                                -{formatPercent(product.discount.percent)}
                                            </div>
                                        </div>
                                    </div>
                                }
                                {!product?.discount &&
                                    <div className="flex items-end">
                                        <p className="text-2xl font-semibold text-red">
                                            {formatCurrency(product.price)}
                                            {/*{selectedOption ? formatCurrency(selectedOption.price) : formatCurrency(product.price)}*/}
                                        </p>
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
                                                        <p className="flex items-center justify-center">
                                                            <img src={option.image} alt="option"
                                                                 className="rounded-l-md h-[60px]"/>
                                                            <p className="font-medium text-tiny text-black-1 px-3 py-1.5">
                                                                {option.name}
                                                            </p>
                                                        </p>
                                                    }
                                                    {!option.image &&
                                                        <p className="font-medium text-tiny text-black-1 px-3 py-1.5">
                                                            {option.name}
                                                        </p>
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
                                    <button onClick={() => {
                                    }}
                                            className="hover:bg-[#F3F3F3] rounded-[4px] bg-[#e7e8ea] w-[30px] h-[30px] flex items-center justify-center">
                                        <Icon.UilMinus className="text-center text-[#3f4b53] w-[16px] h-[16px]"/>
                                    </button>
                                    <input value={quantity} type="number"
                                           onChange={(e) => {

                                           }}
                                           className="text-center mx-1 rounded-[4px] border-2 border-border w-[35px] h-[30px] outline-none font-medium text-md"/>
                                    <button onClick={() => {

                                    }}
                                            className="hover:bg-[#F3F3F3] rounded-[4px] bg-[#e7e8ea] w-[30px] h-[30px] flex items-center justify-center">
                                        <Icon.UilPlus className="text-center text-[#3f4b53] w-[16px] h-[16px]"/>
                                    </button>
                                </div>
                                <div className="font-medium text-md ml-5">
                                    {/*{(userOptions.length === options.length && !userCombination?.isNotExist) &&*/}
                                    {/*    `${userCombination.stock} sản phẩm hiện có`*/}
                                    {/*}*/}
                                    {/*{(userOptions.length === options.length && userCombination?.isNotExist) &&*/}
                                    {/*    "Sản phẩm hiện chưa mở bán"*/}
                                    {/*}*/}
                                </div>
                            </div>
                            <div className="mt-5">
                                <p className="font-medium text-tiny rounded-full px-4 py-1 bg-[#e7e8ea] max-w-max">
                                    Vui lòng chọn loại sản phẩm
                                </p>
                            </div>

                            <div className="mt-5 flex items-center flex-row gap-3">
                                <div className="basis-1/2 ">
                                    <button
                                        className="text-base text-[#3f4b53] font-bold hover:bg-[#F3F3F3] rounded-[4px] bg-[#e7e8ea] w-[100%] h-[44px]"
                                        onClick={() => {
                                        }}>
                                        Thêm vào giỏ
                                    </button>
                                </div>
                                <div className="basis-1/2">
                                    <button
                                        className="text-base text-white font-medium hover:bg-primary-hover rounded-[4px] bg-primary w-[100%] h-[44px]">
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
                        <div className="">
                            <div className="flex items-center justify-between gap-5 mb-5">
                                <h5 className="font-medium text-base">Quyền lợi khách hàng & Bảo hành</h5>
                                <Icon.UilInfoCircle className="text-[#6f787e]"/>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center justify-start gap-2">
                                    <Icon.UilShieldCheck className="text-[#018749] w-[24px] h-[24px]"/>
                                    <p className="font-medium text-md">48 giờ hoàn trả</p>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <Icon.UilShieldCheck className="text-[#018749] w-[24px] h-[24px]"/>
                                    <p className="font-medium text-md">Bảo hành khi có lỗi từ Nhà sản xuất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
        ;
}

export default Overview;