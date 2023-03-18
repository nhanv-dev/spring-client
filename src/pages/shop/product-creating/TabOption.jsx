import React, {useContext, useEffect, useState} from 'react';
import ProductAttributes from "./ProductAttributes";
import ProductVariants from "./ProductVariants";
import {PayloadContext} from "./index";
import * as Icon from "@iconscout/react-unicons";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function TabOption() {
    const {payload, setPayload} = useContext(PayloadContext);
    const [attributes, setAttributes] = useState([...payload?.attributes]);
    const [variants, setVariants] = useState([...payload?.variants]);
    const [selectedVariant, setSelectedVariant] = useState({});
    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        setPayload(prev => ({...prev, attributes}))
    }, [attributes, setPayload])

    useEffect(() => {
        setAttributes(prev => {
            prev = prev.map(attr => {
                attr.options = attr.options.map(option => {
                    if (option === selectedOption) option.name = selectedOption.name
                    return option
                })
                return attr;
            })
            return prev;
        })
    }, [selectedOption])

    return (
        <div className="flex flex-wrap gap-6">
            <div className="w-8/12">
                <div className="mb-6">
                    <ProductAttributes
                        attributes={attributes} setAttributes={setAttributes}
                        setSelectedOption={setSelectedOption}

                    />
                </div>
                <div className="mb-6">
                    <ProductVariants
                        attributes={attributes} setAttributes={setAttributes}
                        variants={variants} setVariants={setVariants}
                        setSelectedVariant={setSelectedVariant}
                    />
                </div>
            </div>
            <div className="flex-1">
                <div className="mb-6">
                    <div className="w-full max-w-full rounded-md bg-white p-5 shadow-md">
                        <p className="font-semibold text-md mb-5">
                            Chi tiết thuộc tính tùy chọn
                        </p>
                        {selectedOption && <div className="flex flex-wrap gap-5">
                            <div className="relative min-w-[100px] min-h-[100px] border rounded-md border-border-1">
                                <div className="w-full h-full bg-cover bg-center rounded-md"
                                     style={{backgroundImage: `url(${selectedOption.image || 'https://preview.keenthemes.com/metronic8/demo7/assets/media/svg/files/blank-image.svg'})`}}>
                                </div>
                                <button type="button"
                                        className="z-50 absolute top-[5px] right-[5px] bg-primary-bg text-primary p-1 rounded-full w-[32px] h-[32px] flex items-center justify-center">
                                    <Icon.UilImagePlus className="w-[18px] h-[18px]"/>
                                </button>
                            </div>
                            <div className="flex-1">
                                <div className="mb-5 shadow bg-white w-full rounded-md">
                                    <input type="text" value={selectedOption.name} placeholder="Tùy chọn"
                                           onChange={(e) => {
                                               setSelectedOption(prev => {
                                                   prev.name = e.target.value;
                                                   return {...prev};
                                               })
                                           }}
                                           className="rounded-md p-2 text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => {
                                    }} type="button"
                                            className="outline-none flex items-center justify-center gap-1.5 p-1 px-3 rounded border-2 text-secondary font-semibold text-sm">
                                        <span className="">Hủy</span>
                                    </button>
                                    <button onClick={() => {
                                    }} type="button"
                                            className="outline-none flex items-center justify-center gap-1.5 p-1 px-3 rounded border-2 text-red font-semibold text-sm">
                                        <Icon.UilTrashAlt className="relative top-[-.5px] w-[18px] h-[18px]"/>
                                        <span className="">Xóa</span>
                                    </button>
                                    <button onClick={() => {
                                    }} type="button"
                                            className="outline-none flex items-center justify-center gap-1.5 p-1 px-3 rounded border-2 text-primary font-semibold text-sm">
                                        <Icon.UilSave className="relative top-[-.5px] w-[18px] h-[18px]"/>
                                        <span className="">Lưu</span>
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="mb-6">
                    <div className="w-full max-w-full rounded-md bg-white p-5 shadow-md">
                        <p className="font-semibold text-md mb-5">
                            Chi tiết thuộc tính tùy chọn
                        </p>
                        <div>
                            {attributes.map((attribute, i) => (<div key={i}>
                                    {attribute.name &&
                                        <div className="flex items-center justify-between gap-5 flex-wrap">
                                            <p className="rounded-md font-semibold text-md text-black-1">
                                                {attribute.name}
                                            </p>
                                            {attribute.options.length === 0 ?
                                                <div></div> :
                                                <FormControl sx={{minWidth: 120}} size="small">
                                                    <InputLabel
                                                        id="demo-simple-select-standard-label">{attribute.name}</InputLabel>
                                                    <Select labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard" label={attribute.name}
                                                            value={""}>
                                                        {attribute.options.map((option, j) => (
                                                            <MenuItem value={option} key={j} sx={{
                                                                fontSize: ".875rem"
                                                            }}>
                                                                {option.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            }
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabOption;