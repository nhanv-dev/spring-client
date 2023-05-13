import React from 'react';
import DefaultAvatar from "../../../assets/images/default-avatar.png";
import {formatSmallDate} from "../../../util/format";
import * as SolidIcon from "@iconscout/react-unicons-solid";
import {Link} from "react-router-dom";

function ReviewsBlock({review}) {
    console.log(review)
    return (
        <div className="flex border-t-[1px] py-5 border-[#f2f2f2]">
            <div className="basis-3/12">
                <div className="flex items-start gap-4 mb-3">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full bg-cover bg-center"
                         style={{backgroundImage: `url(${review.user.avatar || DefaultAvatar})`}}>
                    </div>
                    <div>
                        <h1 className="font-bold text-md mt-1">{review.user?.name || 'Ẩn danh'}</h1>
                        <div className="flex items-center text-[#3f4b53] justify-start text-sm">
                            <p className="text-sm font-medium">{formatSmallDate(review.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-8/12">
                <div className="flex gap-4 items-center justify-start">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((val, index) => (
                            <SolidIcon.UisStar key={index}
                                               className={`w-[14px] h-[14px] ${index < review.rating ? "text-[#e4a400]" : "text-[#e0e0e0]"}`}/>
                        ))}
                    </div>
                    <p className="text-sm font-semibold text-black-1">
                        {review.rating === 5 && 'Rất hài lòng'}
                        {review.rating === 4 && 'Hài lòng'}
                        {review.rating === 3 && 'Bình thường'}
                        {review.rating === 2 && 'Không hài lòng'}
                        {review.rating === 1 && 'Rất không hài lòng'}
                    </p>
                </div>
                <div>
                    {review.variant &&
                        <div className="flex items-center gap-3 font-medium text-tiny text-black-2 mt-3">
                            <p>Phân loại hàng:</p>
                            <p className="rounded-full bg-primary-bg text-primary px-3 py-.5 font-bold text-sm">{review.variant?.attributeHash}</p>
                        </div>
                    }
                    <p className="mt-4 text-tiny font-medium">{review.content}</p>
                </div>
                {review?.product &&
                    <div className="flex items-start gap-3 p-3 bg-app-1 rounded-md mt-3">
                        <div className={"w-[60px] h-[60px] rounded-md"}>
                            <img src={review.product?.images?.length > 0 ? review.product?.images[0].url : ''}
                                 alt={"product"} className={"w-full rounded-md"}/>
                        </div>
                        <Link to={`/san-pham/${review.product.slug}`} className={"font-semibold text-tiny text-black-1 hover:text-primary transition-all"}>
                            {review.product.name}
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default ReviewsBlock;