import React from 'react';

function ProductCard({item}) {
    return (
        <div className="w-full shadow-sm bg-white p-3 rounded">
            {item.name}
        </div>
    );
}

export default ProductCard;