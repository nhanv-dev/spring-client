import React from 'react';

const SecondaryButton = ({click, children, variant}) => {
    return (
        <button onClick={click} className={` ` + variant}>
            {children}
        </button>
    );
};

export default SecondaryButton;