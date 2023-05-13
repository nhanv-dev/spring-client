import {useState} from 'react';


function ProductDescription({content, title}) {
    const [isShow, setIsShow] = useState(false);
    const [isWrap, setIsWrap] = useState(false);

    return (
        <div className="min-h-[300px] rounded-md bg-white p-6">
            {content ?
                <div>
                    <div className={`overflow-hidden ${!isShow ? 'h-[240px]' : 'h-auto mb-[50px]'}`}>
                        <p className="font-bold text-base mb-3">{title}</p>
                        <div dangerouslySetInnerHTML={{__html: content}} className="text-md mb-3"/>
                    </div>
                    <div className="relative py-1">
                        <div
                            className={`${isShow ? 'bottom-0' : 'absolute bottom-0 h-[120px] left-0 right-0 bg-gradient-to-b to-[rgba(255,255,255,1)] from-[rgba(255,255,255,.6)] border-none w-[100%]'}`}>
                        </div>
                        <button onClick={() => setIsShow(prev => !prev)}
                                className={`${isShow ? '' : 'absolute bottom-0'} z-50 rounded-md font-bold px-4 h-[40px] w-[100%] bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]`}>
                            {isShow ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                </div> :
                <div className={"h-full"}>
                    <p className="font-bold text-base mb-5">{title}</p>
                    <p className="h-full text-lg font-semibold text-center py-[40px]">Không có mô tả về sản phẩm</p>
                </div>
            }
        </div>

    );
}

export default ProductDescription;