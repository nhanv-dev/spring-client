import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Icon from '@iconscout/react-unicons';

const Menu = ({categories}) => {
    const [hover, setHover] = useState(null)
    const [sub, setSub] = useState([])
    return (
        <div className="flex">
            <div className="min-w-max">
                {categories.map((category, index) => {
                    if (!category.parentId) {
                        const child = categories.filter(item => item.parentId === category._id)
                        return (
                            <Link to={`/danh-muc/${category.slug}`} key={index}
                                  onMouseEnter={() => {
                                      setHover(category._id)
                                      setSub(child)
                                  }}
                                  className={`${hover === category._id ? 'text-primary bg-[#fde5e4]' : 'text-black bg-transparent'} text-black bg-transparent flex justify-between items-center text-[.9rem] font-medium text-gray px-3 py-2.5 min-w-[250px] transition-all`}>
                                {category.name}
                                <Icon.UilAngleRight/>
                            </Link>
                        )
                    }
                })}
            </div>
            {sub.length > 0 && <SubCategories categories={sub} hover={hover}/>}
        </div>
    )
}
const SubCategories = ({categories}) => {
    return (
        <div className={`min-w-max w-full bg-white transition-all bg-[#fde5e4] p-4`}>
            <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                {categories.map((category, index) => {
                    return (
                        <div className="min-w-max" key={index}>
                            <Link to={`/danh-muc/${category.slug}`} className="text-md font-medium text-black-1 hover:text-primary">
                                {category.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Menu;