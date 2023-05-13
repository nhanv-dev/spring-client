import React, {useState} from 'react';
import * as SolidIcon from "@iconscout/react-unicons-solid";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest} from "../../../util/request-method";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";

function Feedback({showFeedback, setShowFeedback, item, handleSetItem}) {
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            orderItemId: item.id,
            productId: item.product.id,
            variantId: item.variant?.id,
            content,
            rating
        }
        protectedRequest().post(`/products/${item.product.id}/reviews`, data)
            .then(res => {
                setShowFeedback(false)
                handleSetItem(item.id);
                toast.success("Đánh giá sản phẩm thành công")
            })
            .catch((err) => {
                if (err.status === 403) navigate("/dang-nhap")
            })
    }

    return (
        <>
            <div onClick={() => setShowFeedback(false)}
                 className={`${showFeedback ? 'visible opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 right-0 bottom-0 z-[50] transition-all after:absolute after:bg-[#000] after:opacity-20 after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-[40]`}>
            </div>
            <div
                className={`${showFeedback ? 'visible opacity-100' : 'invisible opacity-0'} min-w-[550px] max-w-[550px] transition-all border border-border rounded-md z-[100] bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                {item &&
                    <div>
                        <div className="border-b border-[#f2f2f2] p-5">
                            <div className="flex items-start gap-3">
                                <div className="border-2 border-border-1 rounded-md">
                                    <div className="bg-cover min-w-[80px] min-h-[80px] rounded-md"
                                         style={{backgroundImage: `url(${item.product.images[0]?.url || ImageNotFound})`}}></div>
                                </div>
                                <div className="flex-1">
                                    <div className=" line-clamp-2 font-medium text-md">
                                        {item.product.name}
                                    </div>
                                    {item.variant &&
                                        <div className="mt-2 flex items-center justify-start gap-2">
                                            <p className={"font-semibold text-sm text-black-2"}>Phân loại hàng:</p>
                                            <p
                                                className="max-w-max px-3 mr-2 min-w-max text-sm font-bold bg-primary-bg text-primary rounded-full leading-6">
                                                {item.variant.attributeHash}
                                            </p>
                                        </div>
                                    }
                                </div>
                                <button onClick={() => setShowFeedback(false)}
                                        className="flex items-center justify-center text-[#CDD2D4] rounded-full hover:text-red">
                                    <Icon.UilTimes className="w-[24px] h-[24px]"/>
                                </button>
                            </div>
                        </div>
                        <div className="p-5 pt-0">
                            <div className="gap-2 flex flex-col justify-center items-center py-5">
                                <p className="font-semibold text-base text-black-1">
                                    Vui lòng đánh giá
                                </p>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setRating(1)}
                                            onMouseOver={() => setRating(1)}>
                                        <SolidIcon.UisStar
                                            className={`${rating >= 1 ? "text-[#e4a400]" : 'text-[#CED6DA]'} w-5 h-5 transition-all hover:text-[#e4a400]`}/>
                                    </button>
                                    <button onClick={() => setRating(2)}
                                            onMouseOver={() => setRating(2)}>
                                        <SolidIcon.UisStar
                                            className={`${rating >= 2 ? "text-[#e4a400]" : 'text-[#CED6DA]'} w-5 h-5 transition-all hover:text-[#e4a400]`}/>
                                    </button>
                                    <button onClick={() => setRating(3)}
                                            onMouseOver={() => setRating(3)}>
                                        <SolidIcon.UisStar
                                            className={`${rating >= 3 ? "text-[#e4a400]" : 'text-[#CED6DA]'} w-5 h-5 transition-all hover:text-[#e4a400]`}/>
                                    </button>
                                    <button onClick={() => setRating(4)}
                                            onMouseOver={() => setRating(4)}>
                                        <SolidIcon.UisStar
                                            className={`${rating >= 4 ? "text-[#e4a400]" : 'text-[#CED6DA]'} w-5 h-5 transition-all hover:text-[#e4a400]`}/>
                                    </button>
                                    <button onClick={() => setRating(5)}
                                            onMouseOver={() => setRating(5)}>
                                        <SolidIcon.UisStar
                                            className={`${rating >= 5 ? "text-[#e4a400]" : 'text-[#CED6DA]'} w-5 h-5 transition-all hover:text-[#e4a400]`}/>
                                    </button>
                                </div>
                            </div>
                            <textarea style={{resize: 'none'}} rows={6}
                                      value={content} onChange={(e) => setContent(e.target.value)}
                                      className="border border-border-1 w-full p-3 scroll-component rounded text-md font-medium text-black-2 outline-none"
                                      placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé"/>
                            <div className="mt-3 flex items-center justify-center gap-3">
                                <button onClick={() => setShowFeedback(false)}
                                        className="font-semibold text-tiny text-secondary bg-secondary-bg rounded-full py-2 px-8">
                                    Để sau
                                </button>
                                <button onClick={handleSubmit}
                                        className="font-semibold text-tiny text-white bg-primary rounded-full py-2 px-8">
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>

    );
}

export default Feedback;