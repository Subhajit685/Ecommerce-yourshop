import React, { useContext, useEffect } from 'react'
import StoreContext from '../context/storeContext'
import { useSelector } from 'react-redux'
import { LuIndianRupee } from "react-icons/lu";
import { Link } from 'react-router-dom';
import CheckOutStep from '../components/CheckOutStep';

function ConfirmOrder() {
    const { shippingInfo, total, url, userData } = useContext(StoreContext)
    const user = useSelector((state) => state.user.user)

    const heldleClick = async (amount) => {
        const res = await fetch(`${url}/api/payment/order`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ amount: Number(amount) })
        })

        const data = await res.json()

        const options = {
            key: data.key, // Enter the Key ID generated from the Dashboard
            amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "YourShop",
            description: "Shop everything on our website",
            image: "https://example.com/your_logo",
            order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${url}/api/payment/paymentVerification`,
            prefill: {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            },
            method: {
                upi: true, // Enable UPI
                card: true,
                netbanking: true,
                wallet: true
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    useEffect(()=>{
        userData()
    }, [])
    return (
        <div>
            <CheckOutStep activeStep={2} />
            <div className='flex flex-col lg:flex-row container mx-auto items-center justify-around px-8 gap-4'>
                <div className='flex flex-col items-start justify-center gap-16'>
                    <div>
                        <h1 className='text-center my-4 text-xl font-bold'>Shipping Detelis</h1>
                        <div className='shadow-md bg-white p-4 rounded-md'>
                            <div className='md:text-base text-sm'>
                                <span>{user?.name},</span><span className='mx-2'>{user?.email}</span>
                            </div>
                            <div className='md:text-base text-sm'>
                                <span>{shippingInfo?.address},</span><span className='mx-2'>{shippingInfo?.city}</span>
                            </div>
                            <div className='md:text-base text-sm'>
                                <span>{shippingInfo?.country},</span><span className='mx-2'>{shippingInfo?.state}</span>
                            </div>
                            <div className='md:text-base text-sm'>
                                <span>Pin : {shippingInfo?.pinCode},</span><span className='mx-2'>Phonr No. : {shippingInfo?.phoneNo}</span>
                            </div>
                        </div>
                    </div>

                    <div className='gap-2 flex flex-col shadow-md rounded-md p-4 bg-white w-full max-h-96 overflow-y-scroll noScroll-bar'>
                        <h1 className='md:text-base font-bold'>Total Item : </h1>
                        <div className='flex items-center justify-between border-b-2'>
                            <span className='w-20'></span>
                            <span className='lg:text-base text-sm font-bold'>Name</span>
                            <span className='lg:text-base text-sm font-bold'>Quantity</span>
                            <span className='lg:text-base text-sm font-bold'>Price</span>
                        </div>
                        <div className='flex flex-col gap-1'>
                            {
                                user?.cart?.map((item, index) => {
                                    return <div key={index} className='flex items-center justify-between border-b-2'>
                                        <div className='h-20 w-20 border p-0.5'>
                                            <img src={item?.productImage} alt="" className='h-full w-full object-scale-down object-center' />
                                        </div>
                                        <span className='lg:text-base text-sm'>{item?.productname}</span>
                                        <span className='lg:text-base text-sm'>{item?.count}</span>
                                        <div className='flex items-center lg:text-base text-sm'>
                                            <LuIndianRupee />
                                            <span>{item?.selling}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='bg-white md:w-96 md:h-80 h-60 shadow-lg rounded-md my-4 mx-4 md:my-10'>
                    <div className='md:text-xl font-bold text-sm text-clip mx-auto rounded-t-md bg-orange-400 text-center py-2'>
                        Order Summary
                    </div>

                    <div className='flex justify-around items-center font-bold md:text-base text-sm m-2 border-b-2 md:py-4 py-2'>
                        <span>Items Price : </span>
                        <div className='flex justify-start items-center'>
                            <span><LuIndianRupee /></span>
                            <span>{total}</span>
                        </div>
                    </div>

                    <div className='flex justify-around items-center font-bold md:text-base text-sm m-2 border-b-2 md:py-4 py-2'>
                        <span>Shipping Price : </span>
                        <div className='flex justify-start items-center'>
                            <span><LuIndianRupee /></span>
                            <span>{user?.cart === null ? 0 : 40}</span>
                        </div>
                    </div>

                    <div className='flex justify-around items-center font-bold md:text-base text-sm m-2 md:py-4 py-2'>
                        <span>Total Price : </span>
                        <div className='flex justify-start items-center'>
                            <span><LuIndianRupee /></span>
                            <span>{total + 40}</span>
                        </div>
                    </div>

                    <div className='w-full flex px-2 justify-end border-red-400'>
                        <Link  className='w-60 py-2 rounded-sm bg-blue-600 text-white text-center' onClick={() => heldleClick(total + 40)}>Make Payment</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder
