import React from 'react';
import {Toaster} from "react-hot-toast";

function ToastCustom(props) {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            toastOptions={{
                className: 'font-medium text-tiny',
                success: {
                    duration: 1500,
                },
                error: {
                    duration: 1500,
                },
            }}
        />
    );

}

export default ToastCustom;