import React from 'react';
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {Link} from "react-router-dom";
import {formatCurrency, formatToK} from "../../../util/format";
import StarRating from "../../common/star-rating";
import {Skeleton} from "@mui/material";

function ProductCard({item}) {
    if (!item) return <ProductSkeleton/>
    return (
        <div className="relative block w-full min-h-full shadow-sm bg-white rounded-md hover:shadow-xl transition-all">
            <Link to={`/san-pham/${item.slug}`}
                  className="block absolute left-0 right-0 top-0 bottom-0 bg-[transparent] z-10"/>
            <div className="rounded-t-md h-[200px] relative bg-cover bg-center" style={{backgroundImage:`url(${item?.images?.length > 0 ? item.images[0].url : ImageNotFound})`}}>
                <div className="absolute top-0 left-0 rounded-tl-md overflow-hidden">
                    <img src={"https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"}
                         alt={"astra"} className="h-[17px] min-h-[17px]"/>
                </div>
                <div className="absolute bottom-0 left-0">
                    <img src={"https://salt.tikicdn.com/ts/upload/d6/51/17/cde193f3d0f6da18147a739247c95c93.png"}
                         alt={"astra"} className="h-[24px] min-h-[24px]"/>
                </div>
            </div>
            <div className="p-2">
                <p className="mb-0.5 font-medium text-sm text-black-1 line-clamp-2 h-[36px]">
                    {item.name}
                </p>
                <div className="mb-0.5">
                    {
                        item.deal?.discount > 0 ?
                            <div className="flex items-end justify-start gap-3">
                                <p className="font-semibold text-base text-red">
                                    {formatCurrency(item.deal.finalPrice)}
                                </p>
                                <p className="font-semibold text-sm text-red">
                                    -{item.deal.discountPercent}%
                                </p>
                            </div> :
                            <p className="font-semibold text-base text-primary">
                                {formatCurrency(item.deal.price)}
                            </p>
                    }
                </div>
                <div className=" items-center justify-start gap-2">
                    <div className="flex items-center justify-start gap-1 mb-0.5">
                        <StarRating rating={item.ratingInfo.avgRating || 0} className="w-[12px] h-[12px]"/>
                        <p className="font-medium text-sm text-[#757575]">
                            ({formatToK(item.ratingInfo.totalRating || 0)})
                        </p>
                    </div>
                    <p className="font-medium text-sm text-[#757575]">
                        Đã bán {formatToK(item.orderCount || 0)}
                    </p>
                </div>
            </div>
        </div>
    );
}

const ProductSkeleton = () => {
    return (
        <Skeleton
            sx={{bgcolor: 'grey.900'}}
            variant="rectangular"
            width={210}
            height={118}
        />
    )
}

export default ProductCard;