import React, {useEffect} from 'react';

function Helmet({title, children}) {

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <>
            {children}
        </>
    );
}

export default Helmet;