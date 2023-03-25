function ModalOption({list, show, setShow, select}) {

    return (
        <>
            <div
                className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} overflow-hidden shadow-md rounded-md z-[60] bg-white absolute mt-2 top-[100%] left-[50%] translate-x-[-50%] w-full`}>
                <div className="">
                    <div className="max-h-[150px] overflow-y-auto scroll-component">
                        {list?.filter(item => !!item.name).map((item, index) => (
                            <button key={index} type="button"
                                    onClick={() => {
                                        select(item)
                                        setShow(false)
                                    }}
                                    className="block transition-all font-medium text-tiny hover:text-primary hover:bg-primary-bg w-full text-left px-3 py-1.5">
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div onClick={() => setShow(false)}
                 className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} z-[50] fixed top-0 left-0 right-0 bottom-0 w-full`}>
            </div>
        </>
    );
}

export default ModalOption;
