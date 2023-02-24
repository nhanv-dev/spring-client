import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Icon from '@iconscout/react-unicons';

const Category = ({categories}) => {
    const [hover, setHover] = useState(null);

    return (
        <div
            className="max-w-[250px] bg-white z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible shadow-tiny transition-all absolute top-full left-0 rounded-[4px] mt-3">
            {categories.map((category, index) => (
                <Link to={`/danh-muc/${category.slug}`} key={index}
                      className='hover:text-primary hover:bg-[#fde5e4] text-black bg-transparent text-black bg-transparent flex justify-between items-center text-[.9rem] font-medium text-gray px-2.5 py-1.5 min-w-[250px] max-w-[250px] transition-all'>
                    <div className="flex items-center gap-4">
                        <img src={category.image} alt="icon" className="w-[40px] h-[40px]"/>
                    {category.name}
                    </div>
                    <Icon.UilAngleRight/>
                </Link>
            ))}
        </div>
    )
}
const SubCategories = ({categories}) => {
    const [subCategories, setSubCategories] = useState([]);

    return (
        <div className={`min-w-max w-full bg-white transition-all bg-[#fde5e4] p-4`}>
            <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                {categories.map((category, index) => {
                    return (
                        <div className="min-w-max" key={index}>
                            <Link to={`/danh-muc/${category.slug}`}
                                  className="text-md font-medium text-black-1 hover:text-primary">
                                {category.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Category;