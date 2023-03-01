import {formatCurrency, formatPercent} from "../../../utils/format";

function Voucher({vouchers}) {
    return (
        <div className="bg-white p-6 rounded-[8px]">
            <h5 className="text-base font-bold mb-5 uppercase">Mã giảm giá của shop</h5>
            <div className="flex gap-3 overflow-x-hidden scroll-component">
                {vouchers?.map((voucher, index) => {
                    return (
                        <div key={index} className="flex bg-white gap-0">
                            <div
                                className="bg-[#F2F3F7] relative flex flex-col py-2.5 px-5 min-w-[200px] justify-end">
                                <p className="font-bold text-primary text-lg flex items-center gap-2">
                                    <span className="text-md font-medium">Giảm</span>
                                    {formatPercent(voucher.percent)}
                                </p>
                                <p className="font-medium text-sm flex items-center gap-2">
                                    <span>Tối đa:</span>
                                    {formatCurrency(voucher.max)}
                                </p>
                                <p className="font-medium text-sm flex items-center gap-2">
                                    <span>Đơn hàng từ:</span>
                                    {formatCurrency(voucher.apply)}
                                </p>
                                <p className="font-medium text-sm flex items-center gap-2">
                                    <span>HSD:</span>
                                    {voucher.expiredDate}
                                </p>

                                <div
                                    className="z-[1] border-[#F2F3F7] absolute right-[-3px] top-[4px] bottom-[4px] border-dotted border-[4.5px]"/>

                            </div>
                            <div className="px-5 py-2.5 bg-voucher relative
                                                before:z-[2] before:w-[20px] before:h-[10px] before:absolute before:bg-white before:top-0 before:left-[-10px] before:rounded-b-[40px]
                                                after:z-[2] after:w-[20px] after:h-[10px] after:absolute after:bg-white after:bottom-0 after:left-[-10px] after:rounded-t-[40px]">

                                <button
                                    className="py-1 px-3 outline-none bg-white font-bold text-md text-black-1 rounded-[4px]">
                                    Lưu mã
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Voucher;