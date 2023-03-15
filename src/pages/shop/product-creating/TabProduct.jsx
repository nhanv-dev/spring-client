import React, {useContext, useEffect, useState} from 'react';
import Images from "./Images";
import {formatLongDate} from "../../../util/format";
import ModalCategory from "./ModalCategory";
import * as Icon from "@iconscout/react-unicons";
import {PayloadContext} from "./index";

function TabProduct({handleSubmit}) {
    const {payload, setPayload} = useContext(PayloadContext);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({...payload?.product});
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [showCategory, setShowCategory] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(false);

    useEffect(() => {
        setPayload(prev => ({...prev, product: {...prev?.product, ...product}}))
    }, [product])

    useEffect(() => {
        setPayload(prev => {
            prev.product = {...prev.product, category}
            return prev
        })
    }, [category])

    useEffect(() => {
        setPayload(prev => {
            prev.product = {...prev.product, subCategory}
            return prev
        })
    }, [subCategory])

    function submit(e) {
        e.preventDefault();

        handleSubmit(e);
    }


    return (
        <div className="flex flex-wrap gap-8">
            <div className="w-4/12 min-h-full">
                <div className="h-full rounded-md bg-white p-5 shadow-md">
                    <Images images={images} setImages={setImages}/>
                </div>
            </div>
            <div className="flex-1">
                <div className="rounded-md bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <h5 className="font-bold text-base">
                                Thông tin sản phẩm
                            </h5>
                        </div>
                        {product.updatedAt &&
                            <p className="font-medium text-tiny text-[#6f787e]">
                                Cập nhật lần cuối: {formatLongDate(product.updatedAt)}
                            </p>}
                    </div>
                    <div className="mb-5">
                        <p className="mb-2 text-md font-semibold">Tên sản phẩm</p>
                        <div className="shadow-md bg-white w-full mb-4 rounded-md p-3">
                            <input type="text" value={product?.name} placeholder="Tên sản phẩm"
                                   onChange={(e) => setProduct(prev => ({
                                       ...prev,
                                       name: e.target.value
                                   }))}
                                   className="text-black-1 font-medium text-md w-full outline-none"/>
                        </div>
                    </div>
                    <div className="mb-7">
                        <ModalCategory category={category}
                                       setCategory={setCategory}
                                       subCategory={subCategory}
                                       setSubCategory={setSubCategory}
                                       showCategory={showCategory}
                                       showSubCategory={showSubCategory}
                                       setShowCategory={setShowCategory}
                                       setShowSubCategory={setShowSubCategory}/>
                        <p className="mb-2 text-md font-semibold">Loại sản phẩm</p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowCategory(true)}
                                    className="flex items-center justify-between gap-3 min-w-max max-w-[300px] shadow-md bg-white rounded-md p-3">
                                <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                    {category?.title || 'Chọn loại sản phẩm'}
                                </p>
                                <Icon.UilEditAlt
                                    className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                            </button>
                            <Icon.UilAngleRightB
                                className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                            <button onClick={() => setShowSubCategory(true)}
                                    className="flex items-center justify-between gap-3 min-w-max max-w-[300px] shadow-md bg-white rounded-md p-3">
                                <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                    {subCategory?.title || 'Chọn loại sản phẩm'}
                                </p>
                                <Icon.UilEditAlt
                                    className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                            </button>
                        </div>
                    </div>
                    <div className="w-full p-5 bg-app-1 rounded-md mb-5">
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
                                    <input type="number" value={product?.quantity}
                                           onChange={(e) => setProduct((prev) => ({
                                               ...prev,
                                               quantity: e.target.value
                                           }))}
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <p className="mb-2 text-md font-semibold">Giá gốc</p>
                                <div className="shadow-md bg-white w-full rounded-md p-3">
                                    <input type="number" value={product?.price}
                                           onChange={(e) => setProduct((prev) => ({
                                               ...prev,
                                               price: e.target.value
                                           }))}
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="basis-3/12">
                                <p className="mb-2 text-md font-semibold">Giá bán</p>
                                <div className="shadow-md bg-white w-full rounded-md p-3">
                                    <input type="number" value={product?.price}
                                           onChange={(e) => setProduct((prev) => ({
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
                                    <input type="number" value={product?.discountPercent}
                                           onChange={(e) => setProduct(prev => ({
                                               ...prev,
                                               discountPercent: e.target.value
                                           }))}
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                    <p className="text-black-1 font-semibold text-md">%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-end gap-3">
                        <button onClick={submit}
                                className="outline-none flex items-center justify-center gap-2 p-2 rounded-md border-2 text-primary font-semibold text-tiny">
                            <Icon.UilSave className="w-[20px] h-[20px]"/>
                            <span className="leading-3">Đăng sản phẩm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabProduct;