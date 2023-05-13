import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import {useNavigate, useSearchParams} from "react-router-dom";

function SearchingBar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setSearch(searchParams.get("s"))
        setType(searchParams.get("t"))
    }, [searchParams])

    const handleSearch = (e) => {
        e.preventDefault();
        const {searching, type} = e.target;
        if (searching.value && type.value)
            navigate(`/tim-kiem?s=${searching.value}&t=${type.value}`)
    }
    return (
        <div
            className="border-border-1 border flex-1 rounded-md min-h-[40px] h-[40px] flex bg-white items-center justify-center">
            <form onSubmit={handleSearch} className="flex item-center relative h-full w-full">
                <div className="cursor-pointer">
                    <OptionSearch type={type}/>
                </div>
                <div className="relative">
                    <div
                        className="absolute w-[1px] h-[100%] top-[50%] translate-y-[-50%] bg-border-1"/>
                </div>
                <input type="text" name="searching" defaultValue={search}
                       className="px-3 w-[400px] text-[#666] bg-white text-tiny font-normal bg-white flex-1 focus-visible:outline-none"
                       placeholder="Bạn tìm gì hôm nay"/>
                <div className="w-[60px] h-[40px] flex items-center justify-end">
                    <button type="submit"
                            className="bg-primary w-full h-full rounded-r-md flex items-center justify-center">
                        <Icon.UilSearch className="w-[20px] h-[20px] text-white"/>
                    </button>
                </div>
            </form>
        </div>
    );
}

const OptionSearch = ({type}) => {
    const [active, setActive] = useState(0);
    const options = [
        {value: 'tat-ca', label: 'Tất cả'},
        {value: 'san-pham', label: 'Sản phẩm'},
        {value: 'cua-hang', label: 'Cửa hàng'}
    ]
    useEffect(() => {
        if (!type) return;
        const index = options.findIndex(option => option.value === type);
        if (index !== -1) setActive(index);
    }, [type])

    return (
        <div className="flex items-center justify-center h-full">
            <div className="group relative px-3 pt-1">
                <div className="w-[100px] flex items-center justify-between">
                    <p className="flex-1 line-clamp-1 font-medium text-md">
                        {options[active].label}
                    </p>
                    <input type="text" name="type" value={options[active].value} className="hidden" onChange={() => {
                    }}/>
                    <Icon.UilAngleDown className="w-[20px] h-[20px]"/>
                </div>
                <div
                    className="group-hover:visible group-hover:opacity-100 opacity-0 invisible transition-all absolute top-[100%] left-0 pt-[20px] min-w-max z-[100] ">
                    <div
                        className="relative bg-white flex flex-col shadow-md rounded-md w-[150px] z-[100] overflow-hidden">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => setActive(index)} type="button"
                                    className={`${index === active ? 'text-primary' : 'text-black-1'} px-3 py-1.5 hover:bg-primary-bg hover:text-primary z-[100] font-medium text-md p-1 cursor-pointer z-50 flex items-center justify-between gap-3`}>
                                {option.label}
                                {index === active &&
                                    <Icon.UilCheck className="w-[20px] h-[20px] text-primary"/>
                                }
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchingBar;