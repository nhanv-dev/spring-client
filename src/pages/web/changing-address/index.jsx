import React, {useEffect, useState} from 'react';
import Layout from "../../../components/web/layout";
import Helmet from "../../../components/common/helmet";
import {
    UilUser, UilCalling, UilEnvelopeEdit, UilLocationPoint, UilHome, UilAngleDown  
    } from '@iconscout/react-unicons'
import UserSidebar from "../../../components/web/manage-user-sidebar";
import Modal from './Modal';
import axios from "axios";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ChangingAddress({show, setShow, addNewAddress}) {
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
            fullName: e.target.fullName.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            city: selectCity.name,
            district: selectDistrict.name,
            wards: selectWard.name,
            address: e.target.address.value,
        }
        addNewAddress(payload);
    }

    return (
        <Helmet title={'Depot - Thông tin người dùng'}>
            <Layout>
                <div className="bg-app-1 py-10">
                    <div className="container">
                        <div className="flex items-start gap-5">
                            <UserSidebar/>
                            <div className="flex-1">
                                <div className="flex items-end font-semibold text-[1.4rem] gap-3 mb-3">
                                     Cập nhật địa chỉ
                                </div>
                                <div className="bg-white rounded-[5px] shadow-md">
                                    <form className="w-full" onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="fullName"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Họ và tên
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilUser className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="fullName" name='fullName' type="text"
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="phone"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Số điện thoại
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilCalling className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="phone" name='phone' type="number"
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email" 
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Địa chỉ email
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilEnvelopeEdit className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="email" name='email' type="email"
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label 
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Chọn Thành phố/Tỉnh
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilLocationPoint className="w-full h-full text-gray"/>
                                                    </div>
                                                    <button  onClick={() => setOpenDistrict(true)} type="button" 
                                                        disabled={dis.length === 0} tabIndex={-1}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                        <p className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                            {selectDistrict.name || "---Chọn---"}
                                                        </p>  
                                                    </button>
                                                    <UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                                    <Modal list={city} show={openCity} setShow={setOpenCity} 
                                                        name="---Chọn---" 
                                                        select={setSelectCity}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label 
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Chọn Quận/Huyện
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilLocationPoint className="w-full h-full text-gray"/>
                                                    </div>
                                                    <button onClick={() => setOpenDistrict(true)} type="button"
                                                        disabled={dis.length === 0}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                        <p className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                            {selectDistrict.name || "---Chọn---"}
                                                        </p>
                                                    </button>
                                                    <UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                                    <Modal list={dis} show={openDistrict} setShow={setOpenDistrict}
                                                        name="---Chọn---"
                                                        select={setSelectDistrict}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label 
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Chọn Phường/Xã
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilLocationPoint className="w-full h-full text-gray"/>
                                                    </div>
                                                    <button onClick={() => setOpenDistrict(true)} type="button"
                                                        disabled={dis.length === 0}
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                        <p className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                            {selectDistrict.name || "---Chọn---"}
                                                        </p>
                                                    </button>
                                                    <UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                                                    <Modal list={ward} show={openWard} setShow={setOpenWard} select={setSelectWard}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="address"
                                                className="block font-semibold text-tiny text-black-1 mb-2">
                                                Số nhà, tên đường
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[18px] h-[18px]">
                                                         <UilHome className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="address" name='address' type="text"
                                                        className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <button type="submit"
                                                    className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                                Cập nhật
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Helmet>
    );
}

export default ChangingAddress;