import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Icon from '@iconscout/react-unicons';

const Category = ({categories}) => {
    const [list, setList] = useState();

    useEffect(() => {
        setList(categories[0]?.subCategories)
    }, [categories])

    return (
        <div
            className="min-w-full bg-white z-50 group-hover:opacity-100 group-hover:visible opacity-0 invisible shadow-md transition-all absolute top-full left-0 rounded-md mt-3 after:absolute after:bottom-full after:left-0 after:right-0 after:bg-[transparent] after:h-3">
            <div className="flex">
                <div className="min-w-max p-3">
                    {categories.map((category, index) => (
                        <Link to={`/danh-muc/${category.slug}`} key={index}
                              onMouseEnter={() => setList(category.subCategories)}
                              className='hover:text-primary hover:bg-primary-bg bg-transparent rounded-md flex justify-between items-center text-tiny font-medium text-gray px-2.5 py-1.5 w-full transition-all'>
                            <div className="flex items-center gap-4">
                                {/*<img alt="icon" className="w-[32px] h-[32px]"*/}
                                {/*     src={category.image || "https://cf.shopee.vn/file/vn-50009109-1975fb1af4ae3c22878d04f6f440b6f9_xhdpi"}/>*/}
                                {category.title}
                            </div>
                            <Icon.UilAngleRight className="ml-10"/>
                        </Link>
                    ))}
                    <Link to={`/danh-muc`}
                          className='hover:text-primary hover:bg-primary-bg bg-transparent rounded-md flex justify-between items-center text-tiny font-medium text-gray px-2.5 py-1.5 w-full transition-all'>
                        <div className="flex items-center gap-4">
                            {/*<img alt="icon" className="w-[32px] h-[32px]"*/}
                            {/*     src={"https://cf.shopee.vn/file/vn-50009109-1975fb1af4ae3c22878d04f6f440b6f9_xhdpi"}/>*/}
                            Xem thêm
                        </div>
                        <Icon.UilAngleRight className="ml-10"/>
                    </Link>

                </div>
                <SubCategories categories={list}/>
            </div>
        </div>
    )
}
const SubCategories = ({categories}) => {

    return (
        <div
            className={`w-full bg-primary-bg transition-all rounded-r-md`}>
            <div className="grid grid-cols-4 gap-x-8 gap-y-3 w-full max-w-full p-5">
                {categories?.map((category, index) => {
                    return (
                        <div className="min-w-max" key={index}>
                            <Link to={`/danh-muc/${category.slug}`}
                                  className="text-md font-medium text-black-1 hover:text-primary line-clamp-1">
                                {category.title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Category;