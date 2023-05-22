import {Link} from "react-router-dom";
import {formatCurrency, formatLongDate, formatMediumDate} from "../../../util/format";
import {UilArrowRight, UilArrowUp, UilBan, UilEye, UilMinus, UilPlus, UilSearch} from "@iconscout/react-unicons";
import TablePagination from "@mui/material/TablePagination";
import React, {useState} from "react";
import {Pagination} from "@mui/material";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import StatusStepper from "../order/StatusStepper";
import StatusBadge from "../order/StatusBadge";

const headers = [
    {
        name: 'id',
        label: 'Mã đơn hàng',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[130px] max-w-[130px] text-left',
        headerClass: 'pl-[42px]',
    },
    {
        name: 'isPublic',
        label: 'Trạng thái',
        sortable: true,
        align: 'center',
        class: 'min-w-[100px] max-w-[100px] text-center flex justify-center',
    },
    {
        name: 'quantity',
        label: 'Số lượng',
        sortable: true,
        align: 'center',
        class: 'min-w-[90px] max-w-[90px] text-center flex justify-center',
    },
    {
        name: 'totalPrice',
        label: 'Giá trị đơn hàng',
        sortable: true,
        align: 'end',
        class: 'min-w-[120px] max-w-[120px] text-end',
    },
    {
        name: 'updatedAt',
        label: 'Chỉnh sửa lần cuối',
        sortable: true,
        align: 'end',
        class: 'flex-1 min-w-[180px] max-w-[180px] text-end',
    },
    {
        name: 'createdAt',
        label: 'Ngày đặt hàng',
        sortable: true,
        align: 'end',
        class: 'flex-1 min-w-[150px] max-w-[150px] text-end',
    },
    {
        name: '',
        label: 'Thao tác',
        sortable: false,
        align: 'end',
        class: 'min-w-[100px] max-w-[100px] text-end',
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
export default function OrderTable({orderStatus, orders, setOrders, pagination, setPagination}) {
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
        <div className="max-w-full w-full">
            <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-black-2 text-lg">
                    Đơn đặt hàng <span className={"text-base"}>
                    ({pagination.totalElements} kết quả)
                    </span>
                </p>
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
                    {orders.length === 0 &&
                        <div className="my-10 text-center font-bold text-base">Không tìm thấy đơn đặt hàng nào</div>
                    }
                    {orders.map((order) => {
                        const expandOrder = expanded.filter(i => i === order.id);
                        let index = 0;

                        return (
                            <div key={order.id} className="w-full border-b border-b-border-1 border-dashed">
                                <div
                                    className={`${expandOrder.length > 0 ? 'bg-app-1' : 'bg-white'} w-full hover:bg-app-1 rounded-md`}>
                                    <div className="w-full flex justify-between items-center gap-6 p-3 text-tiny">
                                        <div
                                            className={`${headers[index++].class} font-medium text-tiny flex items-center gap-5`}>
                                            <div className="min-w-max">
                                                <button onClick={() => handleExpand(order.id)}
                                                        className="rounded-md p-1 bg-primary-bg text-primary">
                                                    {expandOrder.length > 0 ?
                                                        <UilMinus className="w-[16px] h-[16px]"/> :
                                                        <UilPlus className="w-[16px] h-[16px]"/>
                                                    }
                                                </button>
                                            </div>
                                            <div
                                                className="font-semibold">
                                                {order.id}
                                            </div>
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            <StatusBadge orderStatus={order.orderStatus}/>
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-semibold text-base text-primary`}>
                                            {order.items.reduce((sum, a) => sum + a.quantity, 0)}
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-semibold text-base text-danger`}>
                                            {formatCurrency(order.totalPrice)}
                                        </div>

                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {formatMediumDate(order.updatedAt)}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {formatMediumDate(order.createdAt)}
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-medium text-tiny flex justify-end items-center`}>
                                            <Link to={`/kenh-ban-hang/don-dat-hang/${order.id}`}
                                                  className="rounded-full flex items-center justify-center w-[26px] h-[26px] min-w-[26px] min-h-[26px] bg-primary-bg text-primary">
                                                <UilArrowRight className={"w-[18px] h-[18px]"}/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div
                                        className={`${expandOrder.length > 0 ? 'max-h-[400px] overflow-auto scroll-component' : 'max-h-0'} transition-all bg-app-1 rounded-md`}>
                                        {expandOrder.length > 0 &&
                                            <div className="p-3">
                                                <div
                                                    className="w-full bg-white rounded-md mb-5 overflow-hidden p-3">
                                                    {order.items?.map(item => (
                                                        <div key={item.id}
                                                             className="transition-all rounded-md relative p-3">
                                                            {item.product.isDeleted &&
                                                                <div
                                                                    className="absolute left-0 top-0 right-0 bottom-0 bg-[rgba(255,255,255,0.6)] z-0 rounded-md">
                                                                    <div
                                                                        className="absolute left-[50%] top-[50%] translate-x-[-50%] z-10 translate-y-[-50%]">
                                                                        <p className="font-semibold text-danger flex items-center gap-2 bg-danger-bg py-2 px-3 rounded-md text-md z-10">
                                                                            <UilBan
                                                                                className={"w-[18px] h-[18px]"}/>
                                                                            Sản phẩm đã bị xóa
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="flex-1 flex items-start gap-2">
                                                                <div className="rounded-md border border-border-1">
                                                                    <img alt="product"
                                                                         className="w-[70px] h-[70px] min-w-[70px] min-h-[70px] rounded-md"
                                                                         src={item?.product?.images?.length > 0 ? item?.product?.images[0]?.url : ImageNotFound}/>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <Link
                                                                        to={`/kenh-ban-hang/san-pham/${item.product.id}`}
                                                                        title={item.product.name}
                                                                        className=" font-medium text-tiny max-w-full line-clamp-2 leading-6">
                                                                        {item.product.name}
                                                                    </Link>
                                                                    <div
                                                                        className="flex items-center justify-between mt-1 mb-3">
                                                                        <div
                                                                            className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                            <p className="font-medium text-tiny">
                                                                                Giá bán hiện tại:
                                                                            </p>
                                                                            <p
                                                                                className="text-danger font-bold text-base">
                                                                                {formatCurrency(item.product.deal.finalPrice)}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                            <div className="font-medium text-tiny">
                                                                                Hiện có <span
                                                                                className="font-semibold text-danger">
                                                        {item.product.quantity}</span> sản phẩm
                                                                            </div>
                                                                            {item.variant &&
                                                                                <>
                                                                                    <div>|</div>
                                                                                    <div
                                                                                        className="font-medium text-tiny">
                                                                                        Loại {item.variant.attributeHash} có <span
                                                                                        className="font-semibold text-danger">
                                                                                {item.variant.quantity}
                                                                            </span> sản phẩm
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div
                                                                className="mt-3 flex items-center justify-end gap-6 rounded bg-app-1 p-3">
                                                                {item.variant &&
                                                                    <div
                                                                        className="border-r pr-6 border-[#ccc] flex justify-between gap-2 text-black-2 font-medium text-tiny">
                                                                        <div
                                                                            className="font-medium text-tiny leading-6">
                                                                            Phiên bản:
                                                                        </div>
                                                                        <div
                                                                            className="text-danger font-bold text-base leading-6">
                                                                            {item.variant.attributeHash}
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div
                                                                    className="w-[150px] border-r pr-6 border-[#ccc] flex justify-between gap-2 text-black-2 font-medium text-tiny">
                                                                    <div className="font-medium text-tiny leading-6">
                                                                        Số lượng đặt:
                                                                    </div>
                                                                    <div
                                                                        className="text-danger font-bold text-lg leading-6">
                                                                        {item.quantity}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="w-[200px] border-r pr-6 border-[#ccc]  flex justify-between gap-2 text-black-2 font-medium text-tiny">
                                                                    <div className="font-medium text-tiny leading-6">
                                                                        Giá đặt mua:
                                                                    </div>
                                                                    <div
                                                                        className="text-danger font-bold text-lg leading-6">
                                                                        {formatCurrency(item.finalPrice)}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="w-[200px] flex justify-between gap-2 text-black-2 font-medium text-tiny">
                                                                    <div className="font-medium text-tiny leading-6">
                                                                        Tổng tiền:
                                                                    </div>
                                                                    <div
                                                                        className="text-danger font-bold text-lg leading-6">
                                                                        {formatCurrency(item.finalPrice * item.quantity)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="border-t border-border-1 mx-1 p-3 pb-1 mt-3">
                                                        <div
                                                            className="flex items-center font-semibold justify-end gap-3">
                                                            Tổng tiền:
                                                            <p className="text-danger font-semibold text-xl">
                                                                {formatCurrency(order.totalPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-5 flex-wrap mb-10">
                                                    <div className="basis-5/12 p-5 bg-white rounded-md">
                                                        <StatusStepper order={order} orderStatus={orderStatus}
                                                                       setOrders={setOrders}/>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="p-5 bg-white rounded-md">
                                                            <div className="font-semibold text-base">
                                                                Thông tin nhận hàng
                                                            </div>
                                                            <div className="mt-5 font-medium text-md">
                                                                Tên người nhận: {order.address.customerName}
                                                            </div>
                                                            <div className="flex items-center gap-10">
                                                                <div className="mt-5 font-medium text-md">
                                                                    SĐT: {order.address.phoneNumber}
                                                                </div>
                                                                <div className="mt-5 font-medium text-md">
                                                                    Email: {order.address.email}
                                                                </div>
                                                            </div>
                                                            <div className="mt-5 font-medium text-md">
                                                                Khu
                                                                vực: {order.address.city}, {order.address.wards}, {order.address.district}
                                                            </div>
                                                            <div className="mt-5 font-medium text-md">
                                                                Địa chỉ chi tiết: {order.address.addressDetail}
                                                            </div>
                                                            {order.note &&
                                                                <div className={"mt-5"}>
                                                                    <p className="font-medium text-md">
                                                                        Ghi chú từ người mua: <span>{order.note}</span>
                                                                    </p>
                                                                </div>
                                                            }
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
