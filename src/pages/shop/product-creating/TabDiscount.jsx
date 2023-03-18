import React, {useContext} from 'react';
import {PayloadContext} from "./index";

function TabDiscount() {
    const {payload, setPayload} = useContext(PayloadContext);

    return (
        <div className="flex flex-wrap gap-6">
            <div className="rounded-md bg-white shadow-md p-5">
                <div className="w-full p-5 bg-app-1 rounded-md">
                    <div className="w-full">
                        <h5 className="mb-1 font-semibold text-md">
                            Tùy chỉnh giá & số lượng sản phẩm</h5>
                        <p className="mb-2 font-medium text-sm text-black-1">
                            * Tổng số lượng sản phẩm của các option sản phẩm khác nhau.
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="basis-2/12">
                            <p className="mb-2 text-md font-semibold">Số lượng</p>
                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                <input type="number" value={payload.product?.quantity}
                                       onChange={(e) => setPayload((prev) => ({
                                           ...prev,
                                           quantity: e.target.value
                                       }))}
                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                            </div>
                        </div>
                        <div className="basis-3/12">
                            <p className="mb-2 text-md font-semibold">Giá gốc</p>
                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                <input type="number" value={payload.product?.price}
                                       onChange={(e) => setPayload((prev) => ({
                                           ...prev,
                                           price: e.target.value
                                       }))}
                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                            </div>
                        </div>
                        <div className="basis-3/12">
                            <p className="mb-2 text-md font-semibold">Giá bán</p>
                            <div className="shadow-md bg-white w-full rounded-md p-3">
                                <input type="number" value={payload.product?.price}
                                       onChange={(e) => setPayload((prev) => ({
                                           ...prev,
                                           finalPrice: e.target.value
                                       }))}
                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                            </div>
                        </div>
                        <div className="basis-2/12">
                            <p className="mb-2 text-md font-semibold">Giảm giá</p>
                            <div
                                className="flex items-center justify-between shadow-md bg-white w-full rounded-md p-3">
                                <input type="number" value={payload.product?.discountPercent}
                                       onChange={(e) => setPayload(prev => ({
                                           ...prev,
                                           discountPercent: e.target.value
                                       }))}
                                       className="text-black-1 font-medium text-md w-full outline-none"/>
                                <p className="text-black-1 font-semibold text-md">%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabDiscount;