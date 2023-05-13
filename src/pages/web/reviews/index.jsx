import {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest} from "../../../util/request-method";
import UserLayout from "../../../components/web/user-layout";
import ToastCustom from "../../../components/common/toast-custom";
import Review from "../shop/Review";
import ReviewsBlock from "./ReviewsBlock";

function Reviews() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState({page: 0, size: 10, totalPages: 1, loaded: false})


    useEffect(() => {
        if (!user.token) navigate("/dang-nhap");
        if (pagination.loaded) return;
        protectedRequest().get(`/users/${user.id}/reviews?page=${pagination.page}`)
            .then(res => {
                console.log(res)
                setReviews(res.data.content);
                setPagination({
                    size: res.data.size,
                    page: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                    loaded: true
                });
            })
            .catch(err => {
                setReviews([])
            })
    }, [pagination, navigate, user])

    const load = () => {

    }

    return (
        <Helmet title="Depot - Đánh giá của bạn">
            <UserLayout>
                <ToastCustom/>
                <div className="mb-5 shadow rounded-md bg-white py-3 px-3">
                    <form
                        className="flex justify-between items-center gap-5 font-medium text-md text-black-1">
                        <button type={"submit"} className="text-black-2">
                            <Icon.UilSearch className={"w-[20px] h-[20px]"}/>
                        </button>
                        <input type="text" className="bg-white w-full outline-none text-black-1"
                               placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"/>
                    </form>
                </div>
                <div className="w-full mb-8">
                    {reviews.length > 0 ?
                        <div className="bg-white rounded-md shadow-md p-5">
                            <div className="flex flex-col gap-5">
                                <p className="font-semibold text-black-2">
                                    Bạn có {pagination.totalElements} đánh giá sản phẩm.
                                </p>
                                {reviews.map(review => (
                                    <ReviewsBlock key={review.id} review={review}/>
                                ))}
                            </div>
                        </div> :
                        <div
                            className="rounded-md bg-white p-8 flex items-center justify-center h-[300px] flex-col gap-6">
                            <div className="w-[100px] h-[100px] bg-cover bg-center"
                                 style={{backgroundImage: 'url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png)'}}></div>
                            <div className="font-semibold text-lg text-black-2">Chưa có đánh giá</div>
                        </div>
                    }
                </div>
                {pagination?.page < pagination?.totalPages - 1 &&
                    <div className="mb-8 flex items-center justify-center">
                        <button onClick={load} className="px-5 py-1 bg-info-bg text-info font-bold text-md rounded-md">
                            Xem thêm
                        </button>
                    </div>
                }
            </UserLayout>
        </Helmet>
    );
}


export default Reviews;