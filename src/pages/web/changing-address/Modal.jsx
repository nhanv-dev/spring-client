import React from "react";


function ModalCategory({ list, show, setShow, select}) {

    return (
        <>
            <div
                className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} shadow-md rounded-[5px] z-[60] bg-white shadow-md absolute mt-2 top-[100%] left-[50%] translate-x-[-50%] w-full`}>
                <div className="p-5">
                    <div className="max-h-[150px] overflow-y-auto scroll-component">
                        {list?.map((item, index) => (
                            <button key={index} type="button" onClick={() => {
                                select({name: item.name, id: item.code})
                                setShow(false)
                            }}
                                    className="block transition-all rounded-[4px] font-medium text-md hover:text-primary hover:bg-primary-1-hover px-3 py-2 w-full text-left">
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div onClick={() =>{
                setShow(false)
            }}
                 className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} z-[50] fixed top-0 left-0 right-0 bottom-0 w-full`}>
            </div>
        </>
    );
}

export default ModalCategory;
