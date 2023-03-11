import {useEffect, useRef, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";

import React from 'react';

function ProductAttributes({options}) {
    function handleAddOptions() {
        
    }
    return (
        <div className="rounded-md bg-white p-5 shadow-md">
            <div className="flex items-center justify-between mb-5">
                <h5 className="text-base font-bold">
                    Các tùy chọn
                </h5>
                <button onClick={handleAddOptions}
                        className="text-md font-medium flex items-center gap-1 py-1 pl-1.5 pr-3 bg-primary-1-hover text-[#1CAC93] rounded-full">
                    <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                    Tạo mới
                </button>
            </div>
            <div className="">
                {options.length === 0 ?
                    <button className="mb-5 font-medium text-black-1 text-center py-5">
                        Hiện chưa có tùy chọn nào
                    </button> :
                    <div></div>
                }
            </div>
        </div>
    );
}

export default ProductAttributes;

