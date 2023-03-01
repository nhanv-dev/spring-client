import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import {useSelector} from "react-redux";
import {formatLongDate} from "../../../utils/format";
import {protectedRequest, publicRequest} from "../../../utils/requestMethods";
import DefaultAvatar from "../../../assets/img/default-avatar.png";

function QuestionBlock({product, shop}) {
    const user = useSelector(state => state.user);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!product) return;
        publicRequest.get(`/questions/product?productId=${product?._id}&page=1`).then(res => {
            const {questions} = res.data;
            setQuestions(questions)
        })
    }, [product])

    return (
        <div className="rounded-[5px] bg-white p-6">
            <p className="font-bold text-base pb-2">Hỏi về sản phẩm</p>
            <p className="text-[#3f4b53] font-medium pb-4">Bạn có thắc mắc cần giải đáp ?</p>
            <UserInput product={product} user={user} setQuestions={setQuestions}/>
            <div className="w-full mt-8">
                {questions.length <= 0 ?
                    <div className="flex items-center justify-center h-[50px] bg-[#efefef] rounded-[5px]">
                        <p className="font-medium text-md">Chưa có câu hỏi nào</p>
                    </div>
                    : questions.map((question, index) => (
                        <Question key={index}
                                  question={question}
                                  questions={questions}
                                  setQuestions={setQuestions}
                                  shop={shop}
                                  product={product}/>
                    ))
                }
            </div>
        </div>
    );
}

const Question = ({question, questions, shop, product, setQuestions}) => {

    return (
        <div className="mt-5 pt-5 border-t-[1px] border-[#f2f2f2]">
            <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-wrap items-start">
                    <div style={{
                        backgroundImage: `url(${question.user?.avatar || DefaultAvatar})`
                    }} className="bg-cover bg-center rounded-full min-w-[40px] min-h-[40px] overflow-hidden"/>
                    <div className="ml-3">
                        <p className="text-tiny font-medium max-w-[300px] line-clamp-1">
                            {question.user?.fullName || 'Ẩn danh'}
                        </p>
                        <p className="text-[11px] text-[#828282] font-medium">
                            {formatLongDate(question.createdAt)}
                        </p>
                    </div>
                </div>
                <button
                    className="rounded-full min-w-[24px] min-h-[24px] flex items-start justify-center text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]">
                    <Icon.UilEllipsisH className="w-[18px] h-[18[x]"/>
                </button>
            </div>
            <div className="ml-[40px] pl-3">
                <p className="mb-3 text-md font-normal text-black-1">{question.content}</p>
                <Answer answers={question?.answers} shop={shop}/>
                <ShopInput shop={shop}
                           question={question}
                           questions={questions}
                           setQuestions={setQuestions}
                           product={product}/>
            </div>
        </div>
    )
}

export const Answer = ({answers, shop}) => {
    return (
        <div>
            {answers?.length > 0 ?
                answers.map((answer, index) => (
                    <div key={answer._id}
                         className={`bg-[#F7F7F7] p-3 rounded-[8px] ${index < answers.length - 1 ? 'mb-3' : 'mb-0'}`}>
                        <div className="flex flex-wrap items-start mb-2">
                            <div style={{
                                backgroundImage: `url(${shop.avatar || DefaultAvatar})`
                            }}
                                 className="bg-cover bg-center rounded-full min-w-[40px] min-h-[40px] border-2 border-border"/>
                            <div className="ml-3 flex-1 flex items-start justify-between">
                                <div>
                                    <p className="text-tiny font-medium max-w-[300px] line-clamp-1">
                                        {shop.name || 'Cửa hàng'}
                                    </p>
                                    <p className="text-[11px] text-[#828282] font-medium">
                                        {formatLongDate(answer.createdAt)}
                                    </p>
                                </div>
                                <button
                                    className="rounded-full min-w-[24px] min-h-[24px] flex items-center justify-center text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]">
                                    <Icon.UilEllipsisH className="w-[18px] h-[18[x]"/>
                                </button>
                            </div>
                        </div>
                        <div className="ml-[40px] pl-3">
                            <p className="text-md text-black-1">{answer?.content || "Chúng tôi sẽ phản hồi trong thời gian sớm nhất."}</p>
                        </div>
                    </div>
                )) :
                <div
                    className="bg-[#F7F7F7] p-3 rounded-[8px]  text-tiny font-medium flex items-center justify-center gap-2">
                    <Icon.UilInfoCircle className="w-[18px] h-[18px]"/> Chưa có phản hồi
                </div>
            }
        </div>
    )
}

const UserInput = ({product, setQuestions}) => {
    const user = useSelector(state => state.user);
    const [question, setQuestion] = useState("");

    const submitQuestion = async (e) => {
        e.preventDefault()
        if (question) {
            const data = {productId: product._id, content: question}
            if (user.accessToken && user.info)
                data.userId = user.info._id;
            await protectedRequest().post("/questions", data).then(res => {
                setQuestions(prev => [res.data.question, ...prev])
                setQuestion("")
            })
        }
    }

    return (
        <div className="pt-3">
            <form className="flex justify-start items-center gap-3" onSubmit={submitQuestion}>
                <div className="min-w-[40px] min-h-[40px] rounded-full bg-cover bg-center overflow-hidden"
                     style={{backgroundImage: `url(${user.info?.avatar || DefaultAvatar})`}}></div>
                <div className="w-full rounded-full bg-[#F7F7F7] px-3 h-[36px]">
                    <input value={question} onChange={(e) => setQuestion(e.target.value)}
                           className="w-full h-full text-gray bg-[#F7F7F7] text-md font-medium focus-visible:outline-none scroll-component"
                           placeholder="Gửi câu hỏi"/>
                </div>
                <button type="submit"
                        className="min-w-max font-bold text-tiny bg-primary-hover rounded-full text-white min-w-[36px] text-md h-[36px] flex items-center justify-center gap-2">
                    <Icon.UilMessage className="w-[18px] h-[18px] relative left-[1px] top-[.5px]"/>
                </button>
            </form>
        </div>
    )
}

const ShopInput = ({shop, question, questions, setQuestions, product}) => {
    const user = useSelector(state => state.user);
    const storageShop = useSelector(state => state.shop);
    const [answer, setAnswer] = useState("");

    const submitAnswer = async (e) => {
        e.preventDefault()
        if (!user.accessToken || !user.info) return;
        if (answer && question) {
            const data = {
                content: answer,
                questionId: question._id,
                accountId: user.info?._id,
                productId: product._id,
                shopId: shop._id,
            }
            await protectedRequest().post("/answers", data).then(res => {
                const {answer} = res.data
                const filter = [...questions].map(item => {
                    if (item._id === answer.questionId) {
                        if (!item.answers) item.answers = [];
                        return {...item, answers: [...item?.answers, answer]}
                    }
                    return item;
                })
                setQuestions(filter)
                setAnswer("")
            })
        }
    }

    return (
        <div>
            {storageShop._id === shop?._id &&
                <div className="pt-3">
                    <form className="flex justify-start items-center gap-3" onSubmit={submitAnswer}>
                        <div
                            className="min-w-[40px] min-h-[40px] rounded-full bg-cover bg-center overflow-hidden"
                            style={{backgroundImage: `url(${shop.avatar || DefaultAvatar})`}}></div>
                        <div className="w-full rounded-full bg-[#F7F7F7] px-3 h-[36px]">
                            <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                                   className="w-full h-full text-gray bg-[#F7F7F7] text-md font-medium focus-visible:outline-none scroll-component"
                                   placeholder="Gửi phản hồi"/>
                        </div>
                        <button type="submit"
                                className="min-w-max font-bold text-tiny bg-primary-hover rounded-full text-white min-w-[36px] text-md h-[36px] flex items-center justify-center gap-2">
                            <Icon.UilMessage className="w-[18px] h-[18px] relative left-[1px] top-[.5px]"/>
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default QuestionBlock;