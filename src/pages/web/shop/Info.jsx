import {formatBetweenDate} from "../../../util/format";

function Info({shop}) {
    console.log(shop)
    return (
        <div className="container">
            <div className="bg-white rounded-md mb-6 p-4">
               <span className="font-medium text-base italic">
                   "{shop.shopSlogan || "Không có"}"
               </span>
            </div>
            <div className="bg-white rounded-md mb-6">
                <h5 className="px-4 py-3 border-b border-border-1 font-semibold text-base">Hoạt động</h5>
                <div className="p-4">
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Thời gian hoạt động:</p>
                        <p className="text-base font-medium text-black">{formatBetweenDate(shop.createdAt)}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Thời gian phản hồi:</p>
                        <p className="text-base font-medium text-black">{shop.responseTime ? `${shop.responseTime}%` : 'Đang cập nhật'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Tỉ lệ phản hồi:</p>
                        <p className="text-base font-medium text-black">{shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-md">
                <h5 className="px-4 py-3 border-b border-border-1 font-semibold text-base">Thông tin Shop</h5>
                <div className="p-4">
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Thành phố / Tỉnh:</p>
                        <p className="text-base font-medium text-black">{shop.city}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Quận / Huyện:</p>
                        <p className="text-base font-medium text-black">{shop.district}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Phường / Xã:</p>
                        <p className="text-base font-medium text-black">{shop.wards}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Địa chỉ chi tiết:</p>
                        <p className="text-base font-medium text-black">{shop.addressDetail}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Email:</p>
                        <p className="text-base font-medium text-black">{shop.shopEmail}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black">Số điện thoại:</p>
                        <p className="text-base font-medium text-black">{shop.shopPhone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;