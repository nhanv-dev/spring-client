import {useEffect} from 'react';
import * as Icon from "@iconscout/react-unicons";


function ProductAttributes({attributes, setAttributes}) {
    function handleAddAttribute() {
        setAttributes(prev => [...prev, {
            name: "",
            options: [{
                name: "",
                image: 'https://salt.tikicdn.com/cache/100x100/ts/product/d5/0d/ec/de71368cd89c977162821b14a30d64b4.jpg.webp'
            }]
        }])
    }

    function handleRemoveAttribute(attribute) {
        setAttributes(prev => {
            return prev.filter(attr => attr !== attribute)
        })
    }

    function handleAddOption(attribute) {
        setAttributes(prev => {
            return prev.map(attr => {
                if (attr === attribute) attr.options = [...attr.options, {name: ""}];
                return attr;
            })
        })
    }

    function handleChangeValueAttribute(attribute, field, value) {
        setAttributes(prev => {
            return prev.map(attr => {
                if (attr === attribute) attr[field] = value;
                return attr;
            })
        })
    }

    function handleChangeValueOption(attribute, option, field, value) {
        setAttributes(prev => {
            return prev.map(attr => {
                if (attr !== attribute) return attr
                attr.options = attr.options?.map(opt => {
                    if (opt === option) opt[field] = value;
                    return opt;
                })
                return attr;
            })
        })
    }

    useEffect(() => {
        console.log(attributes)
    }, [attributes])

    return (
        <div className="rounded-md bg-white p-5 shadow-md">
            <div className="flex items-center justify-between mb-5">
                <h5 className="text-base font-bold">
                    Các tùy chọn
                </h5>
                <button onClick={handleAddAttribute}
                        className="text-md font-medium flex items-center gap-1 py-1 pl-1.5 pr-3 bg-primary-1-hover text-primary rounded-full">
                    <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                    Tạo mới
                </button>
            </div>
            <div className="">
                {attributes.length === 0 ?
                    <div className="mx-auto font-medium text-black-1 text-center py-5">
                        Hiện chưa có tùy chọn nào cho sản phẩm
                    </div> :
                    <div className=" overflow-auto scroll-component">
                        {
                            attributes.map((attribute, i) => {
                                return (
                                    <div key={i} className="bg-app-1 p-5 rounded-md mb-5 relative">
                                        <button onClick={() => handleRemoveAttribute(attribute)}
                                                className="absolute top-0 right-0 m-2 bg-primary-1-hover text-red rounded-full">
                                            <Icon.UilTimesCircle className="w-[24px] h-[24px]"/>
                                        </button>
                                        <div className="mb-3">
                                            <p className="mb-2 text-md font-semibold">Thuộc tính {i + 1}</p>
                                            <div className="shadow bg-white w-full rounded-md">
                                                <input type="text" value={attribute.name} placeholder="Thuộc tính"
                                                       onChange={(e) => handleChangeValueAttribute(attribute, "name", e.target.value)}
                                                       className="rounded-md p-2 text-black-1 font-medium text-md w-full outline-none"/>
                                            </div>
                                        </div>
                                        <p className="mb-2 text-md font-semibold">Các tùy chọn</p>
                                        <div className="flex flex-wrap items-center justify-start gap-5">
                                            {attribute.options?.map((option, i) => (
                                                <div key={i}
                                                     className="group relative shadow bg-white rounded-md flex items-center max-w-[180px] flex gap-3 items-center py-1 px-3">
                                                    <input type="text" value={option.name} placeholder="Tùy chọn"
                                                           onChange={(e) => handleChangeValueOption(attribute, option, "name", e.target.value)}
                                                           className="rounded-md text-black-1 font-medium text-md w-full outline-none"/>
                                                    <div className="absolute top-0 right-0 translate-y-[-50%]">
                                                        <div className="flex gap-1 items-center justify-end">
                                                            <button onClick={() => handleAddOption(attribute)}
                                                                    className="bg-primary-1-hover text-primary rounded-full">
                                                                <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                                                            </button>
                                                            <button onClick={() => handleAddOption(attribute)}
                                                                    className="bg-primary-1-hover text-primary rounded-full">
                                                                <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => handleAddOption(attribute)}
                                                    className="text-md font-medium flex items-center gap-1 py-1 pl-1.5 pr-2.5 bg-primary-1-hover text-primary rounded-full flex items-center">
                                                <Icon.UilPlusCircle className="w-[20px] h-[20px] mt-[1px]"/>
                                                <p className="mt-[1px]">Thêm</p>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
        ;
}

export default ProductAttributes;

