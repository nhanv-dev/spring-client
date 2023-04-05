import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as Icon from "@iconscout/react-unicons";
import Modal from "./Modal";
import toast from "react-hot-toast";
import ToastCustom from "../../../components/common/toast-custom";

function CreateAddress({show, setShow, addNewAddress}) {
    const [city, setCity] = useState([]);
    const [dis, setDis] = useState([]);
    const [ward, setWard] = useState([]);
    const [openCity, setOpenCity] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);
    const [openWard, setOpenWard] = useState(false);
    const [selectCity, setSelectCity] = useState({id: null, name: ""});
    const [selectDistrict, setSelectDistrict] = useState({id: null, name: ""});
    const [selectWard, setSelectWard] = useState({id: null, name: ""});

    useEffect(() => {
        if (show) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
    }, [show])

    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((res) => {
                setCity(res.data);
            })
    }, []);

    useEffect(() => {
        setDis([])
        setSelectDistrict({name: "", id: null})
        if (!selectCity.id) return;
        axios.get(`https://provinces.open-api.vn/api/p/${selectCity.id}?depth=2`)
            .then((res) => {
                setDis(res.data.districts)
            })
    }, [selectCity]);

    useEffect(() => {
        setWard([])
        setSelectWard({name: "", id: null})
        if (!selectDistrict.id) return;
        axios.get(`https://provinces.open-api.vn/api/d/${selectDistrict.id}?depth=2`)
            .then((res) => {
                setWard(res.data.wards)
            })
    }, [selectDistrict])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectCity.name || !selectDistrict.name || !selectWard.name) return toast.error("Vui lòng điền đầy đủ thông tin")
        const payload = {
            customerName: e.target.fullName.value,
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            addressDetail: e.target.address.value,
            city: selectCity.name,
            district: selectDistrict.name,
            wards: selectWard.name,
        }
        addNewAddress(payload);
    }

    return (
        <>
            <ToastCustom/>
            <div
                className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} z-[50] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                <div className="container">
                    <div className="shadow-md bg-white shadow-sm rounded-md p-8 mx-auto w-[800px]">
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium"
                                       htmlFor="fullName">
                                    Họ tên người nhận
                                </label>
                                <div className="shadow-md bg-white w-full rounded-[5px] py-2 px-3">
                                    <input type="text" placeholder="Nhập họ tên người nhận" id="fullName"
                                           name="fullName"
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium"
                                       htmlFor="phone">
                                    Số điện thoại
                                </label>
                                <div className="shadow-md bg-white w-full rounded-[5px] py-2 px-3">
                                    <input type="number" placeholder="Nhập số điện thoại" id="phone" name="phone"
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium">
                                    Chọn tỉnh thành
                                </label>
                                <div className="w-full relative">
                                    <button onClick={() => setOpenCity(true)} type="button"
                                            className="flex items-center justify-between gap-3 w-full shadow-md bg-white rounded-[5px] p-3">
                                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                            {selectCity.name || 'Chọn tỉnh thành'}
                                        </p>
                                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    </button>
                                    <Modal list={city} show={openCity} setShow={setOpenCity} name="Chọn tỉnh thành"
                                           select={setSelectCity}/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium">
                                    Chọn quận/huyện
                                </label>
                                <div className="w-full relative">
                                    <button onClick={() => setOpenDistrict(true)} type="button"
                                            disabled={dis.length === 0}
                                            className="flex items-center justify-between gap-3 w-full shadow-md bg-white rounded-[5px] p-3">
                                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                            {selectDistrict.name || 'Chọn quận/huyện'}
                                        </p>
                                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    </button>
                                    <Modal list={dis} show={openDistrict} setShow={setOpenDistrict}
                                           name="Chọn quận/huyện"
                                           select={setSelectDistrict}/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium">
                                    Chọn phường/xã
                                </label>
                                <div className="w-full relative">
                                    <button onClick={() => setOpenWard(true)} type="button" disabled={ward.length === 0}
                                            className="flex items-center justify-between gap-3 w-full shadow-md bg-white rounded-[5px] p-3">
                                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                                            {selectWard.name || 'Chọn phường/xã'}
                                        </p>
                                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                    </button>
                                    <Modal list={ward} show={openWard} setShow={setOpenWard} select={setSelectWard}/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-5">
                                <label className="text-tiny basis-1/2 text-right font-medium"
                                       htmlFor="address">
                                    Địa chỉ
                                </label>
                                <div className="shadow-md bg-white w-full rounded-[5px] py-2 px-3">
                                    <input type="text" placeholder="Nhập địa chỉ chi tiết" id="address" name="address"
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 mb-8">
                                <label className="text-tiny basis-1/2 text-right font-medium"
                                       htmlFor="email">
                                    Email
                                    <span className="text-sm opacity-60"> *không bắt buộc</span>
                                </label>
                                <div className="shadow-md bg-white w-full rounded-[5px] py-2 px-3">
                                    <input type="email" placeholder="Nhập email" id="email" name="email"
                                           className="text-black-1 font-medium text-md w-full outline-none"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button type="reset"
                                        className="text-white px-3 py-2 rounded-[5px] bg-primary text-md font-bold">
                                    Xóa
                                </button>
                                <button type="submit"
                                        className="text-white px-3 py-2 rounded-[5px] bg-primary text-md font-bold">
                                    Lưu địa chỉ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <button onClick={() => setShow(false)}
                        className="absolute z-[60] right-0 top-[-10px] w-[26px] h-[26px] flex items-center justify-center bg-red text-white rounded-full">
                    <Icon.UilTimes className="w-[18px] h-[18px]"/>
                </button>
            </div>
            <div onClick={() => setShow(false)}
                 className={`${show ? 'visible opacity-100' : 'invisible opacity-0'} fixed top-0 left-0 right-0 bottom-0 z-[40] after:absolute after:bg-[#000] after:opacity-40 after:top-0 after:left-0 after:right-0 after:bottom-0 transition-all`}>
            </div>
        </>
    );
}

export default CreateAddress;