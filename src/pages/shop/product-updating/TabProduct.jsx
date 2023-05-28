import React, {useContext, useEffect, useState} from 'react';
import Index from "../../../components/shop/upload-images";
import ModalCategory from "./ModalCategory";
import * as Icon from "@iconscout/react-unicons";
import {PayloadContext} from "./index";
import {publicRequest} from "../../../util/request-method";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {FormGroup} from "@mui/material";
import {UilCopy} from "@iconscout/react-unicons";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import CurrencyInput from "react-currency-input-field";

function TabProduct({handleSubmit}) {
    const {payload, setPayload} = useContext(PayloadContext);
    const [product, setProduct] = useState({...payload?.product});
    const [category, setCategory] = useState({...payload?.product?.category});
    const [subCategory, setSubCategory] = useState({...payload?.product?.subCategory});
    const [showCategory, setShowCategory] = useState(false);
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [returnPolicies, setReturnPolicies] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isPublic, setIsPublic] = useState(payload.product.isPublic || false);

    useEffect(() => {
        publicRequest().get("/products/return-policy")
            .then((res) => {
                setReturnPolicies(res.data)
            })
    }, [])

    useEffect(() => {
        setPayload(prev => ({...prev, product: {...prev?.product, ...product}}))
    }, [product, setPayload])

    useEffect(() => {
        setPayload(prev => {
            prev.product = {...prev.product, category}
            return {...prev}
        })
    }, [category, setPayload])

    useEffect(() => {
        setPayload(prev => {
            prev.product = {...prev.product, subCategory}
            return {...prev}
        })
    }, [subCategory, setPayload])

    useEffect(() => {
        setPayload(prev => {
            prev.product.isPublic = isPublic
            return prev;
        })
    }, [isPublic, setPayload])

    function submit(e) {
        e.preventDefault();
        handleSubmit(e);
    }

    function handleAddKeywords(e) {
        e.preventDefault();
        if (!keyword || payload.keywords?.length > 6) return;
        setPayload(prev => {
            if (prev.product.keywords)
                prev.product.keywords = [...prev.product?.keywords.split(','), keyword].join(",")
            else
                prev.product.keywords = [keyword].join(",")
            return {...prev}
        })
        setKeyword("")
    }

    function handleRemoveKeywords(index) {
        setPayload(prev => {
            prev.product.keywords = prev.product.keywords.split(',').filter((k, i) => i !== index).join(",")
            return {...prev}
        })
    }

    function handleUpdateReturnPolicy(checked, policy) {
        if (checked) {
            setPayload(prev => {
                if (!prev.product.returnPolicies) prev.product.returnPolicies = [];
                const returnPolicies = prev.product.returnPolicies.filter(p => p.id !== policy.id);
                prev.product.returnPolicies = [...returnPolicies, policy]
                return {...prev};
            })
        } else {
            setPayload(prev => {
                if (!prev.product.returnPolicies) prev.product.returnPolicies = []
                prev.product.returnPolicies = prev.product.returnPolicies.filter(p => p.id !== policy.id)
                return {...prev};
            })
        }
    }

    function handleUpdateQuantity() {
        if (payload.variants?.length > 0)
            setPayload(prev => {
                let quantity = 0;
                prev.variants.forEach(v => {
                    quantity += parseInt(v.quantity)
                })
                prev.product.quantity = quantity;
                return {...prev}
            })
    }

    const handleSetImages = (images) => {
        setPayload(prev => {
            prev.images = [...images]
            return {...prev}
        })
    }

    function handleChangeDeal(field, value) {
        setPayload(prev => {
            const deal = {...prev.product?.deal};
            deal[field] = value;
            if (field === 'price') {
                if ((!deal.discountPercent || deal.discountPercent === 0)) {
                    deal.finalPrice = deal.price;
                    deal.discountPercent = 0;
                } else if (deal.finalPrice) deal.discountPercent = Math.trunc(100 - (deal.finalPrice * 100 / deal.price));
                else if (deal.discountPercent) deal.finalPrice = deal.price * (1 - (deal.discountPercent / 100));
            } else if (field === 'finalPrice') {
                if (deal.price) deal.discountPercent = Math.trunc(100 - (deal.finalPrice * 100 / deal.price));
            } else if (field === 'discountPercent') {
                if (deal.price && deal.discountPercent !== 0) deal.finalPrice = deal.price * (1 - (deal.discountPercent / 100));
                if (!deal.finalPrice) deal.finalPrice = deal.price;
            }
            prev.product.deal = deal;
            return {...prev}
        });
    }

    return (
        <div className="flex flex-wrap gap-6">
            <div className="w-4/12 min-h-full">
                <div className="rounded-md bg-white p-5 shadow-md">
                    <Index images={payload?.images} setImages={handleSetImages}/>
                </div>
            </div>
            <div className="flex-1">
                <div className="rounded-md bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between mb-7">
                        <div className="flex items-center">
                            <h5 className="font-bold text-base">
                                Thông tin sản phẩm
                            </h5>
                        </div>
                    </div>
                    <div className="mb-7">
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
                        <div className="flex gap-10">
                            <div>
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
                                            className="flex items-center justify-between gap-3 min-w-max max-w-[300px] min-h-[48px] shadow-md bg-white rounded-md p-3">
                                        <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                            {category?.title || 'Chọn loại sản phẩm'}
                                        </p>
                                        <Icon.UilEditAlt className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    </button>
                                    <Icon.UilAngleRightB
                                        className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    <button onClick={() => setShowSubCategory(true)} disabled={!category?.id}
                                            className="flex items-center justify-between gap-3 min-w-max max-w-[300px] min-h-[48px] shadow-md bg-white rounded-md p-3">
                                        <p className="flex-1 text-black-1 font-medium text-md w-full outline-none">
                                            {subCategory?.title || 'Chọn loại sản phẩm'}
                                        </p>
                                        <Icon.UilEditAlt className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 ">
                                    <Tooltip arrow followCursor
                                             title="Số lượng sản phẩm phải khớp với tổng số lượng của từng phiên bản sản phẩm">
                                        <div className="flex items-center gap-3 max-w-max">
                                            <p className="text-md font-semibold">Số lượng</p>
                                            <Icon.UilInfoCircle className="text-black-2 w-[18px] h-[18px]"/>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="shadow-md bg-white w-full rounded-md p-3">
                                        <input type="number" value={payload.product?.quantity + ""}
                                               onChange={(e) => setPayload((prev) => {
                                                   prev.product.quantity = e.target.value + "";
                                                   return {...prev};
                                               })}
                                               className="text-black-1 font-medium text-md w-full outline-none"/>
                                    </div>
                                    <Tooltip title="Cập nhật số lượng sản phẩm theo phiên bản" arrow>
                                        <button type="button" onClick={handleUpdateQuantity}
                                                className="text-primary bg-primary-bg rounded-full p-1.5 transition-all">
                                            <UilCopy className="w-[20px] h-[20px]"/>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-7">
                        <div className="flex items-center gap-5">
                            <div>
                                <p className="text-md font-semibold mb-2">Giá gốc</p>
                                <div className="shadow bg-white w-full h-[40px] rounded-md px-3">
                                    <CurrencyInput
                                        value={payload.product?.deal?.price || 0}
                                        intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                        className="h-[40px] text-black-1 font-medium text-md w-full outline-none"
                                        onValueChange={(value, name) => handleChangeDeal('price', value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-md font-semibold mb-2">Giá bán</p>
                                <div className="shadow bg-white w-full h-[40px] rounded-md px-3">
                                    <CurrencyInput
                                        value={payload.product?.deal?.finalPrice || 0}
                                        intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                        className="h-[40px] text-black-1 font-medium text-md w-full outline-none"
                                        onValueChange={(value, name) => handleChangeDeal('finalPrice', value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-md font-semibold mb-2">Giảm giá</p>
                                <div className="shadow bg-white w-full h-[40px] rounded-md px-3">
                                    <CurrencyInput
                                        suffix=" %"
                                        value={payload.product?.deal?.discountPercent || 0}
                                        intlConfig={{locale: 'vi-VN', currency: 'VND'}}
                                        className="h-[40px] text-black-1 font-medium text-md w-full outline-none"
                                        onValueChange={(value, name) => handleChangeDeal('discountPercent', value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-7">
                        <div className="mb-2 text-md font-semibold flex items-center gap-3">
                            Từ khóa
                            <div className="text-black-2">
                                <Icon.UilInfoCircle className="w-[18px] h-[18px]"/>
                            </div>
                        </div>
                        <div className="shadow-md bg-white w-full mb-4 rounded-md p-3 min-h-[56px] flex items-center">
                            <div className="flex flex-wrap items-center justify-start gap-3">
                                {payload?.product?.keywords?.split(",").filter(k => !!k).map((keyword, i) => {
                                    return (
                                        <div key={i}
                                             className="pl-2 pr-1.5 shadow rounded font-medium text-tiny py-1.5 flex gap-4 items-center">
                                            {keyword}
                                            <button className="text-red flex items-center justify-end"
                                                    onClick={() => handleRemoveKeywords(i)}>
                                                <Icon.UilTimesCircle
                                                    className="w-[18px] h-[18px] relative top-[.75px]"/>
                                            </button>
                                        </div>
                                    )
                                })}
                                <form onSubmit={handleAddKeywords} className="flex-1 min-w-[200px]">
                                    <input type="text" placeholder="Nhập từ khóa"
                                           onChange={(e) => setKeyword(e.target.value)} value={keyword}
                                           className="w-full text-black-1 font-medium text-md w-full outline-none"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mb-7">
                        <div className="mb-2 text-md font-semibold flex items-center gap-3">
                            Chính sách bán hàng
                            <div>
                                <Icon.UilInfoCircle className="w-[18px] h-[18px]"/>
                            </div>
                        </div>
                        <FormGroup>
                            {returnPolicies.map(returnPolicy => {
                                const active = payload.product.returnPolicies?.filter(p => p.id === returnPolicy.id).length > 0;
                                return (
                                    <div key={returnPolicy.id}>
                                        <FormControlLabel
                                            label={returnPolicy.title}
                                            control={
                                                <Checkbox size="small"
                                                          checked={active}
                                                          onChange={(e) => {
                                                              handleUpdateReturnPolicy(e.target.checked, returnPolicy)
                                                          }}/>
                                            }
                                            sx={{
                                                '.MuiFormControlLabel-label': {
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500'
                                                }
                                            }}/>
                                    </div>
                                )
                            })}
                        </FormGroup>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end gap-3 mt-5">
                    <div
                        className={`${isPublic ? 'bg-primary-bg text-primary' : ' bg-secondary-bg text-secondary'} transition-all flex items-center gap-1 pl-3.5 pr-1 rounded-full`}>
                        <p className="font-semibold text-md">
                            {isPublic ? 'Đăng bán ngay' : 'Tạm lưu'}
                        </p>
                        <Switch
                            checked={isPublic}
                            onChange={() => {
                                setIsPublic(prev => !prev)
                            }}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    </div>
                    <button onClick={submit}
                            className="outline-none flex items-center justify-center gap-2 p-2.5 rounded-md border-2 bg-primary text-white font-semibold text-tiny">
                        <Icon.UilSave className="w-[20px] h-[20px]"/>
                        <span className="leading-3">Lưu sản phẩm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TabProduct;