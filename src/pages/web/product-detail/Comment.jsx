import {useEffect, useState} from 'react';
import * as SolidIcon from "@iconscout/react-unicons-solid";
import * as Icon from "@iconscout/react-unicons";
import {Link} from "react-router-dom";
import {publicRequest} from "../../../utils/requestMethods";
import {formatSmallDate} from "../../../utils/format";
import DefaultAvatar from "../../../assets/img/default-avatar.png";

function Comment({product}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (!product) return;
        publicRequest.get(`/evaluates/productId/${product._id}`).then(res => {
            setComments(res.data.evaluates)
            console.log(res)
        })
    }, [product])

    return (
        <>
            {comments.length <= 0 ?
                <NullComment/> :
                <div className="rounded-md bg-white">
                    <div className="py-8 px-10">
                        <p className="inline-block font-bold text-lg mb-3">Đánh giá & nhận xét từ khách hàng</p>
                        <div className="flex justify-between items-start">
                            <div className="min-w-max basis-4/12">
                                <div className="flex items-center gap-3 ">
                                    <p className="text-5xl font-bold leading-10">{product?.rating}</p>
                                    <div className="flex flex-col">
                                        <div className="pt-2 flex gap-0.5 items-center justify-start">
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                        </div>
                                        <p className="pt-2 font-medium text-[.85rem] text-[#808089] ">
                                            {comments.length} đánh giá & nhận xét
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Rating value={5} comments={comments}/>
                                    <Rating value={4} comments={comments}/>
                                    <Rating value={3} comments={comments}/>
                                    <Rating value={2} comments={comments}/>
                                    <Rating value={1} comments={comments}/>
                                </div>
                            </div>
                            <div className="flex-1 ">
                                <CustomerImages comments={comments}/>
                                <div className="mt-8 flex items-start gap-3">
                                    <p className="pt-1 text-md font-medium">Lọc xem theo:</p>
                                    <div className="flex-1 flex items-center justify-start gap-3 flex-wrap">
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>Có hình ảnh</span>
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>5</span>
                                            <Icon.UilStar className="w-[18px] h-[18px] relative top-[.5px]"/>
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>4</span>
                                            <Icon.UilStar className="w-[18px] h-[18px] relative top-[.5px]"/>
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>3</span>
                                            <Icon.UilStar className="w-[18px] h-[18px] relative top-[.5px]"/>
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>2</span>
                                            <Icon.UilStar className="w-[18px] h-[18px] relative top-[.5px]"/>
                                        </button>
                                        <button
                                            className="flex items-center gap-2 text-tiny font-medium h-[30px] px-3 rounded-full bg-[#f5f5fa] text-[#38383d]">
                                            <span>1</span>
                                            <Icon.UilStar className="w-[18px] h-[18px] relative top-[.5px]"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {comments.map((comment, index) => (
                            <CommentItem comment={comment} key={index}/>
                        ))}
                    </div>
                    <div className="p-8 flex items-center justify-end">
                        <div className="flex gap-2 items-center">
                            <Link to={""}
                                  className="rounded-full min-w-[32px] min-h-[32px] text-base font-medium flex items-center justify-center">
                                <Icon.UilAngleLeft/>
                            </Link>
                            {[...Array(5)].map((val, index) => (
                                <Link to={""} key={index}
                                      className={`${index === 0 ? 'bg-[#134c75] text-white' : 'hover:bg-[#c1e7ff] text-black-1'}  rounded-full min-w-[32px] min-h-[32px] text-base font-medium flex items-center justify-center`}>
                                    {index + 1}
                                </Link>
                            ))}
                            <Link to={""}
                                  className="rounded-full min-w-[32px] min-h-[32px] text-base font-medium flex items-center justify-center">
                                <Icon.UilAngleRight/>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

const NullComment = () => {
    return (
        <div className="rounded-md bg-white">
            <div className="py-8 px-10">
                <p className="inline-block font-bold text-lg mb-3">Đánh giá & nhận xét từ khách hàng</p>
                <div className="flex justify-center items-center m-10">
                    <h5 className="font-semibold text-lg text-center">Sản phẩm chưa có đánh giá.</h5>
                </div>
            </div>
        </div>
    )
}


const CommentItem = ({comment, extendClass}) => {
    return (
        <div className={`${extendClass} flex border-t-[1px] p-8 border-[#f2f2f2]`}>
            <div className="basis-4/12">
                <div className="flex items-start gap-4">
                    <div className="w-[55px] h-[55px] overflow-hidden rounded-full bg-cover bg-center"
                         style={{backgroundImage: `url(${comment.user.avatar || DefaultAvatar})`}}>
                    </div>
                    <div>
                        <h1 className="font-bold text-md">{comment.user.fullName}</h1>
                        <div className="flex items-center text-[#3f4b53] justify-start text-sm">
                            <p className="text-sm font-medium">{formatSmallDate(comment.createdAt)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-sm font-medium text-[#808089] flex items center">
                    <Icon.UilCommentAltMessage className="w-[18px] h-[18px] relative top-[1px]"/>
                    <p className="ml-2">
                        <span>Đã viết: </span>
                        <span className="text-[#38383d]">1 đánh giá</span>
                    </p>
                </div>
                <div className="mt-3 text-sm font-medium text-[#808089] flex items center">
                    <Icon.UilThumbsUp className="w-[18px] h-[18px] relative top-[1px]"/>
                    <p className="ml-2">
                        <span>Đã nhận: </span>
                        <span className="text-[#38383d]">1 lượt cảm ơn</span>
                    </p>
                </div>
            </div>
            <div className="basis-8/12">
                <div className="flex gap-4 items-center justify-start">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((val, index) => (
                            <SolidIcon.UisStar key={index}
                                               className={`w-[14px] h-[14px] ${index < comment.rating ? "text-[#e4a400]" : "text-[#e0e0e0]"}`}/>
                        ))}
                    </div>
                    <p className="text-sm font-semibold text-black-1">
                        {comment.rating === 5 && 'Rất hài lòng'}
                        {comment.rating === 4 && 'Hài lòng'}
                        {comment.rating === 3 && 'Bình thường'}
                        {comment.rating === 2 && 'Không hài lòng'}
                        {comment.rating === 1 && 'Rất không hài lòng'}
                    </p>
                </div>
                <p className="pt-2 pb-4 text-tiny font-medium">{comment.content}</p>
                <div className="flex flex-wrap items-center justify-start gap-3">
                    {comment.images.slice(0, 7).map((image, index) => (
                        <div style={{backgroundImage: `url(${image.url})`}} key={index}
                             className="min-w-[150px] min-h-[150px] overflow-hidden rounded-[5px] bg-[#e7e8ea] bg-origin-content bg-center bg-cover">
                        </div>
                    ))}
                </div>
                <div className="flex gap-6 mt-4">
                    <button
                        className="flex items-center gap-2 px-4 py-1.5 rounded-[4px] border-[1px] border-[#0b74e5] text-sm text-[#0b74e5] font-semibold">
                        <Icon.UilThumbsUp className="w-[16px] h-[16px] relative top-[-1px]"/> Hữu ích
                    </button>
                    <button className="text-sm text-[#0b74e5] font-semibold">
                        Chia sẻ
                    </button>
                </div>
            </div>
        </div>
    )
}

const Rating = ({value, comments}) => {
    const [percent, setPercent] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const size = comments.filter((comment) => comment.rating === value).length
        const percent = size / comments.length * 100;
        setTotal(size);
        setPercent(Math.floor(percent))
    }, [comments])

    return (
        <div className="flex items-center justify-start gap-3">
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((val, index) => (
                    <SolidIcon.UisStar key={index}
                                       className={`w-[10px] h-[10px] ${index < value ? "text-[#e4a400]" : "text-[#e0e0e0]"}`}/>
                ))}
            </div>
            <div className="flex items-center">
                <div className="relative w-[100px] h-[8px] rounded-md bg-[#e0e0e0] ">
                    <div className='absolute rounded-md bottom-0 top-0 left-0 bg-primary'
                         style={{minWidth: `${percent}%`}}/>
                </div>
                <span className="ml-2 font-bold text-sm text-[#808089]">{total}</span>
            </div>
        </div>
    )
}

const CustomerImages = ({comments}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const items = []
        comments.forEach(comment => items.push(...comment.images))
        setImages(items)
    }, [comments])

    return (
        <div className="w-full">
            <p className="text-base font-bold mb-3">Tất cả hình ảnh ({images.length})</p>
            <div className="flex items-center flex-wrap overflow-hidden gap-3">
                {images.length > 6 ?
                    <>
                        {images.slice(0, 5).map((image, index) => (
                            <button key={index} className="bg-cover w-[100px] h-[100px] rounded-[5px]"
                                    style={{backgroundImage: `url(${image.url})`}}/>
                        ))}
                        <button
                            className="relative bg-cover w-[100px] h-[100px] rounded-[5px] after:top-0 after:left-0 after:w-full after:h-full after:bg-[#242424b3] after:absolute after:rounded-[5px]"
                            style={{backgroundImage: `url(${images[6].url})`}}>
                            <div
                                className="absolute bottom-0 mb-4 left-0 right-0 text-center font-semibold text-lg text-white z-10">+{images.length}</div>
                        </button>
                    </>
                    : images.slice(0, 3).map((image, index) => (
                        <div key={index} className="bg-cover w-[100px] h-[100px] rounded-[5px]"
                             style={{backgroundImage: `url(${image.url})`}}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Comment;