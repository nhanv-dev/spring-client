import React, {useEffect, useState} from 'react';
import * as Icon from "@iconscout/react-unicons";
import Helmet from "../../../components/common/helmet";
import {useSelector} from "react-redux";
import CreateAddress from "../user-address-creating";
import UserLayout from "../../../components/web/user-layout";
import {toast} from "react-hot-toast";
import UserAddressService from "../../../service/UserAddressService";

const userAddressService = new UserAddressService();

function UserAddress() {
    const user = useSelector(state => state.user);
    const [show, setShow] = useState(false);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        userAddressService.getUserAddress({userId: user.id})
            .then(res => {
                if (res.data?.message === "User address is empty") setAddresses([])
                else {
                    const item = [...res.data].filter(add => add.isDefault)
                    const list = [...res.data].filter(add => !add.isDefault)
                    setAddresses([...item, ...list])
                }
            })
            .catch(err => {
                setAddresses([])
            })
    }, [user])
    const addNewAddress = async (payload) => {
        const address = {...payload, isDefault: false, isDeleted: false}
        userAddressService.addUserAddress({userId: user.id, address})
            .then(res => {
                setAddresses(prev => ([res.data, ...prev]))
                setShow(false)
                toast.success("Thêm địa chỉ thành công.")
            })
            .catch(err => {
                toast.error("Thêm địa chỉ thất bại. Vui lòng thử lại sau.")
            })
    }
    const handleDeleteAddress = async (addressId) => {
        userAddressService.deleteUserAddress({userId: user.id, addressId})
            .then(res => {
                setAddresses(prev => {
                    const addresses = prev.filter(a => a.id !== addressId)
                    return [...addresses]
                })
                toast.success('Đã xóa địa chỉ thành công.')
            })
            .catch(err => {
                toast.success('Xóa địa chỉ thất bại. Vui lòng thử lại sau.')
                console.log(err)
            })
    }
    const handleSetDefault = async (payload) => {
        const address = {...payload, isDefault: true, isDeleted: false}
        userAddressService.setDefaultAddress({userId: user.id, address})
            .then(res => {
                let list = addresses.filter(addresses => addresses.id !== res.data.id)
                    .map(address => {
                        return {...address, isDefault: false};
                    })
                setAddresses([res.data, ...list])
            })
            .catch(err => {

            })
    }

    return (
        <Helmet title={'Depot - Địa chỉ nhận hàng'}>
            <UserLayout>
                <div className="bg-white rounded-md shadow-md">
                    <div
                        className="text-black border-b border-border-1 flex items-center justify-between px-5 py-4 rounded-t-[5px]">
                        <h5 className="flex items-center gap-3">
                            <span className="text-base font-semibold">Địa chỉ nhận hàng</span>
                        </h5>
                        <CreateAddress show={show} setShow={setShow} addNewAddress={addNewAddress}/>
                        <button onClick={() => setShow(true)}
                                className="flex items-center gap-1 text-tiny font-semibold py-1 pl-2.5 pr-3 bg-primary-bg text-primary rounded-full">
                            <Icon.UilPlusCircle className="w-[20px] h-[20px]"/>
                            <p className="relative">Thêm địa chỉ</p>
                        </button>
                    </div>
                    <div>
                        {addresses?.map((item, index) => (
                            <div key={index}
                                 className={`${index < addresses.length - 1 && 'border-b border-border'} p-5 flex flex-wrap gap-3 items-start bg-white transition-all`}>
                                <div
                                    className="flex-1">
                                    <p className="font-medium text-base text-black-2 flex items-center gap-2.5">
                                        <span className="text-md">Người nhận: {item.customerName}</span>
                                        <span className="font-medium text-md text-[#A5B4BE]">|</span>
                                        <span
                                            className="font-medium text-md text-black-1">SĐT: {item.phoneNumber}</span>
                                        {item.email &&
                                            <>
                                                <span className="font-medium text-md text-[#A5B4BE]">|</span>
                                                <span className="text-tiny font-medium text-black-1">
                                                    e-mail: {item.email}
                                                </span>
                                            </>
                                        }
                                    </p>
                                    <p className="flex items-center gap-2 font-medium text-md text-info mt-2">
                                        <Icon.UilMapMarker className="w-[20px] h-[20px]"/>
                                        {item.addressDetail}, {item.wards}, {item.district}, {item.city}
                                    </p>

                                </div>
                                <div className="min-w-[120px]">
                                    <div
                                        className="flex items-start justify-end gap-3 font-semibold text-tiny">
                                        <button className="text-black-2 hover:text-primary">Cập nhật</button>
                                        <button className="text-danger" onClick={() => {
                                            handleDeleteAddress(item.id)
                                        }}>Xóa
                                        </button>
                                    </div>
                                    {!item.isDefault ?
                                        <button onClick={() => handleSetDefault(item)}
                                                className="mt-2 text-primary text-tiny font-semibold cursor-pointer">
                                            Thiết lập mặc định
                                        </button> :
                                        <p className="mt-2 text-tiny font-semibold text-success bg-success-bg px-3 py-1 rounded-md select-none">
                                            Địa chỉ mặc định
                                        </p>
                                    }
                                </div>
                            </div>
                        ))}
                        {addresses.length === 0 && (
                            <div
                                className="font-semibold text-lg flex items-center justify-center py-10 px-5">
                                Tài khoản chưa thêm địa chỉ.
                            </div>
                        )}
                    </div>
                </div>
            </UserLayout>
        </Helmet>
    );
}

export default UserAddress;