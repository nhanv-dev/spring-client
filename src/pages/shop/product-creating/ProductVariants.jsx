import {useEffect, useRef, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import {Select} from "@mui/material";
import ProductAttributes from "./ProductAttributes";

function ProductVariants(props) {
    const {options, setOptions, variants, setVariants, setSelectedVariant} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModalCombination, setShowModalCombination] = useState(false);


    function handleAddVariant() {
        setVariants(prev => [
            ...prev, {attributeHash: "", skuUser: "", price: 0, quantity: 0, options: []}
        ])
    }

    function handleRemoveVariant(variant) {
        setVariants(prev => {
            return prev.filter(v => v !== variant)
        })
    }

    return (
        <div className="w-full max-w-full rounded-md bg-white p-5 shadow-md">
            <div className="overflow-hidden">
                <div className="mb-5 flex items-center justify-between gap-5">
                    <h5 className="text-base font-bold">
                        Mục sản phẩm tùy chọn
                    </h5>
                    <div className="flex items-center justify-end gap-3">
                        <button onClick={handleAddVariant}
                                className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-bg text-primary rounded-full">
                            <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                            Tạo mới
                        </button>
                        <button
                            className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-bg text-primary rounded-full">
                            <Icon.UilBolt className="w-[20px] h-[20px]"/>
                            Tạo tự động
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-full px-5 py-4 bg-app-1 rounded-md">
                    <div className="flex items-center gap-7 justify-between px-2">
                        <div className="font-medium text-[.85rem] min-w-[20px] text-left">#</div>
                        <div className="flex-1 min-w-[150px] text-left font-medium text-[.85rem]">
                            Tùy chọn
                        </div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-left">
                            Trạng thái
                        </div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-center">
                            Số lượng
                        </div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-left">
                            Giá
                        </div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-right">
                            Thao tác
                        </div>
                    </div>
                    {variants?.map((variant, index) => (
                        <div key={index}
                             className="text-black-1 pt-4 mt-4 flex items-center gap-7 max-w-full px-2 border-t border-dashed border-[#ccc]">
                            <div className="font-medium text-sm min-w-[20px]">{index + 1}</div>
                            <div className="flex-1">
                                <button onClick={() => {
                                    setActiveIndex(index)
                                    setShowModalCombination(prev => !prev)
                                }}
                                        className="w-full flex items-center justify-between gap-5 shadow-md bg-white rounded-md p-2 px-3 font-medium text-tiny">
                                    <p className="bg-white flex-1 line-clamp-1 text-left">
                                        {variant.attributeHash || "Không xác định"}
                                    </p>

                                </button>
                            </div>
                            <div className="font-medium min-w-[100px] flex items-center justify-start">
                                <p className="text-[12px] rounded-full bg-primary-bg text-primary max-w-max px-2.5 py-[4px] font-bold">
                                    Đang cập nhật
                                </p>
                            </div>
                            <div className="font-medium text-tiny w-[100px]">
                                <input type="number" value={variant.quantity}
                                       onChange={(e) => {


                                       }}
                                       className="py-1.5 px-3 w-full rounded-md text-center shadow-md"/>
                            </div>
                            <div className="font-medium text-tiny w-[100px]">
                                <input type="number" value={variant.price}
                                       onChange={(e) => {

                                       }}
                                       className="py-1.5 px-3 w-full rounded-md text-left shadow-md"/>
                            </div>
                            <div
                                className="font-medium text-md min-w-[100px] flex items-center justify-end gap-5">
                                <button onClick={() => setSelectedVariant(variant)}
                                        className="rounded-full w-[20px] h-[20px] text-primary bg-white flex items-center justify-start">
                                    <Icon.UilEdit className="w-[20px] h-[20px]"/>
                                </button>
                                <button onClick={() => handleRemoveVariant(variant)}
                                        className="rounded-full w-[20px] h-[20px] text-red bg-white flex items-center justify-start">
                                    <Icon.UilMinusCircle className="w-[20px] h-[20px]"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {variants?.length <= 0 &&
                    <div className="font-semibold text-base text-center pt-8 pb-6">
                        Chưa có sản phẩm tùy chọn
                    </div>
                }

            </div>
        </div>
    );
}


export default ProductVariants;