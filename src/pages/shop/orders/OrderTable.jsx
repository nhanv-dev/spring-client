import {Link} from "react-router-dom";
import {formatCurrency, formatLongDate, formatMediumDate} from "../../../util/format";
import {
    UilArrowUp, UilBan, UilCheck,
    UilCheckCircle,
    UilCircle,
    UilMinus,
    UilPlus,
    UilPlusCircle,
    UilSearch
} from "@iconscout/react-unicons";
import TablePagination from "@mui/material/TablePagination";
import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import ImageNotFound from "../../../assets/images/image-not-found.jpg";
import {protectedRequest} from "../../../util/request-method";

const headers = [
    {
        name: 'id',
        label: 'Mã đơn hàng',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[200px] max-w-[200px] text-left',
        headerClass: 'pl-[42px]',
    },
    {
        name: 'phoneNumber',
        label: 'Số điện thoại',
        sortable: true,
        align: 'start',
        class: 'flex-1 min-w-[200px] max-w-[200px] text-left',
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
export default function OrderTable({orderStatus, orders, pagination, setPagination}) {
    const [expanded, setExpanded] = useState([84]);

    useEffect(() => {
        // setExpanded([])
    }, [pagination, setPagination])
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

    const confirmOrder = (id) => {
        protectedRequest().put(``)
    }
    const cancelOrder = (id) => {

    }

    if (!pagination.loaded) {
        return (
            <div className="flex w-full items-center justify-center">
                <p className="font-semibold text-lg">
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
            <div className="max-w-full overflow-auto scroll-component scroll-component-white">
                <TableHead/>
                <div className="mb-3 w-full">
                    {orders.length === 0 &&
                        <div className="my-10 text-center font-bold text-lg">Không tìm thấy sản phẩm nào</div>
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
                                            <div
                                                className="font-semibold">
                                                {order.address.phoneNumber}
                                            </div>
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            <div
                                                className="select-none text-success bg-success-bg max-w-max min-w-max px-3 py-1 text-center font-semibold text-sm rounded-full">
                                                {order.orderStatus.description}
                                            </div>
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
                                            {formatLongDate(order.updatedAt)}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {formatMediumDate(order.createdAt)}
                                        </div>
                                    </div>
                                    <div
                                        className={`${expandOrder.length > 0 ? 'max-h-[400px] overflow-auto scroll-component' : 'max-h-0'} transition-all bg-app-1 rounded-md`}>
                                        {expandOrder.length > 0 &&
                                            <div className="p-3">
                                                <div className="w-full bg-white rounded-md mb-5 overflow-hidden p-3">
                                                    {order.items.map(item => (
                                                        <div key={item.id}
                                                             className="relative flex flex-wrap items-start justify-between gap-8 p-3">
                                                            {item.product.isDeleted &&
                                                                <div
                                                                    className="absolute left-0 top-0 right-0 bottom-0 bg-[rgba(255,255,255,0.6)] z-0 rounded-md">
                                                                    <div
                                                                        className="absolute left-[50%] top-[50%] translate-x-[-50%] z-10 translate-y-[-50%]">
                                                                        <p className="font-semibold text-danger flex items-center gap-2 bg-danger-bg py-2 px-3 rounded-md text-md z-10">
                                                                            <UilBan
                                                                                className={"w-[18px] h-[18px]"}/> Sản
                                                                            phẩm đã bị xóa
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="flex-1 flex items-start gap-2">
                                                                <div className="rounded-md border border-border-1">
                                                                    <img alt="product"
                                                                         className="w-[60px] h-[60px] rounded-md"
                                                                         src={item?.product?.images?.length > 0 ? item?.product?.images[0]?.url : ImageNotFound}/>
                                                                </div>
                                                                <Link to={`/san-pham/${item.product.slug}`}
                                                                      className="pt-1 font-medium text-tiny min-w-[300px] max-w-[500px] line-clamp-2">
                                                                    {item.product.name}
                                                                </Link>
                                                            </div>
                                                            <div
                                                                className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                <span className="font-medium text-tiny">
                                                                   Giá bán:
                                                                </span>
                                                                <span className="text-danger font-bold text-base">
                                                                     {formatCurrency(item.finalPrice)}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                <span className="font-medium text-tiny">
                                                                    Số lượng đặt:
                                                                </span>
                                                                <span className="text-danger font-bold text-base">
                                                                    {item.quantity}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="flex items-end gap-2 text-black-2 font-medium text-tiny">
                                                                <span className="font-medium text-tiny">
                                                                    Tồn kho:
                                                                </span>
                                                                <span className="text-danger font-bold text-base">
                                                                    {item.product.quantity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="border-t border-border-1 pt-3 mt-3">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <p className="font-medium">
                                                                Tổng tiền:
                                                            </p>
                                                            <p className="text-danger font-semibold text-xl">
                                                                {formatCurrency(order.totalPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-5 flex-wrap mb-8">
                                                    <div className="basis-5/12 p-5 bg-white rounded-md">
                                                        <div>
                                                            {orderStatus.map(status => {
                                                                const active = status.id === order.orderStatus.id;
                                                                return (
                                                                    <div key={status.id}
                                                                         className="gap-5 flex items-start mb-3">
                                                                        <div className="mt-1">
                                                                            {active ?
                                                                                <UilCheck
                                                                                    className={"text-success rounded-full w-[16px] h-[16px]"}/> :
                                                                                <UilCircle
                                                                                    className={" rounded-full w-[16px] h-[16px]"}/>
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium text-md">
                                                                                {status.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className=" mb-3 p-5 bg-white rounded-md">
                                                            <div className="font-medium mb-3">
                                                                Thông tin nhận hàng
                                                            </div>
                                                            <div className="mb-5 font-medium text-md">
                                                                Tên người nhận: {order.address.customerName}
                                                            </div>
                                                            <div className="flex items-center gap-10">
                                                                <div className="mb-5 font-medium text-md">
                                                                    SĐT: {order.address.phoneNumber}
                                                                </div>
                                                                <div className="mb-5 font-medium text-md">
                                                                    Email: {order.address.email}
                                                                </div>
                                                            </div>
                                                            <div className="mb-5 font-medium text-md">
                                                                Khu
                                                                vực: {order.address.city}, {order.address.wards}, {order.address.district}
                                                            </div>
                                                            <div className="mb-5 font-medium text-md">
                                                                Địa chỉ chi tiết: {order.address.addressDetail}
                                                            </div>
                                                            <div>
                                                                <p className="mb-1 font-medium text-md">Ghi chú từ người mua:</p>
                                                                <div className="rounded-md p-3 bg-app-1 font-medium text-md">
                                                                    {order.note}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3 items-center justify-end">
                                                            <button onClick={() => cancelOrder(order.id)}
                                                                    className="min-w-max bg-danger text-white rounded outline-none px-3 py-2 font-medium text-md">
                                                                Hủy đơn hàng
                                                            </button>
                                                            <button onClick={() => confirmOrder(order.id)}
                                                                    className="min-w-max bg-primary text-white rounded outline-none px-3 py-2 font-medium text-md">
                                                                Xác nhận đơn hàng
                                                            </button>
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