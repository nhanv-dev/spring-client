import React, {useState} from 'react';
import ProductAttributes from "./ProductAttributes";
import ProductVariants from "./ProductVariants";

function TabOption() {
    const [attributes, setAttributes] = useState([]);
    const [variants, setVariants] = useState([]);

    return (
        <div className="flex flex-wrap gap-6">
            <div className="w-4/12">
                <ProductAttributes
                    attributes={attributes} setAttributes={setAttributes}
                />
            </div>
            <div className="flex-1">
                <ProductVariants
                    attributes={attributes} setAttributes={setAttributes}
                    variants={variants} setVariants={setVariants}
                />
            </div>
        </div>
    );
}

export default TabOption;