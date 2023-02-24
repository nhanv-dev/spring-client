import React from 'react';

const PrimaryButton = ({click, children, variant}) => {
    return (
        <button onClick={click} className={` ` + variant}>
            {children}
        </button>
    );
};

export default PrimaryButton;