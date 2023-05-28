import {Link} from "react-router-dom";
import DefaultAvatar from "../../../assets/images/default-shop.png"
import {formatToK} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";

function ShopCard({shop}) {

    return (
        <div
            className="relative group w-full rounded-md bg-white p-3 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-10">
                <div className="min-w-max flex items-center justify-start gap-3">
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="relative min-w-[50px] min-h-[50px] w-[50px] h-[50px] flex items-center justify-center rounded-full overflow-hidden">
                        <div style={{backgroundImage: `url(${shop.shopLogo || DefaultAvatar})`}}
                             className="w-full h-full bg-cover bg-center"/>
                        <div
                            className="absolute w-full h-full left-0 top-0 rounded-full border-primary border-2"></div>
                    </Link>
                    <div className="max-w-[300px]">
                        <Link to={`/cua-hang/${shop.slug}`} className="block ">
                            <p className="hover:text-primary text-md font-semibold text-black line-clamp-1">
                                {shop.shopName}
                            </p>
                        </Link>
                        <div className="flex items-center gap-3 text-black-1">
                            <p className="text-black-2 font-semibold text-sm">
                                {formatToK(shop.followed || 0)} người theo dõi
                            </p>
                            <p className="text-black-2 font-semibold text-sm">
                                |
                            </p>
                            <p className="text-black-2 font-semibold text-sm">
                                {formatToK(shop.following || 0)} đang theo dõi
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-end gap-5">
                    <p className="w-[1px] h-[24px] bg-[#efefef]"/>
                    <div className="flex items-center gap-1">
                        {/*<Icon.UilCube className="relative text-black-2 w-[22px] h-[22px]"/>*/}
                        <p className="text-black-2 text-tiny font-semibold">{formatToK(shop.productTotal)} sản phẩm</p>
                    </div>
                    <p className="w-[1px] h-[24px] bg-[#efefef]"/>
                    <div className="flex items-center gap-1">
                        {/*<Icon.UilStar className="relative text-black-2 w-[22px] h-[22px]"/>*/}
                        <p className="text-black-2 text-tiny font-semibold">{shop?.ratingInfo?.totalRating} đánh giá</p>
                    </div>
                    <p className="w-[1px] h-[24px] bg-[#efefef]"/>
                    <div className="flex items-center gap-2">
                        <Link to={`/cua-hang/${shop.slug}`}
                              className="font-semibold text-tiny flex items-center justify-center rounded bg-primary-bg text-primary min-w-[100px] min-h-[32px]">
                            <span className="relative top-[.5px]">Xem shop</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ShopCard;