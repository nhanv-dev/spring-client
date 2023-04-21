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
                        <p className="min-w-[200px] font-medium text-black text-md">Thời gian hoạt động:</p>
                        <p className="font-medium text-black text-md">{formatBetweenDate(shop.createdAt)}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Thời gian phản hồi:</p>
                        <p className="font-medium text-black text-md">{shop.responseTime ? `${shop.responseTime}%` : 'Đang cập nhật'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Tỉ lệ phản hồi:</p>
                        <p className="font-medium text-black text-md">{shop.responseRate ? `${shop.responseRate}%` : 'Đang cập nhật'}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-md">
                <h5 className="px-4 py-3 border-b border-border-1 font-semibold text-base">Thông tin Shop</h5>
                <div className="p-4">
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Thành phố / Tỉnh:</p>
                        <p className="font-medium text-black text-md">{shop.city || 'Không có'}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Quận / Huyện:</p>
                        <p className="font-medium text-black text-md">{shop.district || 'Không có'}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Phường / Xã:</p>
                        <p className="font-medium text-black text-md">{shop.wards || 'Không có'}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Địa chỉ chi tiết:</p>
                        <p className="font-medium text-black text-md">{shop.addressDetail || 'Không có'}</p>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Email:</p>
                        <p className="font-medium text-black text-md">{shop.shopEmail || 'Không có'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="min-w-[200px] font-medium text-black text-md">Số điện thoại:</p>
                        <p className="font-medium text-black text-md">{shop.shopPhone || 'Không có'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;