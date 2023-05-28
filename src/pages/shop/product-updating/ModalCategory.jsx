import {useEffect, useState} from 'react';
import {publicRequest} from "../../../util/request-method";
import * as Icon from "@iconscout/react-unicons";

function ModalCategory(props) {
    const [categories, setCategories] = useState();

    useEffect(() => {
        if (props.showSubCategory || props.showCategory) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
    }, [props.showSubCategory, props.showCategory])

    useEffect(() => {
        if (!props.showSubCategory || !props.category) return;
        publicRequest().get(`/categories/${props.category.id}/sub-categories`)
            .then(res => {
                setCategories(res.data)
            })
    }, [props.category, props.showSubCategory])

    useEffect(() => {
        if (!props.showCategory) return;
        publicRequest().get(`/categories?type=short`)
            .then(res => {
                setCategories(res.data)
            })
    }, [props.showCategory])

    const handleClose = () => {
        props.setShowCategory(false)
        props.setShowSubCategory(false)
    }

    const handleSetCategory = (index) => {
        if (props.showCategory) {
            props.setCategory(categories[index])
            props.setSubCategory(null)
        }
        if (props.showSubCategory) props.setSubCategory(categories[index])
        handleClose()
    }
    return (
        <div onClick={handleClose}
             className={`fixed top-0 left-0 right-0 bottom-0 z-[50] after:absolute after:bg-[#000] after:opacity-40 after:top-0 after:left-0 after:right-0 after:bottom-0 transition-all ${props.showCategory || props.showSubCategory ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            <div
                className="shadow-md rounded-[5px] z-[50] bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[400px]">
                <div className="p-3">
                    <p className="font-semibold text-base mb-5">
                        Chọn loại sản phẩm
                    </p>
                    <div className="max-h-[300px] overflow-y-auto scroll-component">
                        {categories?.map((cate, index) => (
                            <button key={index} onClick={() => handleSetCategory(index)}
                                    className="block transition-all rounded-[4px] font-medium text-md hover:text-primary hover:bg-primary-1-hover px-3 py-2 w-full text-left">
                                {cate.title}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleClose}
                        className="absolute z-[60] right-[-10px] top-[-10px] w-[26px] h-[26px] flex items-center justify-center bg-danger text-white rounded-full">
                    <Icon.UilTimes className="w-[18px] h-[18px]"/>
                </button>
            </div>
        </div>

    );
}

export default ModalCategory;
