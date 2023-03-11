import {useEffect, useRef, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import {Select} from "@mui/material";
import ProductAttributes from "./ProductAttributes";

function ProductVariants(props) {
    const {options, setOptions, variants, setVariants} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModalCombination, setShowModalCombination] = useState(false);


    function handleAddVariant() {

    }

    function handleRemoveVariant() {

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
                                className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-1-hover text-[#1CAC93] rounded-full">
                            <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                            Tạo mới
                        </button>
                        <button
                            className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-1-hover text-[#1CAC93] rounded-full">
                            <Icon.UilBolt className="w-[20px] h-[20px]"/>
                            Tạo tự động
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-full p-5 bg-[#f5f5f5] rounded-[5px]">
                    {/*<ModalCreatingCombination showModalCombination={showModalCombination}*/}
                    {/*                          setShowModalCombination={setShowModalCombination}*/}
                    {/*                          variants={variants} setVariants={setVariants}*/}
                    {/*                          activeIndex={activeIndex} options={options}/>*/}
                    <div className="w-full max-w-full">
                        <div className="flex items-center gap-7 justify-between px-2">
                            <div className="font-medium text-[.85rem] min-w-[20px] text-left">#</div>
                            <div className="flex-1 min-w-[150px] text-left font-medium text-[.85rem]">
                                Tùy chọn
                            </div>
                            <div className="font-medium text-[.85rem] min-w-[100px] text-center">
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
                        {variants?.map((combination, index) => (
                            <div key={index}
                                 className="text-black-1 pt-4 mt-4 flex items-center gap-7 max-w-full px-2 border-t border-dashed border-[#ccc]">
                                <div className="font-medium text-sm min-w-[20px]">{index + 1}</div>
                                <div className="flex-1">
                                    <button onClick={() => {
                                        setActiveIndex(index)
                                        setShowModalCombination(prev => !prev)
                                    }}
                                            className="w-full flex items-center justify-between gap-5 shadow-md bg-white rounded-[5px] p-2 px-3 font-medium text-tiny">
                                        <p className="bg-white flex-1 line-clamp-1 text-left">
                                            {combination.combinationString || "Không xác định"}
                                        </p>
                                        <Icon.UilEdit className="w-[18px] h-[18px]"/>
                                    </button>
                                </div>
                                <div
                                    className="font-medium text-md min-w-[100px] flex items-center justify-center">
                                    <p className="text-[11px] rounded-full bg-primary-hover max-w-max px-2 py-[2px] font-bold text-white">
                                        Đang cập nhật
                                    </p>
                                </div>
                                <div className="font-medium text-tiny w-[100px]">
                                    <input type="number" value={combination.stock}
                                           onChange={(e) => {
                                               const data = {...combination, stock: e.target.value}

                                           }}
                                           className="py-1.5 px-3 w-full rounded-[5px] text-center shadow-md"/>
                                </div>
                                <div className="font-medium text-tiny w-[100px]">
                                    <input type="number" value={combination.price}
                                           onChange={(e) => {
                                               const data = {...combination, price: e.target.value}

                                           }}
                                           className="py-1.5 px-3 w-full rounded-[5px] text-left shadow-md"/>
                                </div>
                                <div
                                    className="font-medium text-md min-w-[100px] flex items-center justify-end">
                                    <button onClick={() => handleRemoveVariant(index)}
                                            className="rounded-full w-[20px] h-[20px] text-primary-hover bg-white flex items-center justify-start">
                                        <Icon.UilMinusCircle className="w-[20px] h-[20px]"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProductVariants;