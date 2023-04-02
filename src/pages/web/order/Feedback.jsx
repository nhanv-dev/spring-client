import React, {useState} from 'react';
import * as SolidIcon from "@iconscout/react-unicons-solid";
import {formatCurrency} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest} from "../../../util/request-method";
import {useNavigate} from "react-router-dom";

function Feedback({showFeedback, setShowFeedback, item}) {
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState("");
    const [errContent, setErrContent] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            productId: item.product._id,
            content, rating, images
        }
        if (!content) setErrContent("Vui lòng điền đánh giá")
        protectedRequest().post("/evaluates", {data}).then(res => {
            console.log(res)
        }).catch((err) => {
            if (err.status === 403) navigate("/dang-nhap")
        })
        setShowFeedback(false)
    }

    return (
        <>
            <div onClick={() => setShowFeedback(false)}
                 className={`${showFeedback ? 'visible opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 right-0 bottom-0 z-[50] transition-all after:absolute after:bg-[#000] after:opacity-20 after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-[40]`}>
            </div>
            <div
                className={`${showFeedback ? 'visible opacity-100' : 'invisible opacity-0'} transition-all min-w-[600px] max-w-[600px]  border border-border rounded-md z-[100] bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                <div className="p-5">
                    {item &&
                        <div>
                            <div className="border-b border-[#f2f2f2] pb-5 mb-5">
                                <div className="flex items-start gap-3 ">
                                    <div className="border-2 border-border-1 rounded-md">
                                        <div className="bg-cover min-w-[90px] min-h-[90px] rounded-md"
                                             style={{backgroundImage: `url(${item.product.images[0].url})`}}></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="max-w-[400px] line-clamp-2 font-medium text-md">
                                            {item.variant?.options?.length > 0 &&
                                                <span
                                                    className="py-1 px-3 mr-2 min-w-max text-[12px] font-bold bg-primary-bg text-primary rounded-full leading-6">
                                                        {item.variant?.options.map(o => o.name).join(" + ")}
                                                    </span>
                                            } {item.product.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center gap-3 mb-3">
                                    <p className="font-medium text-md">Đánh giá:</p>
                                    <div className="flex items-center gap-0.5">
                                        <button onClick={() => setRating(1)}>
                                            <SolidIcon.UisStar
                                                className={`${rating >= 1 && "text-[#e4a400]"} w-3.5 h-3.5 transition-all hover:text-[#e4a400]`}/>
                                        </button>
                                        <button onClick={() => setRating(2)}>
                                            <SolidIcon.UisStar
                                                className={`${rating >= 2 && "text-[#e4a400]"} w-3.5 h-3.5 transition-all hover:text-[#e4a400]`}/>
                                        </button>
                                        <button onClick={() => setRating(3)}>
                                            <SolidIcon.UisStar
                                                className={`${rating >= 3 && "text-[#e4a400]"} w-3.5 h-3.5 transition-all hover:text-[#e4a400]`}/>
                                        </button>
                                        <button onClick={() => setRating(4)}>
                                            <SolidIcon.UisStar
                                                className={`${rating >= 4 && "text-[#e4a400]"} w-3.5 h-3.5 transition-all hover:text-[#e4a400]`}/>
                                        </button>
                                        <button onClick={() => setRating(5)}>
                                            <SolidIcon.UisStar
                                                className={`${rating >= 5 && "text-[#e4a400]"} w-3.5 h-3.5 transition-all hover:text-[#e4a400]`}/>
                                        </button>
                                    </div>
                                </div>
                                <textarea style={{resize: 'none'}}
                                          value={content} onChange={(e) => setContent(e.target.value)}
                                          className="border w-full p-3 scroll-component rounded-md text-md outline-none"
                                          placeholder="Ghi đánh giá sản phẩm tại đây"/>
                            </div>
                            <div className="flex items-center justify-end">
                                <button onClick={handleSubmit}
                                        className="font-semibold text-md text-primary border-primary border-2 rounded-md py-1.5 px-3">
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <button onClick={() => setShowFeedback(false)}
                        className="absolute z-[60] right-[-10px] top-[-10px] w-[26px] h-[26px] flex items-center justify-center bg-danger text-white rounded-full">
                    <Icon.UilTimes className="w-[18px] h-[18px]"/>
                </button>
            </div>
        </>

    );
}

export default Feedback;