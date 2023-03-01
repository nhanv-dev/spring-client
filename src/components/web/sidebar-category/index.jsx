import React from 'react';
import FilterSection, {
    FILTER_BY_COLOR, FILTER_BY_MATERIAL,
    FILTER_BY_PRICE,
    FILTER_BY_RATING,
    FILTER_BY_SERVICE,
    FILTER_BY_SIZE
} from "../filter-section";

const Sidebar = () => {

    return (
        <div className="bg-white rounded-md">
            <FilterSection type={FILTER_BY_SERVICE}/>
            <FilterSection type={FILTER_BY_RATING}/>
            <FilterSection type={FILTER_BY_PRICE}/>
            <FilterSection type={FILTER_BY_SIZE}/>
            <FilterSection type={FILTER_BY_COLOR}/>
            <FilterSection type={FILTER_BY_MATERIAL}/>
        </div>
    )
}

export default Sidebar;