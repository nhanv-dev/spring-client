import {useContext, useEffect, useState} from 'react';
import ProductAttributes from "./ProductAttributes";
import ProductVariants from "./ProductVariants";
import {PayloadContext} from "./index";
import * as Icon from "@iconscout/react-unicons";
import ModalOption from "./ModalOption";
import {similarArray} from "../../../util/array";
import toast from "react-hot-toast";

function TabOption() {
    const {payload, setPayload} = useContext(PayloadContext);
    const [attributes, setAttributes] = useState([...payload?.attributes]);
    const [variants, setVariants] = useState([...payload?.variants]);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        setPayload(prev => ({...prev, attributes}))
    }, [attributes, setPayload])

    useEffect(() => {
        setPayload(prev => ({...prev, variants}))
    }, [variants, setPayload])


    return (
        <div className="w-full">
            <div className="mb-6">
                <ProductAttributes attributes={attributes} setAttributes={setAttributes}/>
            </div>
            <div className="">
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <ProductVariants
                            attributes={attributes}
                            variants={variants} setVariants={setVariants}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                        />
                    </div>
                    <div className="flex-1">
                        <Variant
                            attributes={attributes}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                            variants={variants} setVariants={setVariants}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Variant = ({attributes, selectedVariant, setSelectedVariant, variants, setVariants}) => {
    const [show, setShow] = useState(false)
    const [newVariant, setNewVariant] = useState({
        attributeHash: "",
        skuUser: "",
        price: 0,
        finalPrice: 0,
        discountPercent: 0,
        options: [],
    });

    useEffect(() => {
        if (!selectedVariant) return;
        setVariants(prev => {
            return prev.map(v => {
                if (v.indexing === selectedVariant.indexing) v = selectedVariant;
                return v;
            })
        })
    }, [selectedVariant, setVariants])

    function handleAddVariant(variant) {
        if (variant.options.length < attributes.length) return;
        const similarOptions = variants.filter(v => {
            return similarArray(v.options, variant.options)
        })
        if (similarOptions.length > 0) {
            toast.error('Đã tồn tại phiên bản này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setVariants(prev => {
            return [...prev.filter(v => v !== variant), {
                indexing: prev.length, ...variant,
                attributeHash: variant.options.map(o => o.id).join("_"),
                skuUser: variant.options.map(o => o.name).join(" + "),
            }]
        })
        setNewVariant({
            attributeHash: "",
            skuUser: "",
            price: 0,
            finalPrice: 0,
            discountPercent: 0,
            options: [],
        })
    }

    function handleChangeOption(value) {
        if (selectedVariant) {
            setSelectedVariant(prev => {
                const options = prev.options.filter(opt => opt.attributeId !== value.attributeId);
                const similarOptions = variants.filter(v => {
                    if (v.indexing === selectedVariant.indexing) return false;
                    return similarArray(v.options, [...options, value])
                })
                if (similarOptions.length > 0) {
                    toast.error('Đã tồn tại phiên bản này', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return {...prev};
                }
                return {...prev, options: [...options, value]};
            })
        } else {
            setNewVariant(prev => {
                const options = prev.options.filter(opt => opt.attributeId !== value.attributeId)
                return {...prev, options: [...options, value]}
            })
        }
    }

    function showSelectedOption(attribute) {
        const option = (selectedVariant || newVariant).options.filter(opt => opt.attributeId === attribute.attributeId)
        if (option.length <= 0) return null;
        const selectedOption = attribute.options.filter(opt => opt === option[0])
        if (selectedOption.length <= 0) return null;
        return selectedOption[0].name;
    }

    return (
        <div className="w-full max-w-full rounded-md bg-white p-5 shadow-md">
            <p className="font-semibold text-md mb-5">
                Cài đặt phiên bản sản phẩm
            </p>
            <div className="mb-6">
                {attributes.map((attribute, i) => {
                    return (
                        <div key={i} className="flex items-center justify-between gap-5 flex-wrap mb-5">
                            <p className="rounded-md font-semibold text-md text-black-1">
                                {attribute.name || `Thuộc tính ${i + 1}`}
                            </p>
                            {(attribute.name && attribute.options.length > 0) ?
                                <div className="min-w-[180px] relative">
                                    <button onClick={() => {
                                        setShow(attribute.attributeId)
                                    }} type="button"
                                            className="flex-1 flex items-center justify-between gap-3 w-full shadow-md bg-white rounded-md px-3 py-2">
                                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                            {showSelectedOption(attribute) || `Chọn ${attribute.name}`}
                                        </p>
                                        <Icon.UilAngleDown className="w-[24px] h-[24px] min-w-[24px] min-h-[24px]"/>
                                    </button>
                                    <ModalOption show={show === attribute.attributeId}
                                                 setShow={setShow}
                                                 list={attribute.options}
                                                 select={handleChangeOption}/>
                                </div> :
                                <div className="font-semibold text-tiny">
                                    Chưa thêm tùy chọn
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-end gap-3">
                {
                    selectedVariant ?
                        <>
                            <button onClick={() => {
                            }} type="button"
                                    className="outline-none flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border-2 text-red font-semibold text-sm">
                                <Icon.UilTrashAlt className="relative top-[-.5px] w-[18px] h-[18px]"/>
                                <span className="">Xóa</span>
                            </button>
                            <button onClick={() => setSelectedVariant(null)} type="button"
                                    className="outline-none flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border-2 text-primary font-semibold text-sm">
                                <span className="">Hoàn tất</span>
                            </button>
                        </> :
                        <>
                            <button onClick={() => {
                                handleAddVariant(newVariant)
                            }} type="button"
                                    className="outline-none flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border-2 text-primary font-semibold text-sm">
                                <Icon.UilSave className="relative top-[-.5px] w-[18px] h-[18px]"/>
                                <span className="">Thêm mới</span>
                            </button>
                        </>
                }
            </div>
        </div>
    )
}

export default TabOption;