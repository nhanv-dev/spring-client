import * as Icon from "@iconscout/react-unicons";
import {formatToSlug} from "../../../util/format";

function ProductAttributes({attributes, setAttributes}) {

    function handleAddAttribute() {
        setAttributes(prev => [...prev, {
            attributeId: prev.length,
            name: "",
            options: [{attributeId: prev.length, name: "", image: ""}]
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
                if (attr === attribute) attr.options = [...attr.options, {
                    attributeId: attr.attributeId,
                    name: "",
                    value: "",
                    image: "",
                }];
                return attr;
            })
        })
    }

    function handleRemoveOption(attribute, option) {
        setAttributes(prev => {
            return prev.map(attr => {
                attr.options = attr.options.filter(opt => opt !== option);
                return attr;
            });
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
                    opt.value = formatToSlug(opt.name)
                    return opt;
                })
                return attr;
            })
        })
    }

    return (
        <div className="rounded-md bg-white p-5 shadow-md">
            <div className="flex items-center justify-between mb-5">
                <h5 className="text-base font-bold">
                    Các tùy chọn ({attributes.length})
                </h5>
                <button onClick={handleAddAttribute}
                        className="text-md font-medium flex items-center gap-1 py-1 pl-1.5 pr-3 bg-primary-bg text-primary rounded-full">
                    <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                    Tạo mới
                </button>
            </div>
            <div className="">
                {attributes.length === 0 ?
                    <div className="mx-auto font-semibold text-black-1 text-center py-5">
                        Hiện chưa có tùy chọn nào cho sản phẩm
                    </div> :
                    <div className="max-h-[350px] overflow-auto scroll-component">
                        {
                            attributes.map((attribute, i) => {
                                return (
                                    <div key={i} className="bg-app-1 p-5 rounded-md mb-5 relative">
                                        <button onClick={() => handleRemoveAttribute(attribute)} tabIndex={-1}
                                                className="absolute top-0 right-0 m-2 text-red rounded-full">
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
                                        <p className="mb-2 text-md font-semibold">Các tùy chọn
                                            ({attribute.options.length})</p>
                                        <div className="flex flex-wrap items-center justify-start gap-5">
                                            {attribute.options?.map((option, i) => (
                                                <div key={i}
                                                     className="relative shadow bg-white rounded-md flex items-center max-w-[200px] gap-1.5 py-2 px-2">
                                                    <div
                                                        className="group relative min-w-[55px] min-h-[55px] max-w-[55px] max-h-[55px] flex items-center justify-center">
                                                        <img className="w-full rounded-md" alt="option thumbnail"
                                                             src={option.image || "https://preview.keenthemes.com/metronic8/demo7/assets/media/svg/files/blank-image.svg"}/>
                                                        {option.image ?
                                                            <div
                                                                className="absolute left-0 right-0 top-0 bottom-0 bg-[rgba(255,255,255,.6)] group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-all">
                                                                <button
                                                                    className="z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-red rounded-full">
                                                                    <Icon.UilMinusCircle className="w-[22px] h-[22px]"/>
                                                                </button>
                                                            </div> :
                                                            <div
                                                                className=" absolute left-0 right-0 top-0 bottom-0 bg-[rgba(255,255,255,.6)] group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-all">
                                                                <button
                                                                    className="z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-primary rounded-full">
                                                                    <Icon.UilPlusCircle className="w-[22px] h-[22px]"/>
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                    <input type="text" value={option.name}
                                                           placeholder={attribute.name || "Tùy chọn"}
                                                           onChange={(e) => handleChangeValueOption(attribute, option, "name", e.target.value)}
                                                           className="rounded-md px-1 text-black-1 font-medium text-md w-full outline-none"/>
                                                    <div className="absolute top-[-7px] right-[-7px]">
                                                        <button tabIndex={-1}
                                                                onClick={() => handleRemoveOption(attribute, option)}
                                                                className="text-red bg-white rounded-full">
                                                            <Icon.UilMinusCircle className="w-[20px] h-[20px]"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => handleAddOption(attribute)}
                                                    className="text-md font-medium flex items-center gap-1 bg-primary-bg text-primary rounded-full flex items-center">
                                                <Icon.UilPlusCircle className="w-[22px] h-[22px]"/>
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

