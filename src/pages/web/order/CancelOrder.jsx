import React, {useState} from 'react';
import {formatCurrency} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";
import {protectedRequest} from "../../../util/request-method";
import {useNavigate} from "react-router-dom";

function CancelOrder({show, setShow, order, reset}) {
    const [note, setNote] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            orderId: order._id, note
        }
        protectedRequest().post("/orders/cancel", {data}).then(res => {
            reset()
        }).catch((err) => {
            if (err.status === 403) navigate("/dang-nhap")
        })
        setShow(false)
    }

    return (
        <>
            <div onClick={() => setShow(false)}
                 className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 right-0 bottom-0 z-[50] transition-all after:absolute after:bg-[#000] after:opacity-20 after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-[40]`}>
            </div>
            <div
                className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} transition-all min-w-[600px] max-w-[600px]  border border-border rounded-[5px] z-[100] bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                <div className="p-5">
                    <h5 className="font-medium text-lg mb-3">Bạn chắc chắn muốn hủy đơn hàng?</h5>
                    <div className="mb-5">
                        <p className="font-medium text-md mb-2">Lý do:</p>
                        <textarea style={{resize: 'none'}}
                                  value={note} onChange={(e) => setNote(e.target.value)}
                                  className="border w-full p-3 scroll-component rounded-[5px] text-md outline-none"
                                  placeholder="Ghi đánh giá sản phẩm tại đây"/>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <button onClick={handleSubmit}
                                className="border-2 border-primary px-3 py-1 rounded-[5px] text-tiny text-primary font-medium">
                            Hủy đơn hàng
                        </button>
                        <button onClick={() => setShow(false)}
                                className="border-2 border-primary px-3 py-1 rounded-[5px] text-tiny text-primary font-medium">
                            Quay lại
                        </button>
                    </div>
                </div>
                <button onClick={() => setShow(false)}
                        className="absolute z-[60] right-[-10px] top-[-10px] w-[26px] h-[26px] flex items-center justify-center bg-primary-hover text-white rounded-full">
                    <Icon.UilTimes className="w-[18px] h-[18px]"/>
                </button>
            </div>
        </>

    );
}

export default CancelOrder;