import React, {useEffect, useState} from 'react';
import * as Icon from '@iconscout/react-unicons'
import {UilEdit, UilSave} from '@iconscout/react-unicons'
import {formatBetweenDate} from "../../../util/format";
import Modal from "../../web/user-address-creating/Modal";
import axios from "axios";


function ProfileShopUpdating({handleUpdateShop, shopDetail, setShopDetail}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isPrepare, setIsPrepare] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [openWarehouse, setOpenWarehouse] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);
    const [openWard, setOpenWard] = useState(false);
    const [selectWarehouse, setSelectWarehouse] = useState({id: null, name: ""});
    const [selectCity, setSelectCity] = useState({id: null, name: ""});
    const [selectDistrict, setSelectDistrict] = useState({id: null, name: ""});
    const [selectWard, setSelectWard] = useState({id: null, name: ""});

    useEffect(() => {
        if (isPrepare && shopDetail.city) {
            axios.get(`https://provinces.open-api.vn/api/p/search/?q=${shopDetail.city}`)
                .then(res => {
                    if (res.data?.length > 0 && res.data[0].name === shopDetail.city)
                        setSelectCity({id: res.data[0].code, name: res.data[0].name})
                    console.log(res.data)
                })
                .catch(() => setIsPrepare(false))
        } else {
            setIsPrepare(false)
        }
        if (isPrepare && shopDetail.warehouseRegionName) {
            axios.get(`https://provinces.open-api.vn/api/p/search/?q=${shopDetail.warehouseRegionName}`)
                .then(res => {
                    if (res.data?.length > 0 && res.data[0].name === shopDetail.warehouseRegionName)
                        setSelectWarehouse({id: res.data[0].code, name: res.data[0].name})
                })
        }
        axios.get(`https://provinces.open-api.vn/api/?depth=2`)
            .then((res) => {
                setCities(res.data)
            })
            .catch(err => {
                setCities([])
            })
    }, [isPrepare, shopDetail]);

    useEffect(() => {
        if (!selectCity.id) return;
        if (isPrepare && shopDetail.district) {
            axios.get(`https://provinces.open-api.vn/api/d/search/?q=${shopDetail.district}`)
                .then(res => {
                    if (res.data?.length > 0 && res.data[0].name === shopDetail.district)
                        setSelectDistrict({id: res.data[0].code, name: res.data[0].name})
                    else
                        setIsPrepare(false)
                })
                .catch(() => setIsPrepare(false))
        } else {
            setIsPrepare(false)
            setSelectDistrict({id: null, name: ""})
            setSelectWard({id: null, name: ""})
        }
        axios.get(`https://provinces.open-api.vn/api/p/${selectCity.id}?depth=2`)
            .then((res) => {
                setDistricts(res.data.districts)
            })
            .catch(err => {
                setDistricts([])
            })
    }, [selectCity]);

    useEffect(() => {
        if (!selectDistrict.id) return;
        if (isPrepare && shopDetail.wards) {
            axios.get(`https://provinces.open-api.vn/api/w/search/?q=${shopDetail.wards}`)
                .then(res => {
                    if (res.data?.length > 0 && res.data[0].name === shopDetail.wards)
                        setSelectWard({id: res.data[0].code, name: res.data[0].name})
                    setIsPrepare(false)
                })
                .catch(() => setIsPrepare(false))
        } else {
            setIsPrepare(false)
            setSelectWard({id: null, name: ""})
        }
        axios.get(`https://provinces.open-api.vn/api/d/${selectDistrict.id}?depth=2`)
            .then((res) => {
                setWards(res.data.wards)
            })
            .catch(err => {
                setWards([])
            })
    }, [selectDistrict])

    function saveChange() {
        const data = {
            ...shopDetail,
            city: selectCity.name,
            warehouseRegionName: selectWarehouse.name,
            district: selectDistrict.name,
            wards: selectWard.name,
        }
        setIsEdit(false)
        handleUpdateShop(data);
    }

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center justify-between mb-5 gap-3">
                <h3 className="font-semibold text-base text-black-2">
                    Thông tin cửa hàng
                </h3>
                {(isEdit && !isPrepare) ?
                    <div className="flex gap-2 items-center justify-end">
                        <button onClick={() => {
                            setIsPrepare(false)
                            setIsEdit(false)
                        }}
                                className="flex items-center gap-1.5 bg-secondary-bg text-secondary px-3 py-1 outline-none font-semibold text-sm rounded-full">
                            <UilSave className={"w-[16px] h-[16px]"}/> Hủy
                        </button>
                        <button onClick={() => saveChange()}
                                className="flex items-center gap-1.5 bg-danger-bg text-danger px-3 py-1 outline-none font-semibold text-sm rounded-full">
                            <UilSave className={"w-[16px] h-[16px]"}/> Lưu thay đổi
                        </button>
                    </div> :
                    <button onClick={() => {
                        setIsPrepare(true)
                        setIsEdit(true)
                    }}
                            className="flex items-center gap-1.5 bg-primary-bg text-primary px-3 py-1 outline-none font-semibold text-sm rounded-full">
                        <UilEdit className={"w-[16px] h-[16px]"}/> Thay đổi
                    < /button>
                }
            </div>
            <div className="relative">
                {isPrepare &&
                    <div
                        className="absolute left-0 top-0 right-0 bottom-0 bg-white z-10 flex items-center justify-center">
                        <img src="https://www.pngrepo.com/png/199956/512/loading-loader.png" alt="spinner"
                             className="w-[60px] h-[60x] animate-spin"/>
                    </div>
                }
                <h5 className="py-2 px-3 mb-3 font-semibold text-md text-black bg-app-1 rounded-md flex items-center">
                    Thông tin liên hệ
                </h5>
                <div className="px-1.5 pb-3">
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Tên cửa hàng: </span>
                        {(isEdit && !isPrepare) ?
                            <div className={`shadow bg-white w-full rounded-md`}>
                                <input type="text" value={shopDetail.shopName || ""} placeholder="Tên cửa hàng"
                                       onChange={(e) => {
                                           setShopDetail(prev => ({...prev, shopName: e.target.value}))
                                       }}
                                       className={`text-start disabled:bg-white rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none`}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.shopName}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Email: </span>
                        {(isEdit && !isPrepare) ?
                            <div className={`shadow bg-white w-full rounded-md`}>
                                <input type="email" value={shopDetail.shopEmail || ""} placeholder="Địa chỉ email"
                                       onChange={(e) => {
                                           setShopDetail(prev => ({...prev, shopEmail: e.target.value}))
                                       }}
                                       className={`text-start disabled:bg-white rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none`}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.shopEmail}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Số điện thoại: </span>
                        {(isEdit && !isPrepare) ?
                            <div className={`shadow bg-white w-full rounded-md`}>
                                <input type="number" value={shopDetail.shopPhone || ""} placeholder="Số điện thoại"
                                       onChange={(e) => {
                                           setShopDetail(prev => ({...prev, shopPhone: e.target.value}))
                                       }}
                                       className={`text-start disabled:bg-white rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none`}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.shopPhone}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Slogan: </span>
                        {(isEdit && !isPrepare) ?
                            <div className={`shadow bg-white w-full rounded-md`}>
                                <input type="email" value={shopDetail.shopSlogan || ""} placeholder="Slogan"
                                       onChange={(e) => {
                                           setShopDetail(prev => ({...prev, shopSlogan: e.target.value}))
                                       }}
                                       className={`text-start disabled:bg-white rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none`}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.shopSlogan ? `"${shopDetail.shopSlogan}"` : 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <h5 className="py-2 px-3 mb-3 font-semibold text-md text-black bg-app-1 rounded-md flex items-center">
                    Địa chỉ cửa hàng
                </h5>
                <div className="px-1.5 pb-3">
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span
                            className="text-tiny font-medium text-black min-w-[150px] py-1.5">Khu vực kho hàng: </span>
                        {(isEdit && !isPrepare) ?
                            <div className="relative shadow bg-white w-full rounded-md">
                                <button onClick={() => setOpenWarehouse(true)} type="button"
                                        className="flex items-center justify-between rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none">
                                    <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                        {selectWarehouse.name || 'Chọn tỉnh thành'}
                                    </p>
                                    <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                </button>
                                <Modal padding={"px-0 py-1"} list={cities} show={openWarehouse}
                                       setShow={setOpenWarehouse}
                                       select={setSelectWarehouse}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.warehouseRegionName || 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Thành phố: </span>
                        {(isEdit && !isPrepare) ?
                            <div className="relative shadow bg-white w-full rounded-md">
                                <button onClick={() => setOpenCity(true)} type="button"
                                        className="flex items-center justify-between rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none">
                                    <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                        {selectCity.name || 'Chọn tỉnh thành'}
                                    </p>
                                    <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                </button>
                                <Modal padding={"px-0 py-1"} list={cities} show={openCity} setShow={setOpenCity}
                                       select={setSelectCity}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.city || 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Quận / huyện: </span>
                        {(isEdit && !isPrepare) ?
                            <div className="relative shadow bg-white w-full rounded-md">
                                <button onClick={() => setOpenDistrict(true)} type="button"
                                        className="flex items-center justify-between rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none">
                                    <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                        {selectDistrict.name || 'Chọn quận huyện'}
                                    </p>
                                    <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                </button>
                                <Modal padding={"px-0 py-1"} list={districts} show={openDistrict}
                                       setShow={setOpenDistrict}
                                       select={setSelectDistrict}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.district || 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span className="text-tiny font-medium text-black min-w-[150px] py-1.5">Phường: </span>
                        {(isEdit && !isPrepare) ?
                            <div className="relative shadow bg-white w-full rounded-md">
                                <button onClick={() => setOpenWard(true)} type="button"
                                        className="flex items-center justify-between rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none">
                                    <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                        {selectWard.name || 'Chọn phường xã'}
                                    </p>
                                    <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                </button>
                                <Modal padding={"px-0 py-1"} list={wards} show={openWard} setShow={setOpenWard}
                                       select={setSelectWard}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.wards || 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <span
                            className="text-tiny font-medium text-black min-w-[150px] py-1.5">Địa chỉ chi tiết: </span>
                        {(isEdit && !isPrepare) ?
                            <div className={`shadow bg-white w-full rounded-md`}>
                                <input type="text" value={shopDetail.addressDetail || ""} placeholder="Địa chỉ chi tiết"
                                       onChange={(e) => {
                                           setShopDetail(prev => ({...prev, addressDetail: e.target.value}))
                                       }}
                                       className={`text-start disabled:bg-white rounded-md p-1.5 text-black-1 font-medium text-md w-full outline-none`}/>
                            </div> :
                            <div className={"bg-white w-full rounded-md"}>
                                <p className={`text-end rounded-md py-1.5 text-black-1 font-medium text-md w-full outline-none`}>
                                    {shopDetail.addressDetail || 'Không có'}
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <h5 className="py-2 px-3 mb-3 font-semibold text-md text-black bg-app-1 rounded-md flex items-center">
                    Hoạt động
                </h5>
                <div className="px-1.5 pb-3">
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <div className="text-black font-medium text-md py-1.5">Thời gian hoạt động:</div>
                        <div className="text-black-2 font-medium text-md py-1.5">
                            {formatBetweenDate(shopDetail.createdAt)}
                        </div>
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <div className="text-black font-medium text-md py-1.5">Thời gian phản hồi:</div>
                        <div className="text-black-2 font-medium text-md py-1.5">
                            {shopDetail.responseRate ? `${shopDetail.responseRate}%` : 'Đang cập nhật'}
                        </div>
                    </div>
                    <div className="mb-3 flex items-start gap-3 justify-between ">
                        <div className="text-black font-medium text-md py-1.5">Tỉ lệ phản hồi:</div>
                        <div className="text-black-2 font-medium text-md py-1.5">
                            {shopDetail.responseRate ? `${shopDetail.responseRate}%` : 'Đang cập nhật'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileShopUpdating;