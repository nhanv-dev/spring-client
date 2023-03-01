import React from 'react';
import FilterColor from "./FilterColor";
import FilterMaterial from "./FilterMaterial";
import FilterSize from "./FilterSize";
import FilterPrice from "./FilterPrice";
import FilterService from "./FilterService";
import FilterRating from "./FilterRating";

function FilterSection({type}) {
    return (
        <>
            {type === FILTER_BY_MATERIAL && <FilterService/>}
            {type === FILTER_BY_RATING && <FilterRating/>}
            {type === FILTER_BY_PRICE && <FilterPrice/>}
            {type === FILTER_BY_SIZE && <FilterSize/>}
            {type === FILTER_BY_COLOR && <FilterColor/>}
            {type === FILTER_BY_MATERIAL && <FilterMaterial/>}
        </>
    );
}

export const FILTER_BY_SERVICE = "filter-service";
export const FILTER_BY_RATING = "filter-rating";
export const FILTER_BY_PRICE = "filter-price";
export const FILTER_BY_SIZE = "filter-size";
export const FILTER_BY_COLOR = "filter-color";
export const FILTER_BY_MATERIAL = "filter-material";
export default FilterSection;