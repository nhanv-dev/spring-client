import {Link} from "react-router-dom";
import {formatCurrency, formatLongDate} from "../../../util/format";
import * as Icon from "@iconscout/react-unicons";
import {
    UilAngleRightB,
    UilArrowUp,
    UilEdit,
    UilMinus,
    UilPlus,
    UilPlusCircle,
    UilSearch,
    UilTrashAlt
} from "@iconscout/react-unicons";
import TablePagination from "@mui/material/TablePagination";
import React, {useEffect, useState} from "react";
import {protectedRequest} from "../../../util/request-method";
import Images from "./Images";
import Tooltip from "@mui/material/Tooltip";
import {toast} from "react-hot-toast";
import {Pagination} from "@mui/material";
import ImageNotFound from '../../../assets/images/image-not-found.jpg';


const headers = [
    {
        name: 'name',
        label: 'Sản phẩm',
        sortable: true,
        align: 'start',
        class: 'flex-1 max-w-[500px] min-w-[300px]',
    },
    {
        name: 'price',
        label: 'Giá bán',
        sortable: true,
        align: 'end',
        class: 'min-w-[120px] max-w-[120px] text-end',
    },
    {
        name: 'isPublic',
        label: 'Trạng thái',
        sortable: true,
        align: 'center',
        class: 'min-w-[100px] max-w-[100px] text-center flex justify-center',
    },
    {
        name: 'isPublic',
        label: 'S.L đặt hàng',
        sortable: true,
        align: 'center',
        class: 'min-w-[90px] max-w-[90px] text-center flex justify-center',
    },
    {
        name: 'updatedAt',
        label: 'Chỉnh sửa lần cuối',
        sortable: true,
        align: 'end',
        class: 'min-w-[180px] max-w-[180px] text-end',
    },
    {
        name: 'Thao tác',
        label: 'Thao tác',
        align: 'end',
        sortable: false,
        class: 'min-w-[100px] max-w-[100px] text-end',
    },
];
const TableHead = () => {

    return (
        <div className="w-full border-b border-b-secondary-bg border-dashed">
            <div className="flex justify-between items-center gap-6 p-3">
                <div className="min-w-[28px] max-w-[28px] text-center font-semibold text-md"></div>
                {headers.map(header => (
                    <div key={header.label} className={`${header.class}`}>
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
export default function ProductTable({products, pagination, setPagination}) {
    const [expandProducts, setExpandProducts] = useState([]);

    useEffect(() => {
        setExpandProducts([])
    }, [pagination, setPagination])
    const handleChangePage = (event, newPage) => {
        event.preventDefault();
        setPagination(prev => ({...prev, page: newPage, loaded: false}))
    };

    const handleChangeRowsPerPage = (event) => {
        event.preventDefault();
        setPagination(prev => ({...prev, page: 0, size: parseInt(event.target.value, 10), loaded: false}))
    };
    const handleDeleteProduct = (id) => {
        protectedRequest().delete(`/shops/products/${id}`)
            .then(res => {
                toast.success('Xóa sản phẩm thành công');
                setPagination(prev => ({...prev, loaded: false}))
            })
    }

    const handleExpand = (id) => {
        const list = expandProducts.filter(p => p.id === id);
        const isOpen = list.length <= 0;
        if (isOpen)
            protectedRequest().get(`/shops/products/${id}`).then(res => {
                setExpandProducts(prev => ([...prev, res.data]));
            })
        else
            setExpandProducts(prev => ([...prev.filter(p => p.id !== id)]))
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
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5 justify-between">
                    <form
                        className={"w-[500px] max-w-[500px] flex items-center gap-3 rounded border-2 border-border-1 text-secondary text-md font-medium px-3 py-1.5"}>
                        <input className="w-full bg-[transparent] outline-none border-none rounded-md"
                               placeholder="Tìm theo tên sản phẩm, từ khóa..."/>
                        <button type={"submit"} className="text-black-2">
                            <UilSearch className="w-[20px] h-[20px]"/>
                        </button>
                    </form>
                    <Link to={`/kenh-ban-hang/san-pham/dang-ban`}
                          className="min-w-max flex items-center gap-1.5 rounded-full bg-primary-bg text-primary text-[.85rem] font-bold px-3 py-1.5">
                        <UilPlusCircle className="w-[20px] h-[20px]"/>
                        <span>Thêm mới</span>
                    </Link>
                </div>
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.page + 1}
                    onChange={(e, newPage) => handleChangePage(e, newPage - 1)}
                    showFirstButton
                    showLastButton
                />
            </div>
            <div className="overflow-auto">
                <TableHead/>
                <div className="mb-3 w-full">
                    {products.length === 0 &&
                        <div className="my-10 text-center font-bold text-lg">Không tìm thấy sản phẩm nào</div>
                    }
                    {products.map((product, i) => {
                        const expandProduct = expandProducts.filter(p => p.id === product.id);
                        let p = {};
                        if (expandProduct.length > 0) p = expandProduct[0];
                        let index = 0;
                        return (
                            <div key={i} className="w-full border-b border-b-secondary-bg border-dashed">
                                <div
                                    className={`${expandProduct.length > 0 ? 'bg-app-1' : 'bg-white'} w-full hover:bg-app-1 rounded-md`}>
                                    <div className="w-full flex justify-between items-center gap-6 p-3 text-tiny">
                                        <div className="min-w-max">
                                            <button onClick={() => handleExpand(product.id)}
                                                    className="rounded-md p-1 bg-primary-bg text-primary">
                                                {expandProduct.length > 0 ?
                                                    <UilMinus className="w-[16px] h-[16px]"/> :
                                                    <UilPlus className="w-[16px] h-[16px]"/>
                                                }
                                            </button>
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            <div className="flex items-start gap-3">
                                                <Link to={`/san-pham/${product.slug}`} className="block">
                                                    <img src={product.images[0]?.url || ImageNotFound} alt={i}
                                                         className="rounded-md w-[50px] min-w-[50px]"/>
                                                </Link>
                                                <Link to={`/san-pham/${product.slug}`} className={"line-clamp-2"}>
                                                    {product.name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-semibold text-base text-primary`}>
                                            {formatCurrency(product.deal.finalPrice)}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {product.isPublic ?
                                                <div
                                                    className="select-none text-success bg-success-bg max-w-max min-w-max px-3 py-[2px] text-center font-semibold text-sm rounded-full">
                                                    Đang bán
                                                </div> :
                                                <div
                                                    className="select-none text-danger bg-danger-bg max-w-max min-w-max px-3 py-[2px] text-center font-semibold text-sm rounded-full">
                                                    Đã ngưng bán
                                                </div>
                                            }
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-semibold text-base text-primary`}>
                                            {product.orderCount}
                                        </div>
                                        <div className={`${headers[index++].class} font-medium text-tiny`}>
                                            {formatLongDate(product.updatedAt)}
                                        </div>
                                        <div
                                            className={`${headers[index++].class} font-medium text-md inline-flex gap-3 items-center justify-end`}>
                                            <button onClick={() => handleDeleteProduct(product.id)}
                                                    className="rounded-full p-1.5 bg-danger-bg text-danger">
                                                <UilTrashAlt className="w-[16px] h-[16px]"/>
                                            </button>
                                            <Link to={`/kenh-ban-hang/san-pham/${product.id}`}
                                                  className="rounded-full p-1.5 bg-primary-bg text-primary">
                                                <UilEdit className="w-[16px] h-[16px]"/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div
                                        className={`${expandProduct.length > 0 ? 'max-h-[450px]' : 'max-h-0'} overflow-auto scroll-component transition-all bg-app-1 rounded-md`}>
                                        {expandProduct.length > 0 &&
                                            <div className="p-5 flex gap-5">
                                                <div className="max-w-[350px] w-[350px]">
                                                    <Images images={p.images}/>
                                                </div>
                                                <div className="min-h-full w-[1px] bg-border-1"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-start gap-5 mb-2">
                                                        <div className="font-semibold text-sm text-black-2">
                                                            Đăng bán {formatLongDate(p.createdAt)}
                                                        </div>
                                                        <div className="font-semibold text-sm text-black-2">
                                                            Chỉnh sửa lần
                                                            cuối {formatLongDate(p.updatedAt)}
                                                        </div>
                                                    </div>
                                                    <p className="text-lg text-black-1 font-semibold mb-3">
                                                        {p.isPublic ?
                                                            <span
                                                                className="mr-3 relative top-[-2px] max-w-max select-none text-success bg-success-bg py-[2px] px-3 text-center font-semibold text-sm rounded-full">
                                                            Đang bán
                                                        </span> :
                                                            <span
                                                                className="mr-3 relative top-[-2px] max-w-max select-none text-danger bg-danger-bg py-[2px] px-3 text-center font-semibold text-sm rounded-full">
                                                           Đã ngưng bán
                                                        </span>
                                                        }
                                                        {p.name}
                                                    </p>
                                                    <div className="mb-5">
                                                        <div className="flex items-center gap-[50px] flex-wrap">
                                                            <div className="flex items-end gap-5">
                                                                <p className="min-w-max text-black text-md font-semibold">
                                                                    Giá bán:
                                                                </p>
                                                                <p className="text-red text-lg font-extrabold">
                                                                    {formatCurrency(p.deal.finalPrice)}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-end gap-5">
                                                                <p className="min-w-max text-black text-md font-semibold">
                                                                    Giá so sánh:
                                                                </p>
                                                                <p className="text-red text-lg font-extrabold">
                                                                    {formatCurrency(p.deal.price)}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-end gap-5">
                                                                <p className="min-w-max text-black text-md font-semibold">
                                                                    Giảm giá:
                                                                </p>
                                                                <p className="text-red text-lg font-extrabold">
                                                                    -{p.deal.discountPercent}%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-5 flex gap-3">
                                                        <p className="text-black font-semibold text-md">
                                                            Danh mục:
                                                        </p>
                                                        <div className="flex items-center gap-2 justify-start">
                                                            <p className="text-black font-medium text-md transition-all">
                                                                {product.category.title}
                                                            </p>
                                                            <UilAngleRightB className={"text-black w-[16px] h-[16px]"}/>
                                                            <p className="text-black font-medium text-md transition-all">
                                                                {product.subCategory.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {p.keywords?.split(',')?.length > 0 &&
                                                        <div className="mb-7 flex gap-3">
                                                        <span className="text-primary font-semibold py-1">
                                                            Từ khóa:
                                                        </span>
                                                            <div
                                                                className="flex flex-wrap items-center justify-start gap-3">
                                                                {p.keywords.split(',').map((k, i) => k && (
                                                                    <span key={i}
                                                                          className="font-medium text-md text-secondary bg-secondary-bg rounded-md px-3 py-1 max-w-max">
                                                               {k}
                                                            </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    }
                                                    {p.variants?.length > 0 &&
                                                        <div className="bg-white rounded-lg p-5 mb-6">
                                                            <p className="text-primary font-semibold mb-3">
                                                                Phiên bản sản phẩm ({p.variants.length})
                                                            </p>
                                                            <div
                                                                className="border-b border-b-secondary-bg border-dashed flex items-center justify-between py-3 font-semibold text-black text-md">
                                                                <p className="w-[150px]">
                                                                    Loại sản phẩm
                                                                </p>
                                                                <p className="w-[60px] text-center">
                                                                    Số lượng
                                                                </p>
                                                                <p className="w-[100px] text-right">
                                                                    Giá bán
                                                                </p>
                                                                <p className="w-[100px] text-right">
                                                                    Giá gốc
                                                                </p>
                                                                <p className="w-[100px] text-right">
                                                                    Giảm giá
                                                                </p>
                                                            </div>
                                                            {p.variants.map(v => (
                                                                <div key={v.id}
                                                                     className="border-b border-b-secondary-bg border-dashed flex items-center justify-between py-3 font-medium text-black text-md">
                                                                    <p className="w-[150px] text-md text-black-1 font-medium">
                                                                        {v.options.map(o => o.name).join(" + ")}
                                                                    </p>
                                                                    <p className="w-[60px] text-center font-semibold">
                                                                        {v.quantity}
                                                                    </p>
                                                                    <p className="w-[100px] text-right text-red font-semibold">
                                                                        {formatCurrency(v.deal.finalPrice)}
                                                                    </p>
                                                                    <p className="w-[100px] text-right">
                                                                        {formatCurrency(v.deal.price)}
                                                                    </p>
                                                                    <p className="w-[100px] text-right text-red font-semibold">
                                                                        -{v.deal.discountPercent}%
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    }
                                                    {p.attributes?.length > 0 &&
                                                        <div className="bg-white rounded-lg p-5 mb-6">
                                                            <p className="text-primary font-semibold mb-3">
                                                                Thuộc tính ({p.attributes.length})
                                                            </p>
                                                            {p.attributes.map(a => (
                                                                <div key={a.id} className="mb-5">
                                                                    <div className="flex items-start gap-3">
                                                                        <p className="text-md font-semibold min-w-[100px] py-1">
                                                                            {a.name} ({a.options.length}):
                                                                        </p>
                                                                        <div
                                                                            className="flex flex-wrap items-center justify-start gap-3">
                                                                            {a.options.map(o => (
                                                                                <div key={o.id}
                                                                                     className="text-sm font-medium text-secondary bg-secondary-bg rounded-md px-5 py-1">
                                                                                    {o.name}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    }
                                                    {p.returnPolicies?.length > 0 &&
                                                        <div className="">
                                                            <p className="text-primary font-semibold mb-3">
                                                                Chinh sách bán hàng
                                                            </p>
                                                            {p.returnPolicies.map(policy => (
                                                                <Tooltip title={policy.tooltipContent} followCursor
                                                                         arrow
                                                                         key={policy.id}>
                                                                    <div
                                                                        className="flex items-center justify-start max-w-max gap-2 mb-3">
                                                                        <Icon.UilShieldCheck
                                                                            className="text-[#018749] w-[24px] h-[24px]"/>
                                                                        <p className="font-medium text-md">{policy.title}</p>
                                                                    </div>
                                                                </Tooltip>
                                                            ))}
                                                        </div>
                                                    }
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