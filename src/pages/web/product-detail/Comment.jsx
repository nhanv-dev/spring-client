import {useEffect, useState} from 'react';
import * as SolidIcon from "@iconscout/react-unicons-solid";
import * as Icon from "@iconscout/react-unicons";
import {publicRequest} from "../../../util/request-method";
import {formatSmallDate} from "../../../util/format";
import DefaultAvatar from "../../../assets/images/default-avatar.png";
import {Pagination, PaginationItem} from "@mui/material";

function Comment({product}) {
    const [comments, setComments] = useState([])
    const [pagination, setPagination] = useState({page: 0, size: 10, loaded: false});
    useEffect(() => {
        if (pagination.loaded) return;
        publicRequest().get(`/products/${product.id}/reviews?page=${pagination.page}&size=${pagination.size}`)
            .then(res => {
                setComments(res.data.content);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                })
            })
            .catch(err => {
                setComments([])
            })
    }, [pagination, product])
    const handleChangePage = (e, page) => {
        e.preventDefault();
        setPagination(prev => ({...prev, page: page, loaded: false}));
    }

    return (
        <div>
            {comments.length <= 0 ?
                <NullComment/> :
                <div className="rounded-md bg-white">
                    <div className="py-8 px-10">
                        <p className="inline-block font-bold text-lg mb-3">Đánh giá & nhận xét từ khách hàng</p>
                        <div className="flex justify-between items-start">
                            <div className="min-w-max basis-4/12">
                                <div className="flex items-center gap-3 ">
                                    <p className="text-5xl font-bold leading-10">{product?.ratingInfo?.avgRating || 0}</p>
                                    <div className="flex flex-col">
                                        <div className="pt-2 flex gap-0.5 items-center justify-start">
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                            <SolidIcon.UisStar className="w-[12px] h-[12px] text-[#e4a400]"/>
                                        </div>
                                        <p className="pt-2 font-medium text-[.85rem] text-[#808089] ">
                                            {product?.ratingInfo?.totalRating} đánh giá & nhận xét
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Rating value={5}
                                            star={product?.ratingInfo?.star5 || 0}
                                            total={product?.ratingInfo?.totalRating || 0}/>
                                    <Rating value={4}
                                            star={product?.ratingInfo?.star4 || 0}
                                            total={product?.ratingInfo?.totalRating || 0}/>
                                    <Rating value={3}
                                            star={product?.ratingInfo?.star3 || 0}
                                            total={product?.ratingInfo?.totalRating || 0}/>
                                    <Rating value={2}
                                            star={product?.ratingInfo?.star2 || 0}
                                            total={product?.ratingInfo?.totalRating || 0}/>
                                    <Rating value={1}
                                            star={product?.ratingInfo?.star1 || 0}
                                            total={product?.ratingInfo?.totalRating || 0}/>
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
                        <Pagination
                            count={pagination.totalPages}
                            page={pagination.page + 1}
                            onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
                            showFirstButton
                            showLastButton
                            renderItem={(item) => (
                                <PaginationItem {...item} sx={{
                                    fontWeight: '500',
                                    '&.Mui-selected, &:hover': {
                                        background: '#134c75',
                                        color: 'white'
                                    }
                                }}/>
                            )}
                        />
                    </div>
                </div>
            }
        </div>

    );
}

const CommentItem = ({comment, extendClass}) => {
    return (
        <div className={`${extendClass} flex border-t-[1px] p-8 border-[#f2f2f2]`}>
            <div className="basis-4/12">
                <div className="flex items-start gap-4 mb-3">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full bg-cover bg-center"
                         style={{backgroundImage: `url(${comment.user.avatar || DefaultAvatar})`}}>
                    </div>
                    <div>
                        <h1 className="font-bold text-md mt-1">{comment.user?.name || 'Ẩn danh'}</h1>
                        <div className="flex items-center text-[#3f4b53] justify-start text-sm">
                            <p className="text-sm font-medium">{formatSmallDate(comment.createdAt)}</p>
                        </div>
                    </div>
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
                <div>
                    {comment.variant &&
                        <div className="flex items-center gap-3 font-medium text-tiny text-black-2 mt-3">
                            <p>Phân loại hàng:</p>
                            <p className="rounded-full bg-primary-bg text-primary px-3 py-.5 font-bold text-sm">{comment.variant?.attributeHash}</p>
                        </div>
                    }
                    <p className="mt-4 text-tiny font-medium">{comment.content}</p>
                </div>
                <div className="flex gap-6 mt-8">
                    <button
                        className="flex items-center gap-1.5 px-3 py-1 rounded border-[2px] border-primary text-tiny text-primary font-medium">
                        <Icon.UilThumbsUp className="w-[16px] h-[16px] relative top-[-1px]"/> Hữu ích
                    </button>
                    <button
                        className="flex items-center gap-1.5 px-5 py-1 rounded border-[2px] border-primary-bg bg-primary-bg text-tiny text-primary font-bold">
                        Chia sẻ
                    </button>
                </div>
            </div>
        </div>
    )
}

const Rating = ({value, star, total}) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setPercent(Math.floor(star / total * 100))
    }, [star, total])

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
                <span className="ml-2 font-bold text-sm text-[#808089]">{star}</span>
            </div>
        </div>
    )
}

const CustomerImages = ({comments}) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        const items = []
        // comments.forEach(comment => items.push(...comment.images))
        setImages(items)
    }, [comments])

    return (
        <div className="w-full">
            <p className="text-base font-bold mb-3">Tất cả hình ảnh ({images.length})</p>
            <div className="flex items-center flex-wrap overflow-hidden gap-3">
                {images.length > 6 ?
                    <>
                        {images.slice(0, 5).map((image, index) => (
                            <button key={index} className="bg-cover w-[100px] h-[100px] rounded-md"
                                    style={{backgroundImage: `url(${image.url})`}}/>
                        ))}
                        <button
                            className="relative bg-cover w-[100px] h-[100px] rounded-md after:top-0 after:left-0 after:w-full after:h-full after:bg-[#242424b3] after:absolute after:rounded-md"
                            style={{backgroundImage: `url(${images[6].url})`}}>
                            <div
                                className="absolute bottom-0 mb-4 left-0 right-0 text-center font-semibold text-lg text-white z-10">+{images.length}</div>
                        </button>
                    </>
                    : images.slice(0, 3).map((image, index) => (
                        <div key={index} className="bg-cover w-[100px] h-[100px] rounded-md"
                             style={{backgroundImage: `url(${image.url})`}}/>
                    ))
                }
            </div>
        </div>
    )
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

export default Comment;