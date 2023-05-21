import {UilArrowUp, UilMinus, UilPlus, UilSearch} from "@iconscout/react-unicons";
import TablePagination from "@mui/material/TablePagination";
import {useState} from "react";
import {Pagination} from "@mui/material";
import {formatMediumDate} from "../../../util/format";
import {protectedRequest} from "../../../util/request-method";
import {toast} from "react-hot-toast";

const headers = [
    {
        label: 'Tên cửa hàng',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[200px] max-w-[200px] text-left',
        headerClass: 'pl-[42px]',
    },
    {
        label: 'Email',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[150px] max-w-[150px] text-start',
    },
    {
        label: 'Số điện thoại',
        sortable: true,
        align: 'start',
        class: 'min-w-[130px] max-w-[130px] text-start',
    },
    {
        label: 'Trạng thái',
        sortable: true,
        align: 'center',
        class: 'min-w-[150px] max-w-[150px] text-center',
    },
    {
        label: 'Cập nhật lần cuối',
        sortable: true,
        align: 'end',
        class: 'min-w-[150px] max-w-[150px] text-end',
    },
    {
        label: 'Ngày tạo đơn',
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

export default function SalesRegisterTable({salesRegisters, setSalesRegisters, pagination, setPagination}) {
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
    const handleConfirm = (id) => {
        protectedRequest().post(`/sales-register/${id}/confirm`)
            .then(res => {
                setSalesRegisters(prev => {
                    const items = [...prev];
                    const index = items.findIndex(i => i.id === id);
                    items[index].status='CONFIRMED';
                    return items;
                })
                toast.success("Xác nhận tạo cửa hàng thành công")
            })
            .catch(err => {
                toast.error("Xác nhận tạo cửa hàng thất bại")
            })
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
        <div className="max-w-full w-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5 justify-between">
                    <form
                        className={"min-w-[300px] w-full flex items-center gap-3 rounded-full border-2 border-secondary-bg text-secondary text-md font-medium px-3 py-1.5"}>
                        <button type={"submit"} className="text-primary">
                            <UilSearch className="w-[20px] h-[20px]"/>
                        </button>
                        <input className="w-full bg-[transparent] outline-none border-none"
                               placeholder="Tìm theo tên id, email..."/>
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
            <div className="max-w-full overflow-auto scroll-component scroll-component-white">
                <TableHead/>
                <div className="mb-3 w-full">
                    {salesRegisters.length === 0 &&
                        <div className="my-10 text-center font-bold text-base">Không tìm thấy đơn đăng ký nào</div>
                    }
                    {salesRegisters.map((salesRegister) => {
                        let index = 0;
                        const isExpand = expanded.findIndex(id => id === salesRegister.id) !== -1;
                        return (
                            <div key={salesRegister.id} className="w-full border-b border-b-border-1 border-dashed">
                                <div
                                    className={`${isExpand ? 'bg-app-1' : 'bg-white'} w-full hover:bg-app-1 rounded-md`}>
                                    <div className="w-full flex justify-between items-center gap-6 p-3 text-tiny">
                                        <div
                                            className={`${headers[index++].class} font-medium text-tiny flex items-center gap-5`}>
                                            <div className="min-w-max">
                                                <button onClick={() => handleExpand(salesRegister.id)}
                                                        className="rounded-md p-1 bg-primary-bg text-primary">
                                                    {isExpand ?
                                                        <UilMinus className="w-[16px] h-[16px]"/> :
                                                        <UilPlus className="w-[16px] h-[16px]"/>
                                                    }
                                                </button>
                                            </div>
                                            <div className="font-semibold">
                                                {salesRegister.shopName}
                                            </div>
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {salesRegister.shopEmail}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {salesRegister.shopPhone}
                                        </div>
                                        <div
                                            className={`${headers[index++].class} flex items-center justify-center font-bold text-sm`}>
                                            {salesRegister.status === 'PENDING' &&
                                                <p className={"px-3 py-1 bg-warning-bg text-warning max-w-max min-w-max rounded-full"}>
                                                    Đang chờ xác nhận
                                                </p>
                                            }
                                            {salesRegister.status === 'CONFIRMED' &&
                                                <p className={"px-3 py-1 bg-success-bg text-success max-w-max min-w-max rounded-full"}>
                                                    Đã xác nhận
                                                </p>
                                            }
                                        </div>
                                        <div className={`${headers[index++].class} font-bold text-tiny`}>
                                            {formatMediumDate(salesRegister.updatedAt)}
                                        </div>
                                        <div className={`${headers[index++].class} font-bold text-tiny`}>
                                            {formatMediumDate(salesRegister.createdAt)}
                                        </div>
                                        <div className={`${headers[index++].class} font-bold text-sm`}>
                                            {salesRegister.status === 'PENDING' &&
                                                <button onClick={() => handleConfirm(salesRegister.id)}
                                                        className="px-3 py-1 rounded font-semibold bg-primary-bg text-primary">
                                                    Xác nhận
                                                </button>
                                            }
                                            {salesRegister.status === 'CONFIRMED' &&
                                                <p className={"px-3 py-1 bg-success-bg text-success max-w-max min-w-max rounded"}>
                                                    Đã xác nhận
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div
                                        className={`${isExpand ? 'max-h-[400px]' : 'max-h-0'} overflow-auto  scroll-component transition-all bg-app-1 rounded-md`}>
                                        {isExpand &&
                                            <div className="p-3 mb-5">
                                                <div className="p-3 bg-white rounded-md mb-5">
                                                    <div className="flex items-center justify-between gap-6">
                                                        <div className="flex items-center gap-3 justify-start">
                                                            <p className={"font-medium text-md text-black"}>
                                                                Mã đơn ĐK:
                                                            </p>
                                                            <p className="flex-1 text-md font-bold">
                                                                {salesRegister.id}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-8">
                                                            <p className={"font-medium text-md"}>
                                                                Cập nhật lần
                                                                cuối: {formatMediumDate(salesRegister.updatedAt)}
                                                            </p>
                                                            <p className={"font-medium text-md"}>
                                                                Ngày tạo
                                                                đơn: {formatMediumDate(salesRegister.createdAt)}
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
                                                                    {salesRegister.shopName}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Email:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.shopEmail}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Số điện thoại:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.shopPhone}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Khu vực kho hàng:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.warehouseRegionName}
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
                                                                    {salesRegister.city || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Quận / huyện:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.district || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Phường / xã:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.wards || 'Không có'}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Địa chỉ chi tiết:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.addressDetail || 'Không có'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-white rounded-md overflow-hidden p-3">
                                                        <div className={"p-3 bg-app-1 rounded-md font-bold text-md"}>
                                                            Thông tin tài khoản
                                                        </div>
                                                        <div className="p-3">
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Họ & tên:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.user.name}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6 mb-3">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Email:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.user.email}
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="flex items-center justify-between gap-6">
                                                                <p className={"min-w-[150px] font-medium text-md text-black"}>
                                                                    Số điện thoại:
                                                                </p>
                                                                <p className="flex-1 text-md font-bold">
                                                                    {salesRegister.user.phoneNumber}
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
