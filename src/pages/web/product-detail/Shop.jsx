import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import * as SolidIcon from '@iconscout/react-unicons-solid';
import * as Icon from '@iconscout/react-unicons';
import DefaultShopImage from '../../../assets/images/default-shop.png';
import {formatBetweenDate, formatToK} from "../../../util/format";
import {publicRequest} from "../../../util/request-method";
import MinimalProductCard from "../../../components/web/minimal-product-card";

function Shop({shop}) {
    const [products, setProducts] = useState([])
    const slideRef = useRef(null);

    useEffect(() => {
        fetch(shop.avatar).then((resp) => {
            if (resp.status !== 200) shop.avatar = DefaultShopImage;
        })
    }, [shop])

    useEffect(() => {
        if (!shop) return;
        publicRequest().get(`/products/shops/${shop.id}/top/10`)
            .then(res => {
                setProducts([...res.data.content])
            })
    }, [shop])
    const scroll = (scrollOffset) => {
        slideRef.current.scrollLeft += scrollOffset;
    }

    return (
        <div className="w-[500px] bg-white p-6 sticky top-6 h-full rounded-md">
            <div className="flex gap-4 items-start justify-start">
                <div className="relative">
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="block w-[70px] h-[70px] overflow-hidden relative rounded-full bg-cover bg-center border-[3px] border-primary">
                        <img src={shop.shopLogo || DefaultShopImage} className="rounded-full w-full" alt={""}/>
                    </Link>
                    <p className="absolute bottom-0 right-0 border-[3px] rounded-full border-[#FFFFFF] w-[20px] h-[20px] bg-[#00C50A]"/>
                </div>
                <div>
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="font-bold mt-1 mb-1 block transition-all hover:text-primary-hover">
                        {shop.shopName}
                    </Link>
                    <div className="flex items-center justify-start gap-3">
                        <p className="font-bold text-sm text-[#3f4b53]">{shop.warehouseRegionName}</p>
                        <p className="w-[1.5px] h-[12px] bg-[#3f4b53] opacity-50"></p>
                        <div className="flex items-center justify-start gap-1">
                            <p className="font-bold text-sm text-[#3f4b53]">{shop.ratingInfo.avgRating}</p>
                            <SolidIcon.UisStar className="w-[16px] h-[14px] text-[#e4a400]"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex my-5 justify-between items-center">
                <div className="text-center">
                    <p className="font-semibold text-sm">{formatBetweenDate(shop.createdAt)}</p>
                    <p className="font-semibold text-sm text-[#3f4b53]">Bán ở Sendo</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-sm">{shop.productTotal}</p>
                    <p className="font-semibold text-sm text-[#3f4b53]">Sản phẩm</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-sm">{formatToK(shop.followed || 0)}</p>
                    <p className="font-semibold text-sm text-[#3f4b53]">Lượt theo dõi</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-sm">{formatToK(shop.following || 0)}</p>
                    <p className="font-semibold text-sm text-[#3f4b53]"> Đang theo dõi</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-sm">{`${shop.timePrepareProduct || 'Đang cập nhật'}`}</p>
                    <p className="font-semibold text-sm text-[#3f4b53]">Tỉ lệ phản hồi</p>
                </div>
            </div>
            <div className="w-full">
                <div className="flex mt-3 pb-5 justify-around items-center gap-2 border-b-[1px] border-border-1">
                    <button
                        className="flex items-center justify-center gap-2 flex-1 h-[40px] rounded-md bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]">
                        <Icon.UilHeartMedical className="w-[20px] h-[20px] text-[#3f4b53]"/>
                        <span className="font-bold text-tiny">Theo dõi shop</span>
                    </button>
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="flex items-center justify-center gap-2 flex-1 h-[40px] rounded-md bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]">
                        <Icon.UilStore className="w-[20px] h-[20px] text-[#3f4b53]"/>
                        <span className="font-bold text-tiny">Vào shop</span>
                    </Link>
                    <button
                        className="flex items-center justify-center w-[40px] h-[40px] rounded-md bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]">
                        <Icon.UilPhoneVolume className="w-[20px] h-[20px] text-[#3f4b53]"/>
                    </button>
                </div>
                {products.length > 0 && (
                    <div className="mt-3">
                        <p className="font-bold text-[#3f4b53]">Gợi ý thêm từ shop</p>
                        <div
                            className="w-full h-[100%] bg-gradient-to-t to-[#ececec] from-[#d5ecfd] rounded-md mt-3">
                            <div className="w-full">
                                <div className="relative flex justify-center">
                                    {products.length > 3 &&
                                        <button onClick={() => scroll(-442)} type={"button"}
                                                className="absolute left-[-16px] top-[50%] translate-y-[-50%] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-primary text-white">
                                            <Icon.UilAngleLeftB className="w-[18px] h-[18px]"/>
                                        </button>
                                    }
                                    <div ref={slideRef}
                                         className="scroll-smooth w-full flex gap-[12px] items-center justify-start w-full overflow-hidden p-3">
                                        {products?.map((product, index) => (
                                            <div key={index}
                                                 className="max-w-[140px] rounded-md border-none hover:shadow-xl shadow-[#4b5563]">
                                                <MinimalProductCard item={product}/>
                                            </div>
                                        ))}
                                    </div>
                                    {products.length > 3 &&
                                        <button onClick={() => scroll(442)} type={"button"}
                                                className="absolute right-[-16px] top-[50%] translate-y-[-50%] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-primary text-white">
                                            <Icon.UilAngleRightB className="w-[18px] h-[18px]"/>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Shop;