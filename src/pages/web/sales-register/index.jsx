import React, {useEffect, useState} from 'react';
import Helmet from "../../../components/common/helmet";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import * as Icon from '@iconscout/react-unicons'
import {UilAt, UilHistory, UilLocationPoint, UilPhone, UilStore} from '@iconscout/react-unicons'
import {useSelector} from "react-redux";
import Modal from "../user-address-creating/Modal";
import axios from "axios";
import {protectedRequest} from "../../../util/request-method";
import ToastCustom from "../../../components/common/toast-custom";
import {toast} from "react-hot-toast";

function SalesRegister() {
    const {user, shop} = useSelector(state => state);
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    const [shopEmail, setShopEmail] = useState("");
    const [shopPhone, setShopPhone] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState();
    const [warehouse, setWarehouse] = useState();
    const [salesRegister, setSalesRegister] = useState(null);

    useEffect(() => {
        if (salesRegister && salesRegister.status === 'CONFIRMED') navigate("/kenh-ban-hang")
    }, [navigate, salesRegister])

    useEffect(() => {
        protectedRequest().get(`/sales-register/users/${user.id}`)
            .then(res => {
                setSalesRegister(res.data)
            })
            .catch(err => {
                setSalesRegister(null)
            })
    }, [navigate, user])

    async function handleSubmit(e) {
        e.preventDefault();
        if (!shopName || !shopEmail || !shopPhone || !warehouse?.name) {
            return toast.error('Đăng ký thất bại. Vui lòng thử lại')
        }
        const payload = {
            shopName, shopEmail, shopPhone, addressDetail,
            warehouseRegionName: warehouse?.name,
            city: city?.name,
            district: district?.name,
            wards: wards?.name,
        }
        protectedRequest().post("/sales-register", payload)
            .then(res => {
                toast.success('Đăng ký bán hàng thành công!')
                setSalesRegister(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error('Đăng ký thất bại. Vui lòng thử lại')
            })
    }

    return (
        <Helmet title="Depot - Đăng ký bán hàng">
            <ToastCustom/>
            <div className="relative">
                <div className="container max-w-[1200px] pt-[60px] pb-[60px]">
                    <div className="flex">
                        <div className="w-1/2">
                            <div className="flex gap-3">
                                <p className="font-semibold text-2xl gap-3">
                                    Đăng ký bán hàng cùng
                                </p>
                                <Link to="/">
                                    <img src={Logo} alt="logo" className="h-[30px]"/>
                                </Link>
                            </div>
                            <p className="mt-3 font-medium text-md">
                                Tiếp cận hơn <span className="text-primary">22 triệu lượt truy cập</span> mỗi tháng!
                            </p>
                            <div className="mt-10 relative pt-[65%] z-50 rounded-md overflow-hidden w-[110%]">
                                <img alt="thumbnail" style={{objectFit: "contain", overflow: "clip"}}
                                     src="https://salt.tikicdn.com/cache/w680/ts/user/dc/e6/b4/fa5101071b365ee2f385fd7d208b309f.jpg"
                                     className="absolute top-0 left-0 w-full"/>
                            </div>
                        </div>
                        <div className="w-1/2 relative bg-cover bg-center z-50 pl-[120px]">
                            {salesRegister ?
                                <>
                                    <div className="mb-5">
                                        <div className="flex items-center gap-5 justify-between">
                                            <p className="font-semibold text-xl">
                                                Đơn đăng ký bán hàng
                                            </p>
                                            {salesRegister.status === 'PENDING' &&
                                                <p className="px-3 py-1 text-tiny font-bold text-danger bg-danger-bg rounded-full flex items-center justify-center gap-1">
                                                    < UilHistory className={"w-[18px] h-[18px]"}/> Đang chờ xác nhận
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Tên cửa hàng / thương hiệu
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilStore className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.shopName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Địa chỉ email
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilAt className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.shopEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Số điện thoại
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilPhone className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.shopPhone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Khu vực kho hàng
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilLocationPoint className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.warehouseRegionName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <p className="font-semibold text-xl">
                                            Địa chỉ cửa hàng offline
                                        </p>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Thành phố / Tỉnh
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilLocationPoint className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.city}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Quận / Huyện
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilLocationPoint className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.district}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Phường / Xã
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilLocationPoint className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.wards}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <div
                                            className="block font-semibold text-tiny text-black-1 mb-2">
                                            Địa chỉ chi tiết
                                        </div>
                                        <div
                                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                    <UilLocationPoint className="w-full h-full text-gray"/>
                                                </div>
                                                <div
                                                    className="flex-1 focus:outline-none text-md font-medium text-black-1">
                                                    {salesRegister.addressDetail}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="flex items-end font-semibold text-[1.4rem] gap-3 mb-3">
                                        Đăng ký ngay
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="shopName"
                                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                                Tên cửa hàng / thương hiệu
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                        <UilStore className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="shopName" type="text" value={shopName}
                                                           onChange={(e) => setShopName(e.target.value)}
                                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="shopEmail"
                                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                                Địa chỉ email (dành cho cửa hàng)
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                        <UilAt className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="shopEmail" type="email" value={shopEmail}
                                                           onChange={(e) => setShopEmail(e.target.value)}
                                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="shopPhone"
                                                   className="block font-semibold text-tiny text-black-1 mb-2">
                                                Số điện thoại
                                            </label>
                                            <div
                                                className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                                                <div className="flex items-center gap-3 w-full">
                                                    <div className="flex items-center justify-center w-[20px] h-[20px]">
                                                        <UilPhone className="w-full h-full text-gray"/>
                                                    </div>
                                                    <input id="shopPhone" type="number" value={shopPhone}
                                                           onChange={(e) => setShopPhone(e.target.value)}
                                                           className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <Address
                                                handleCity={setCity} handleDistrict={setDistrict} handleWard={setWards}
                                                addressDetail={addressDetail} setAddressDetail={setAddressDetail}
                                                handleWarehouse={setWarehouse}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <button type="submit"
                                                    className="w-full bg-primary h-[40px] rounded-md text-tiny font-medium text-white">
                                                Đăng ký ngay
                                            </button>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-[#F5F5FA] absolute right-0 top-0 bottom-0 w-1/2"/>
            </div>
            <div className="container max-w-[1200px] pt-10 pb-[100px]">
                <div className="flex flex-wrap gap-10 justify-between">
                    <div className="flex-1">
                        <div className="mb-5 w-[120px]">
                            <img src="https://salt.tikicdn.com/ts/user/fa/31/98/4274d22438e2359f0ff7de1afe2fcf5a.png"
                                 alt="thumbnail" className="w-full"/>
                        </div>
                        <h5 className="font-semibold text-2xl mb-5">
                            Sàn thương mại điện tử được tin tưởng nhất Việt Nam
                        </h5>
                        <p className="font-medium text-md">
                            Depot luôn hoàn thiện mình để mang đến những trải nghiệm tốt nhất cho cả Khách Hàng và Nhà
                            Bán. Với 100% hàng chính hãng và hơn 95% Khách Hàng hài lòng, Depot xứng đáng là sàn TMĐT
                            được tin tưởng nhất Việt Nam.
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="mb-5 w-[120px]">
                            <img src="https://salt.tikicdn.com/ts/user/77/10/04/4c528effdbb6f98b15a1536f43a3cf27.png"
                                 alt="thumbnail" className="w-full"/>
                        </div>
                        <h5 className="font-semibold text-2xl mb-5">
                            Chi phí bán hàng cạnh tranh

                        </h5>
                        <p className="font-medium text-md">
                            Depot mang đến cơ hội kinh doanh online cho Nhà Bán với mức phí chiết khấu và phí thanh toán
                            rẻ nhất thị trường. Đồng thời, phí vận chuyện cực kỳ cạnh tranh sẽ hỗ trợ tỷ lệ chuyển đổi
                            đơn hàng hiệu quả hơn bao giờ hết.
                        </p>
                    </div>
                    <div className="flex-1">
                        <div className="mb-5 w-[120px]">
                            <img src="https://salt.tikicdn.com/ts/user/b1/06/31/058c5bd5233f3c5558424ba3e371f558.png"
                                 alt="thumbnail" className="w-full"/>
                        </div>
                        <h5 className="font-semibold text-2xl mb-5">
                            Dịch vụ TikiNow 2h
                        </h5>
                        <p className="font-medium text-md">
                            Duy nhất trên thị trường TMĐT, dịch vụ TikiNow 2h giúp Nhà Bán trong nước giao hàng trăm
                            ngàn sản phẩm cho Khách Hàng chỉ trong 2 giờ.
                        </p>
                    </div>
                </div>
            </div>
        </Helmet>
    )
        ;
}

const Address = ({handleWarehouse, handleCity, handleDistrict, handleWard, addressDetail, setAddressDetail}) => {
    const [warehouse, setWarehouse] = useState([]);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
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
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((res) => {
                const data = res.data.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                })
                setCity(data)
                setWarehouse(data)
            })
    }, []);
    useEffect(() => {
        setDistrict([])
        setSelectDistrict({name: "", id: null})
        if (!selectCity.id) return;
        axios.get(`https://provinces.open-api.vn/api/p/${selectCity.id}?depth=2`)
            .then((res) => {
                setDistrict(res.data.districts.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }))
            })
    }, [selectCity]);
    useEffect(() => {
        setWards([])
        setSelectWard({name: "", id: null})
        if (!selectDistrict.id) return;
        axios.get(`https://provinces.open-api.vn/api/d/${selectDistrict.id}?depth=2`)
            .then((res) => {
                setWards(res.data.wards.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }))
            })
    }, [selectCity, selectDistrict])
    useEffect(() => {
        handleCity(selectCity)
    }, [selectCity])
    useEffect(() => {
        handleDistrict(selectDistrict)
    }, [selectDistrict])
    useEffect(() => {
        handleWard(selectWard)
    }, [selectWard])
    useEffect(() => {
        handleWarehouse(selectWarehouse)
    }, [selectWarehouse])

    return (
        <>
            <div className="mb-5">
                <label className="block font-semibold text-tiny text-black-1 mb-2">
                    Khu vực kho hàng
                </label>
                <div className="w-full relative">
                    <button onClick={() => setOpenWarehouse(true)} type="button"
                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md w-full shadow-md">
                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                            {selectWarehouse.name || 'Chọn khu vực kho hàng'}
                        </p>
                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                    </button>
                    <Modal list={warehouse} show={openWarehouse} setShow={setOpenWarehouse}
                           select={setSelectWarehouse}/>
                </div>
            </div>
            <div className="mb-5">
                <p className="font-semibold text-xl">
                    Địa chỉ cửa hàng offline
                </p>
            </div>
            <div className="mb-5">
                <label className="block font-semibold text-tiny text-black-1 mb-2">
                    Chọn tỉnh thành
                </label>
                <div className="w-full relative">
                    <button onClick={() => setOpenCity(true)} type="button"
                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md w-full shadow-md">
                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                            {selectCity.name || 'Chọn tỉnh thành'}
                        </p>
                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                    </button>
                    <Modal list={city} show={openCity} setShow={setOpenCity} select={setSelectCity}/>
                </div>
            </div>
            <div className="mb-5">
                <label className="block font-semibold text-tiny text-black-1 mb-2">
                    Chọn quận/huyện
                </label>
                <div className="w-full relative">
                    <button onClick={() => setOpenDistrict(true)} type="button"
                            disabled={district.length === 0}
                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md w-full shadow-md">
                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                            {selectDistrict.name || 'Chọn quận/huyện'}
                        </p>
                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                    </button>
                    <Modal list={district} show={openDistrict} setShow={setOpenDistrict} select={setSelectDistrict}/>
                </div>
            </div>
            <div className="mb-5">
                <label className="block font-semibold text-tiny text-black-1 mb-2">
                    Chọn phường/xã
                </label>
                <div className="w-full relative">
                    <button onClick={() => setOpenWard(true)} type="button" disabled={wards.length === 0}
                            className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md w-full shadow-md">
                        <p className="flex-1 text-black-1 font-medium text-md text-left w-full outline-none">
                            {selectWard.name || 'Chọn phường/xã'}
                        </p>
                        <Icon.UilAngleDown className="w-[18px] h-[18px] min-w-[18px] min-h-[18px]"/>
                    </button>
                    <Modal list={wards} show={openWard} setShow={setOpenWard} select={setSelectWard}/>
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="shopPhone"
                       className="block font-semibold text-tiny text-black-1 mb-2">
                    Địa chỉ chi tiết
                </label>
                <div
                    className="bg-white flex items-center px-3 rounded-md border border-border h-[40px] w-full shadow-md">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-[20px] h-[20px]">
                            <UilLocationPoint className="w-full h-full text-gray"/>
                        </div>
                        <input id="shopPhone" type="text" value={addressDetail}
                               onChange={(e) => {
                                   setAddressDetail(e.target.value)
                               }}
                               className="flex-1 focus:outline-none text-md font-medium text-black-1"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesRegister;