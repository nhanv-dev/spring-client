import {useState} from 'react';


function ProductDescription({product}) {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className="rounded-md bg-white p-6 mb-6">
            {product?.description ?
                <div>
                    <div className={`overflow-hidden ${!isShow ? 'h-[15rem]' : 'h-auto mb-[50px]'}`}>
                        <p className="font-bold text-base mb-3">Mô tả sản phẩm</p>
                        <div dangerouslySetInnerHTML={{__html: product.shortDescription}}
                             className="text-md mb-3"/>
                        <div dangerouslySetInnerHTML={{__html: product.description}}
                             className="text-md mb-3"/>
                    </div>
                    <div className="relative">
                        <div
                            className={`${isShow ? 'bottom-0' : 'bottom-0 top-[-10rem]'} bg-gradient-to-b from-[#ECE9E92D] to-[#fff] absolute border-none w-[100%]`}>
                            <button onClick={() => setIsShow(prev => !prev)}
                                    className={`${isShow ? '' : 'absolute bottom-0'} rounded-[5px] font-bold px-4 h-[40px] w-[100%] bg-[#e7e8ea] text-[#3f4b53] hover:bg-[#F3F3F3] active:bg-[#e7e8ea]`}>
                                {isShow ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>
                </div> :
                <div>
                    <p className="font-bold text-base mb-3">Mô tả sản phẩm</p>
                </div>
            }
        </div>

    );
}

export default ProductDescription;