import {Link} from "react-router-dom";
import DefaultAvatar from "../../../assets/img/default-shop.png"
import {formatToK} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";

function ShopCard({shop}) {
    return (
        <div
            className="relative group w-full rounded-md bg-white rounded-[8px] p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-10">
                <div className="max-w-[450px] min-w-[450px] flex items-center justify-start gap-3">
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="relative min-w-[70px] min-h-[70px] w-[70px] h-[70px] flex items-center justify-center rounded-full overflow-hidden">
                        <div style={{backgroundImage: `url(${shop.avatar || DefaultAvatar})`}}
                             className="w-full h-full bg-cover bg-center"/>
                        <div
                            className="absolute w-full h-full left-0 top-0 rounded-full border-primary-hover border-[3px]"></div>
                    </Link>
                    <div className="w-full">
                        <Link to={`/cua-hang/${shop.slug}`} className="block ">
                            <p className="hover:text-primary text-lg font-semibold text-[#0f1e29] line-clamp-1">
                                {shop.name}
                            </p>
                        </Link>
                        <p className="font-medium text-md mb-1 text-black-1">
                            {shop.email}
                        </p>
                        <div className="flex items-center gap-3 text-black-1">
                            <p className="font-medium text-tiny">
                                {formatToK(shop.followed)} người theo dõi
                            </p>
                            <p className="font-medium text-tiny">
                                |
                            </p>
                            <p className="font-medium text-tiny">
                                {formatToK(shop.following)} đang theo dõi
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-start gap-5">
                    <p className="font-medium text-tiny w-[1px] h-[48px] bg-[#efefef]"/>
                    <div className="font-medium text-md flex items-center justify-center flex-col">
                        <p className="flex items-center justify-center gap-1 text-primary-hover font-semibold mb-1">
                            <Icon.UilCube className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"/>
                            {shop.amountProducts}
                        </p>
                        <p className="text-black-1 text-tiny">Sản phẩm</p>
                    </div>
                    <p className="font-medium text-tiny w-[1px] h-[48px] bg-[#efefef]"/>
                    <div className="font-medium text-md flex items-center justify-center flex-col">
                        <p className="flex items-center justify-center gap-1 text-primary-hover font-semibold mb-1">
                            <Icon.UilStar className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"/>
                            {shop.rating}
                        </p>
                        <p className="text-black-1 text-tiny">Đánh giá</p>
                    </div>
                    <p className="font-medium text-tiny w-[1px] h-[48px] bg-[#efefef]"/>
                    <div className="font-medium text-md flex items-center justify-center flex-col">
                        <p className="flex items-center justify-center gap-1 text-primary-hover font-semibold mb-1">
                            <Icon.UilCommentAltLines className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"/>
                            {shop.responseRate}
                        </p>
                        <p className="text-black-1 text-tiny">Tỉ lệ phản hồi</p>
                    </div>
                    <p className="font-medium text-tiny w-[1px] h-[48px] bg-[#efefef]"/>
                    <div className="font-medium text-md flex items-center justify-center flex-col">
                        <p className="flex items-center justify-center gap-1 text-primary-hover font-semibold mb-1">
                            <Icon.UilClock className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"/>
                            {shop.responseTime}
                        </p>
                        <p className="text-black-1 text-tiny">Thời gian phản hồi</p>
                    </div>
                    <p className="font-medium text-tiny w-[1px] h-[48px] bg-[#efefef]"/>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Link to={`/cua-hang/${shop.slug}`}
                          className="font-semibold text-md flex items-center justify-center rounded-[5px] border-2 border-primary-hover text-primary-hover min-w-[100px] min-h-[32px]">
                        Xem shop
                    </Link>
                    <button
                        className="font-semibold text-md flex items-center justify-center rounded-[5px] border-2 border-primary-hover text-primary-hover min-w-[100px] min-h-[32px]">
                        Theo dõi
                    </button>
                </div>
            </div>
        </div>
    );
}


export default ShopCard;