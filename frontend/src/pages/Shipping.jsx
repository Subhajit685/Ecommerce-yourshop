import React, { useContext, useState } from 'react'
import { Country, State, City } from 'country-state-city';
import { FaRegAddressCard } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa6";


import CheckOutStep from '../components/CheckOutStep';
import StoreContext from '../context/storeContext';
import { Link } from 'react-router-dom';



function Shipping() {

    const {shippingInfo, setshippingInfo, url} = useContext(StoreContext)

    const hendleOnChenge = (e) => {
        const { value, name } = e.target
        setshippingInfo((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const hendleSubmit = async() => {
        const res = await fetch(`${url}/api/user/shipping`,{
            method : "POST",
            credentials : "include",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({shippingInfo})
        })

    }
    return (
        <>
            <CheckOutStep activeStep={1}/>
            <div className='flex flex-col justify-center items-center gap-4 top-8 relative'>
                <h1 className='text-xl lg:text-2xl font-bold'>Shipping Info</h1>
                <form className='flex flex-col gap-4'>

                    {/* address */}
                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <FaRegAddressCard />
                        </div>
                        <input type="text" name='address' placeholder='enter your address' className='rounded-md border p-2 w-full' value={shippingInfo.address} onChange={hendleOnChenge} />
                    </div>

                    {/* city  */}

                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <FaCity />
                        </div>
                        <input type="text" name='city' placeholder='city' className='rounded-md border p-2 w-full' value={shippingInfo.city} onChange={hendleOnChenge} />
                    </div>


                    {/* pin  */}

                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <TbMapPinCode />
                        </div>
                        <input type="text" name='pinCode' placeholder='pinCode' className='rounded-md border p-2 w-full' value={shippingInfo.pinCode} onChange={hendleOnChenge} />
                    </div>

                    {/* phone number  */}

                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <FaPhoneVolume />
                        </div>
                        <input type="text" name='phoneNo' placeholder='phone number' className='rounded-md border p-2 w-full' value={shippingInfo.phoneNo} onChange={hendleOnChenge} />
                    </div>

                    {/* country  */}

                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <TfiWorld />
                        </div>
                        <select name="country" className='rounded-md border p-2 w-full' value={shippingInfo.country} onChange={hendleOnChenge}>
                            <option value="">Country</option>
                            {
                                Country && (
                                    Country.getAllCountries().map((item, index) => {
                                        return <option key={index} value={item?.isoCode}>{item?.name}</option>
                                    })
                                )
                            }
                        </select>
                    </div>

                    {/* state  */}

                    <div className='flex items-center gap-2 md:w-80 w-60'>
                        <div className='text-2xl'>
                            <MdOutlineRealEstateAgent />
                        </div>
                        <select name="state" className='rounded-md border p-2 w-full' value={shippingInfo.state} onChange={hendleOnChenge}>
                            <option value="">State</option>
                            {
                                State && (
                                    State.getStatesOfCountry(shippingInfo.country).map((item, index) => {
                                        return <option key={index} value={item?.isoCode}>{item?.name}</option>
                                    })
                                )
                            }
                        </select>
                    </div>
                    <Link to={"/confirmOrder"} className='bg-orange-400 p-2 rounded-md hover:bg-orange-500 hover:text-white text-center' onClick={hendleSubmit}>Confirm address</Link>
                </form>
            </div>
        </>
    )
}

export default Shipping
