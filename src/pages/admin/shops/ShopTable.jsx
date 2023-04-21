import {UilArrowUp, UilExternalLinkAlt, UilMinus, UilPlus, UilSearch} from "@iconscout/react-unicons";
import TablePagination from "@mui/material/TablePagination";
import {useState} from "react";
import {Pagination} from "@mui/material";
import {formatMediumDate} from "../../../util/format";
import {Link} from "react-router-dom";
import DefaultShop from "../../../assets/images/default-shop.png";

const headers = [
    {
        label: 'Tên cửa hàng',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[300px] text-left',
        headerClass: 'pl-[42px]',
    },
    {
        label: 'Email',
        sortable: true,
        align: 'start',
        class: 'min-w-[200px] max-w-[200px] text-start',
    },
    {
        label: 'Số điện thoại',
        sortable: true,
        align: 'start',
        class: 'min-w-[150px] max-w-[150px] text-start',
    },
    {
        label: 'Trạng thái',
        sortable: true,
        align: 'center',
        class: 'min-w-[90px] max-w-[90px] text-center',
    },
    {
        label: 'Ngày tạo cửa hàng',
        sortable: true,
        align: 'end',
        class: 'min-w-[150px] max-w-[150px] text-end',
    },
    {
        label: 'Thao tác',
        sortable: false,
        align: 'end',
        class: 'min-w-[100px] max-w-[100px] text-end flex items-center justify-end',
    },
];
const TableHead = () => {
    return (
        <div className="w-full border-b border-b-secondary-bg border-dashed">
            <div className="flex justify-between items-center gap-6 p-3">
                {headers.map((header, i) => (
                    <div key={header.label} className={`${header.class} ${header.headerClass}`}>
                        {header.sortable ?
                            <button className={`outline-none relative group font-semibold text-md`}>
                                {header.align === 'start' ?
                                    <>
                                        <UilArrowUp
                                            className={`absolute right-[-30px] top-[50%] translate-y-[-50%] group-hover:opacity-100 opacity-0 transition-all w-[20px] h-[20px]`}/>
                                        {header.label}
                                    </> :
                                    <>
                                        {header.label}
                                        <UilArrowUp
                                            className={`absolute left-[-30px] top-[50%] translate-y-[-50%] group-hover:opacity-100 opacity-0 transition-all w-[20px] h-[20px]`}/>
                                    </>
                                }
                            </button> :
                            <div className="font-semibold text-md">
                                {header.label}
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ShopTable({shops, pagination, setPagination}) {
    const [expanded, setExpanded] = useState([]);

    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        setPagination(prev => ({...prev, page: newPage, loaded: false}))
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setPagination(prev => ({...prev, page: 0, size: parseInt(event.target.value, 10), loaded: false}))
    };

    const handleExpand = (id) => {
        const list = expanded.filter(i => i === id);
        const isOpen = list.length <= 0;
        if (isOpen) setExpanded(prev => ([...prev, id]));
        else setExpanded(prev => ([...prev.filter(i => i !== id)]))
    }

    if (!pagination.loaded) {
        return (
            <div className="flex w-full items-center justify-center">
                <p className="font-semibold text-base">
                    Đang load...
                </p>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5 justify-between">
                    <form
                        className={"min-w-[300px] w-full flex items-center gap-3 rounded-full border-2 border-secondary-bg text-secondary text-md font-medium px-3 py-1.5"}>
                        <button type={"submit"} className="text-primary">
                            <UilSearch className="w-[20px] h-[20px]"/>
                        </button>
                        <input className="w-full bg-[transparent] outline-none border-none"
                               placeholder="Tìm theo tên sản phẩm, từ khóa..."/>
                    </form>
                </div>
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.page + 1}
                    onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
                    showFirstButton
                    showLastButton
                />
            </div>
            <div className="max-w-fit overflow-auto scroll-component scroll-component-white">
                <TableHead/>
                <div className="mb-3 w-full max-w-fit">
                    {shops.length === 0 &&
                        <div className="my-10 text-center font-bold text-base">Không tìm thấy cửa hàng nào</div>
                    }
                    {shops.map((shop) => {
                        let index = 0;
                        const isExpand = expanded.findIndex(id => id === shop.id) !== -1;
                        return (
                            <div key={shop.id} className="w-full border-b border-b-border-1 border-dashed">
                                <div
                                    className={`${isExpand ? 'bg-app-1' : 'bg-white'} w-fit hover:bg-app-1 rounded-md`}>
                                    <div className="w-full flex justify-between items-center gap-6 p-3 text-tiny">
                                        <div
                                            className={`${headers[index++].class} font-medium text-tiny flex items-center gap-5`}>
                                            <div className="min-w-max">
                                                <button onClick={() => handleExpand(shop.id)}
                                                        className="rounded-md p-1 bg-primary-bg text-primary">
                                                    {isExpand ?
                                                        <UilMinus className="w-[16px] h-[16px]"/> :
                                                        <UilPlus className="w-[16px] h-[16px]"/>
                                                    }
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="border-[3px] border-primary rounded-full min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px] overflow-hidden">
                                                    <img className={"w-full"} src={shop.shopLogo || DefaultShop}
                                                         alt={"logo"}/>
                                                </div>
                                                <Link to={`/cua-hang/${shop.slug}`} className="font-semibold flex-1">
                                                    {shop.shopName}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {shop.shopEmail}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {shop.shopPhone}
                                        </div>
                                        <div
                                            className={`${headers[index++].class} flex items-center justify-center font-bold text-sm`}>
                                            {shop.deleted ?
                                                <p className={"px-3 py-1 bg-warning-bg text-warning max-w-max min-w-max rounded-full"}>
                                                    Dừng hoạt động
                                                </p> :
                                                <p className={"px-3 py-1 bg-success-bg text-success max-w-max min-w-max rounded-full"}>
                                                    Đang hoạt động
                                                </p>
                                            }
                                        </div>
                                        <div className={`${headers[index++].class} font-bold text-tiny`}>
                                            {formatMediumDate(shop.createdAt)}
                                        </div>
                                        <div className={`${headers[index++].class} font-bold text-sm`}>
                                            <Link to={`/cua-hang/${shop.slug}`}
                                                  className="rounded-full p-1.5 flex bg-primary-bg text-primary">
                                                <UilExternalLinkAlt className={"w-[16px] h-[16px]"}/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div
                                        className={`${isExpand ? 'max-h-[400px]' : 'max-h-0'} transition-all bg-app-1 rounded-md`}>
                                        {isExpand &&
                                            <div className="p-3 mb-5">
                                                <div className="p-3 bg-white rounded-md mb-5">
                                                    <div className="flex items-center justify-between gap-6">
                                                        <div className="flex items-center gap-3 justify-start">
                                                            <p className={"font-medium text-md text-black"}>
                                                                Mã cửa hàng:
                                                            </p>
                                                            <p className="flex-1 text-md font-bold">
                                                                {shop.id}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-8">
                                                            <p className={"font-medium text-md"}>
                                                                Cập nhật lần
                                                                cuối: {formatMediumDate(shop.updatedAt)}
                                                            </p>
                                                            <p className={"font-medium text-md"}>
                                                                Ngày tạo
                                                                cửa hàng: {formatMediumDate(shop.createdAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-5 flex-wrap">
                                                    <div className="flex-1 bg-white rounded-md overflow-hidden p-3">
                                                        <div className={"p-3 bg-app-1 rounded-md font-bold text-md"}>
                                                            Thông tin cửa hàng
                                                        </div>
                                                        <div className="p-3">
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Tên cửa hàng:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.shopName}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Email:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.shopEmail}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Số điện thoại:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.shopPhone}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Khu vực kho hàng:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.warehouseRegionName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-white rounded-md overflow-hidden p-3">
                                                        <div className={"p-3 bg-app-1 rounded-md font-bold text-md"}>
                                                            Địa chỉ cửa hàng
                                                        </div>
                                                        <div className="p-3">
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Thành phố / tỉnh:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.city || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Quận / huyện:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.district || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Phường / xã:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.wards || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Địa chỉ chi tiết:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {shop.addressDetail || 'Không có'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <TablePagination
                component="div"
                count={pagination.totalElements}
                page={pagination.page}
                onPageChange={handleChangePage}
                rowsPerPage={pagination.size}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Số sản phẩm 1 trang"}
                showFirstButton
                showLastButton
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-select': {
                        fontWeight: 500,
                    }
                }}
            />
        </div>
    )
}
