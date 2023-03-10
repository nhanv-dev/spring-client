import React, {useEffect, useRef, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";

function ProductVariants(props) {
    const {options, combinations, setOptions, setCombinations} = props;

    const handleAddOptions = () => {
        setOptions(prev => [...prev, {option: {name: ""}, values: [{name: ""}]}])
    }

    return (
        <div className="w-full max-w-full flex gap-6">
            <div className="w-4/12">
                <div className="rounded-[6px] bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="text-base font-bold">
                            Các tùy chọn
                        </h5>
                        <button onClick={handleAddOptions}
                                className="text-md font-medium flex items-center gap-1 py-1 pl-1.5 pr-3 bg-[#D8EAFF] text-[#1CAC93] rounded-full">
                            <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                            Tạo mới
                        </button>
                    </div>
                    <div className="">
                        {options.length === 0 ?
                            <button className="mb-5 font-medium text-black-1 text-center py-5">
                                Hiện chưa có tùy chọn nào
                            </button> :
                            <OptionsComponent options={options} setOptions={setOptions}/>
                        }
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="w-full max-w-full rounded-[6px] bg-white p-5 shadow-md">
                    <ProductCombinations options={options}
                                         setOptions={setOptions}
                                         combinations={combinations}
                                         setCombinations={setCombinations}/>
                </div>
            </div>
        </div>
    );
}

const OptionsComponent = ({options, setOptions}) => {

    const addOptionValue = (positionOption) => {
        const data = [...options];
        data[positionOption].values.push({name: ""});
        setOptions(data);
    }

    const removeOptionValue = (positionOption, positionValue) => {
        const data = [...options]
        data[positionOption].values = data[positionOption].values.filter((value, index) => index !== positionValue);
        setOptions(data);
    }

    const changeOptionValue = (positionOption, positionValue, value) => {
        const data = [...options];
        data[positionOption].values[positionValue].name = value;
        setOptions(data);
    }

    const changeOptionName = (positionOption, value) => {
        const data = [...options];
        data[positionOption].option.name = value;
        setOptions(data);
    }

    return (
        <div>
            {options.map((item, index) => {
                return (
                    <div key={index} className="relative rounded-[5px] bg-[#FAFAFA] p-3 mb-5"
                         style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 5%)"}}>
                        <button onClick={() => addOptionValue(index)}
                                className="absolute right-[-8px] top-[-8px] text-primary-hover bg-white rounded-full">
                            <Icon.UilMinusCircle className="w-[24px] h-[24px]"/>
                        </button>
                        <div className="flex items-start gap-10">
                            <div className="min-w-[100px] max-w-[100px]">
                                <OptionInput value={item.option?.name || ""}
                                             positionOption={index}
                                             changeOptionName={changeOptionName}
                                />
                            </div>
                            <div className="min-w-[250px] max-w-[250px] flex flex-wrap items-center gap-3">
                                {item.values?.map((value, i) => (
                                    <ValueInput key={i}
                                                value={value.name || ""}
                                                positionOption={index} positionValue={i}
                                                changeOptionValue={changeOptionValue}
                                                removeOptionValue={removeOptionValue}
                                    />
                                ))}
                                <div className="max-w-max flex items-center h-[32px] font-medium text-md">
                                    <button onClick={() => addOptionValue(index)}
                                            className="bg-[#D8EAFF] text-[#1CAC93] rounded-full">
                                        <Icon.UilPlusCircle className="w-[24px] h-[24px]"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const OptionInput = ({value, positionOption, changeOptionName}) => {
    const ref = useRef(null);

    const handleChangeValue = (e) => {
        changeOptionName(positionOption, e.target.value)
        if (!e.target.value) {
            ref.current.style.width = `38px`;
            ref.current.style.height = `20px`;
        }
    }
    useEffect(() => {
        ref.current.style.width = `${((value.length + 1) * 8) + 30}px`;
        ref.current.style.height = `20px`;
    }, [])

    useEffect(() => {
        ref.current.style.width = `${((value.length + 1) * 8) + 30}px`;
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }, [ref, value])

    return (
        <div className="bg-white rounded-[5px] px-2 py-0.5 border-2 border-[#1CAC93] max-w-full overflow-hidden">
                <textarea value={value} onChange={handleChangeValue} style={{resize: "none"}}
                          className="relative top-[1px] text-center text-sm font-semibold leading-[20px] outline-none break-all min-w-full max-w-full min-h-[24px] flex items-center justify-center"
                          ref={ref}/>
        </div>
    )
}

const ValueInput = ({value, positionOption, positionValue, changeOptionValue, removeOptionValue}) => {
    const ref = useRef(null);

    const handleChangeValue = (e) => {
        changeOptionValue(positionOption, positionValue, e.target.value)
        if (!e.target.value) {
            ref.current.style.width = `38px`;
            ref.current.style.height = `20px`;
        }
    }

    const handleRemoveOptionValue = () => {
        removeOptionValue(positionOption, positionValue)
    }

    useEffect(() => {
        ref.current.style.width = `${((value.length + 1) * 8) + 30}px`;
        ref.current.style.height = `20px`;
    }, [])

    useEffect(() => {
        ref.current.style.width = `${((value.length + 1) * 8) + 30}px`;
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }, [ref, value])

    return (
        <div
            className="group relative bg-white rounded-[5px] px-2 py-0.5 border-2 border-[#1CAC93] max-w-[250px]">
                <textarea value={value} onChange={handleChangeValue} style={{resize: "none"}}
                          className="relative top-[1px] text-center text-sm font-medium leading-[20px] outline-none break-all max-w-full min-h-[24px] flex items-center justify-center"
                          ref={ref}/>
            <button onClick={handleRemoveOptionValue}
                    className="group-hover:opacity-100 group-hover:visible transition-all opacity-0 invisible absolute right-[-11px] top-[-11px] z-50 rounded-full w-[22px] h-[22px] text-primary-hover bg-white flex items-center justify-center">
                <Icon.UilMinusCircle className="w-[22px] h-[22px]"/>
            </button>
        </div>
    )
}




const ProductCombinations = ({options, combinations, setCombinations}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModalCombination, setShowModalCombination] = useState(false);

    useEffect(() => {
        handleAddCombination();
    }, [])

    const handleAddCombination = () => {
        const combination = {
            sku: "",
            combinationString: "",
            options: [],
            price: 0,
            stock: 0,
        }
        setCombinations(prev => [combination, ...prev])
    }

    const handleRemoveCombination = (position) => {
        setCombinations(prev => [...prev].filter((item, index) => index !== position))
    }

    const handleUpdateCombination = (data, index) => {
        const payload = [...combinations];
        payload[index] = data;
        setCombinations(payload)
    }

    return (
        <div className="w-full max-w-full">
            <div className="mb-5 flex items-center justify-between gap-5">
                <h5 className="text-base font-bold">
                    Mục sản phẩm tùy chọn
                </h5>
                <div className="flex items-center justify-end gap-3">
                    <button onClick={handleAddCombination}
                            className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-[#D8EAFF] text-[#1CAC93] rounded-full">
                        <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                        Tạo mới
                    </button>
                    <button
                        className="text-md font-medium flex items-center gap-1 py-1 pl-2 pr-2.5 bg-[#D8EAFF] text-[#1CAC93] rounded-full">
                        <Icon.UilBolt className="w-[20px] h-[20px]"/>
                        Tạo tự động
                    </button>
                </div>
            </div>
            <div className="w-full max-w-full p-5 bg-[#f5f5f5] rounded-[5px]">
                <ModalCreatingCombination showModalCombination={showModalCombination}
                                          setShowModalCombination={setShowModalCombination}
                                          combinations={combinations} setCombinations={setCombinations}
                                          activeIndex={activeIndex} options={options}/>
                <div className="w-full max-w-full">
                    <div className="flex items-center gap-7 justify-between px-2">
                        <div className="font-medium text-[.85rem] min-w-[20px] text-left">#</div>
                        <div className="flex-1 min-w-[150px] text-left font-medium text-[.85rem]">Tùy chọn</div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-center">Trạng thái</div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-center">Số lượng</div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-left">Giá</div>
                        <div className="font-medium text-[.85rem] min-w-[100px] text-right">Thao tác</div>
                    </div>
                    {combinations.map((combination, index) => (
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
                            <div className="font-medium text-md min-w-[100px] flex items-center justify-center">
                                <p className="text-[11px] rounded-full bg-primary-hover max-w-max px-2 py-[2px] font-bold text-white">Đang
                                    cập nhật</p>
                            </div>
                            <div className="font-medium text-tiny w-[100px]">
                                <input type="number" value={combination.stock}
                                       onChange={(e) => {
                                           const data = {...combination, stock: e.target.value}
                                           handleUpdateCombination(data, index)
                                       }}
                                       className="py-1.5 px-3 w-full rounded-[5px] text-center shadow-md"/>
                            </div>
                            <div className="font-medium text-tiny w-[100px]">
                                <input type="number" value={combination.price}
                                       onChange={(e) => {
                                           const data = {...combination, price: e.target.value}
                                           handleUpdateCombination(data, index)
                                       }}
                                       className="py-1.5 px-3 w-full rounded-[5px] text-left shadow-md"/>
                            </div>
                            <div className="font-medium text-md min-w-[100px] flex items-center justify-end">
                                <button onClick={() => handleRemoveCombination(index)}
                                        className="rounded-full w-[20px] h-[20px] text-primary-hover bg-white flex items-center justify-start">
                                    <Icon.UilMinusCircle className="w-[20px] h-[20px]"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ModalCreatingCombination = (props) => {
    const {combinations, setCombinations, options, showModalCombination, setShowModalCombination, activeIndex} = props;
    const [combination, setCombination] = useState({})

    useEffect(() => {
        setCombination({...combinations[activeIndex]})
    }, [combinations, activeIndex])

    const handleSetCombinations = (item) => {
        const items = [...combinations]
        items[activeIndex] = item;
        setCombinations(items)
    }

    return (
        <>
            <div onClick={() => setShowModalCombination(false)}
                 className={`fixed top-0 left-0 right-0 bottom-0 z-[50] after:absolute after:bg-[#000] after:opacity-40 after:top-0 after:left-0 after:right-0 after:bottom-0 transition-all ${showModalCombination ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            </div>
            <div
                className={`shadow-md rounded-[5px] z-[50] bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[600px] max-w-[600px] p-5 ${showModalCombination ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                <button onClick={() => setShowModalCombination(false)}
                        className="absolute z-[60] right-[-10px] top-[-10px] w-[26px] h-[26px] flex items-center justify-center bg-primary-hover text-white rounded-full">
                    <Icon.UilTimes className="w-[18px] h-[18px]"/>
                </button>
                <div className="flex flex-wrap gap-3 items-center">
                    <div
                        className="flex-1 text-black-1 font-medium text-sm mb-5 flex items-center justify-start gap-3 flex-wrap">
                        <p className="flex items-center gap-2">
                            <Icon.UilQrcodeScan className="w-[18px] h-[18px]"/>Mã:
                        </p>
                        <p>{combination.combinationString || "Chưa xác định"}</p>
                    </div>
                    <div
                        className="flex-1 text-black-1 font-medium text-sm mb-5 flex items-center justify-start gap-3 flex-wrap">
                        <p>SKU:</p>
                        <p>{combination.sku || "Chưa xác định"}</p>
                    </div>
                </div>
                <div className="flex items-center justify-start flex-wrap gap-8">
                    {options.filter(option => !!option.option.name).map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <p className="min-w-max text-tiny font-semibold text-black-1">
                                {option.option.name}:
                            </p>
                            <OptionsColumn option={option}
                                           options={options}
                                           combination={combination}
                                           setCombination={setCombination}
                                           handleSetCombinations={handleSetCombinations}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const OptionsColumn = ({option, options, combination, setCombination, handleSetCombinations}) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        setArray(option.values.filter(value => !!value.name).map((value) => (
            {value: value.name, label: value.name, type: option.option.name}
        )))
    }, [option, options])

    const changeOptions = (data) => {
        const item = {...combination};
        item.options = item.options.filter(option => option.type !== data.type);
        item.options.push(data);
        item.combinationString = item.options.map(option => (option?.value)).join(" + ");
        setCombination(item);
        handleSetCombinations(item)
    }

    const selectDefaultValue = () => {
        return combination?.options?.filter(item => item.type === option.option.name);
    }

    return (
        <div className="text-left font-medium text-sm">
            <Select options={array} name={option.option.name}
                    value={selectDefaultValue()}
                    onChange={(data) => changeOptions(data)}
                    className="outline-none"/>
        </div>
    )
}

export default ProductVariants;