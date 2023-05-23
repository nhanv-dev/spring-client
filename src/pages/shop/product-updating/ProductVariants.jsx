import * as Icon from "@iconscout/react-unicons";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import CurrencyInput from "react-currency-input-field";
import React from "react";

function ProductVariants(props) {
    const {attributes, variants, setVariants, selectedVariant, setSelectedVariant} = props;

    function handleAddVariant() {
        if (attributes.length <= 0) {
            toast.error('Chưa có tùy chọn nào');
            return;
        }
        setVariants(prev => [
            ...prev, {
                indexing: prev.length,
                attributeHash: "",
                skuUser: "",
                price: 0,
                finalPrice: 0,
                discountPercent: 0,
                options: []
            }
        ])
    }

    function handleChangeValueVariant(variant, field, value) {
        setVariants(prev => {
            return [...prev].map(v => {
                if (v === variant) {
                    v[field] = value;
                    if (field === 'price') {
                        if (v.discountPercent) v.finalPrice = v.price * (1 - (v.discountPercent / 100));
                        else if (v.finalPrice) v.discountPercent = Math.trunc(100 - (v.finalPrice * 100 / v.price));
                    }
                    if (field === 'discountPercent') {
                        if (v.price) v.finalPrice = v.price * (1 - (v.discountPercent / 100));
                    }
                    if (field === 'finalPrice') {
                        if (v.price) v.discountPercent = Math.trunc(100 - (v.finalPrice * 100 / v.price));
                    }
                }
                return v;
            });
        })
    }

    function handleRemoveVariant(variant) {
        setVariants(prev => {
            return prev.filter(v => v !== variant)
        })
    }

    function handleAutoGenerate() {
        attributes.map(a => a.options);
    }

    return (
        <div className="w-full max-w-full rounded-md bg-white p-5 shadow-md">
            <div className="overflow-hidden">
                <div className="mb-5 flex items-center justify-between gap-5">
                    <h5 className="text-base font-bold">
                        Mục phiên bản sản phẩm
                    </h5>
                    <div className="flex items-center justify-end gap-3">
                        <button onClick={handleAddVariant}
                                className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-bg text-primary rounded-full">
                            <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                            Tạo mới
                        </button>
                        <button onClick={handleAutoGenerate}
                                className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-primary-bg text-primary rounded-full">
                            <Icon.UilBolt className="w-[20px] h-[20px]"/>
                            Tạo tự động
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-full bg-app-1 rounded-md overflow-hidden">
                    <div className="flex items-center gap-6 justify-between px-6 py-4">
                        <div className="font-semibold text-tiny min-w-[20px] text-center">#</div>
                        <div className="flex-1 min-w-[150px] text-left font-semibold text-tiny">
                            Tùy chọn
                        </div>
                        <div className="font-semibold text-tiny min-w-[100px] text-center">
                            Trạng thái
                        </div>
                        <div className="font-semibold text-tiny min-w-[60px] max-w-[60px] text-center">
                            Số lượng
                        </div>
                        <div className="font-semibold text-tiny min-w-[100px] max-w-[100px] text-center">
                            Giá gốc
                        </div>
                        <div className="font-semibold text-tiny min-w-[100px] max-w-[100px] text-center">
                            Giá bán
                        </div>
                        <div className="font-semibold text-tiny min-w-[100px] max-w-[100px] text-center">
                            Giảm giá
                        </div>
                        <div className="font-semibold text-tiny text-right min-w-[100px] text-right">
                            Thao tác
                        </div>
                    </div>
                    {variants?.map((variant, index) => (
                        <div key={index}
                             className={`${selectedVariant === variant ? 'bg-primary-bg' : variant?.options?.length < attributes?.length ? 'bg-[#FFDDDD]' : ''} text-black-1 py-4 px-6 flex items-center gap-6 max-w-full border-t border-dashed border-border-1 transition-all`}>
                            {variant.options.length < attributes.length ?
                                <div className="font-medium text-sm min-w-[20px]">
                                    <Tooltip title="Chưa thêm đủ các option cho phiên bản này" followCursor>
                                        <div className="flex items-center justify-center gap-2">
                                            <Icon.UilExclamationTriangle className="text-red w-[16px] h-[16px]"/>
                                        </div>
                                    </Tooltip>
                                </div> :
                                <div className="font-medium text-sm min-w-[20px] text-center">
                                    {index + 1}
                                </div>
                            }
                            <div className="flex-1">
                                <button onClick={() => setSelectedVariant(variant)}
                                        className="w-full flex items-center justify-between gap-5 shadow-md bg-white rounded-md py-1 px-3 font-medium text-tiny">
                                    <p className="bg-white flex-1 line-clamp-1 text-left">
                                        {variant.options.map(o => o.name).join(" - ") || "Không xác định"}
                                    </p>
                                </button>
                            </div>
                            <div className="font-medium min-w-[100px] flex items-center justify-center">
                                <p className="text-[12px] rounded-full bg-primary-bg text-primary max-w-max px-2.5 py-[4px] font-bold">
                                    Đang cập nhật
                                </p>
                            </div>
                            <div className="font-medium text-tiny max-w-[60px] min-w-[60px]">
                                <input type="number" value={variant.quantity + ""}
                                       onChange={(e) => handleChangeValueVariant(variant, "quantity", e.target.value)}
                                       className="outline-none py-1 px-3 w-full rounded-md text-center shadow-md"/>
                            </div>
                            <div className="font-medium text-tiny max-w-[100px] min-w-[100px]">
                                <CurrencyInput
                                    value={variant.price || 0}
                                    intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                    className="outline-none py-1 px-3 w-full rounded-md text-center shadow-md"
                                    onValueChange={(value, name) => handleChangeValueVariant(variant, "price", value)}
                                />
                            </div>
                            <div className="font-medium text-tiny max-w-[100px] min-w-[100px]">
                                <CurrencyInput
                                    value={variant.finalPrice || 0}
                                    intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                    className="outline-none py-1 px-3 w-full rounded-md text-center shadow-md"
                                    onValueChange={(value, name) => handleChangeValueVariant(variant, "finalPrice", value)}
                                />
                            </div>
                            <div className="font-medium text-tiny max-w-[100px] min-w-[100px]">
                                <CurrencyInput
                                    value={variant.discountPercent || 0}
                                    intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                    className="outline-none py-1 px-3 w-full rounded-md text-center shadow-md"
                                    onValueChange={(value, name) => handleChangeValueVariant(variant, "discountPercent", value)}
                                />
                                {/*<input type="number" value={variant.discountPercent + ""}*/}
                                {/*       onChange={(e) => handleChangeValueVariant(variant, "discountPercent", e.target.value)}*/}
                                {/*       className="outline-none py-1 px-3 w-full rounded-md text-center shadow-md"/>*/}
                            </div>
                            <div
                                className="min-w-[100px] font-medium text-md flex items-center justify-end gap-4">
                                <button onClick={() => setSelectedVariant(variant)}
                                        className="w-[20px] h-[20px] text-primary flex items-center justify-center">
                                    <Icon.UilEdit className="w-[20px] h-[20px]"/>
                                </button>
                                <button onClick={() => handleRemoveVariant(variant)}
                                        className="w-[20px] h-[20px] text-red flex items-center justify-center">
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