import React, {useState} from 'react';
import * as Icon from "@iconscout/react-unicons";

function CancelOrder({show, setShow, order, handleSubmit}) {
    const [note, setNote] = useState("");

    return (
        <>
            <div onClick={() => setShow(false)}
                 className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 right-0 bottom-0 z-[50] transition-all after:absolute after:bg-[#000] after:opacity-20 after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-[40]`}>
            </div>
            <div
                className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} transition-all min-w-[600px] max-w-[600px]  border border-border rounded-md z-[100] bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                <div className="p-5">
                    <div className={"flex justify-between items-start mb-3"}>
                        <h5 className="font-medium text-lg">Bạn chắc chắn muốn hủy đơn hàng?</h5>
                        <button onClick={() => setShow(false)} type={"button"}
                                className="flex items-center justify-center text-[#CDD2D4] rounded-full hover:text-red">
                            <Icon.UilTimes className="w-[24px] h-[24px]"/>
                        </button>
                    </div>
                    <div className="mb-5">
                        <p className="font-medium text-md mb-2">Lý do:</p>
                        <textarea style={{resize: 'none'}}
                                  value={note} onChange={(e) => setNote(e.target.value)}
                                  className="border border-border-1 w-full p-3 scroll-component rounded-md text-md font-medium text-black-2 h-[150px] outline-none"
                                  placeholder="Lý do hủy đơn đặt hàng"/>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-3">
                        <button onClick={() => setShow(false)}
                                className="font-semibold text-tiny text-secondary bg-secondary-bg rounded-full py-2 px-8">
                            Để sau
                        </button>
                        <button onClick={() => handleSubmit(order, note)}
                                className="font-semibold text-tiny text-danger bg-danger-bg rounded-full py-2 px-8">
                            Hủy đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CancelOrder;