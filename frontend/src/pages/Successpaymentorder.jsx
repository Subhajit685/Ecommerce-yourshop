import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added missing import
import StoreContext from '../context/storeContext';
import toast from 'react-hot-toast';

function Successpaymentorder() {
    const params = useParams();
    const { paymentID } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const {url } = useContext(StoreContext);
    const [orderId, setorderID] = useState("")
    const [total, settotal] = useState(0)

    const calculateTotal = () => {
        const totalAmount = user?.cart.reduce((acc, item) => acc + item.selling * item.count, 0)
        settotal(totalAmount)
    }

    const handleContinueShopping = () => {
        navigate("/");
    };

    useEffect(() => {
        const createOrder = async () => {
            // Check if cart is populated and total is correctly calculated
            if (user?.cart?.length > 0 && total > 0) {
                try {
                    const response = await fetch(`${url}/api/order/new-order`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            shippingInfo : user?.ShippingInfo,
                            orderItems: user?.cart,
                            paymentInfo: { id: paymentID, status: "Payment successfully" },
                            itemsPrice: total,
                            shippingPrice: 40,
                            totalPrice: Number(total) + 40,
                            paidAt: Date.now()
                        })
                    });

                    const data = await response.json();

                    if (data.success) {
                        setorderID(data?.newOrder?._id);
                        toast.success("Order created successfully");
                    }
                } catch (error) {
                    console.error("Error creating order:", error);
                }
            }
        };

        // Calculate total and prepare cart data
        if (user?.cart && user.cart.length > 0) {
            calculateTotal();  // Make sure total is calculated
        }

        // Only call createOrder when the cart is populated and total is calculated
        if (user?.cart?.length > 0 && total > 0) {
            createOrder();
        }
    }, [user?.cart]);  // Dependencies on cart and total




    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col justify-center items-center py-12 px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 lg:p-12 w-full max-w-lg sm:max-w-2xl lg:max-w-4xl transition duration-500 hover:scale-105">
                <div className="text-center">
                    <div className="flex justify-center mb-6 h-40 w-40 mx-auto">
                        <img src="/order.png" alt="" className="h-full w-full object-scale-down object-center" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4">
                        Order Confirmed!
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
                        Thank you for your purchase! Your order has been successfully placed. You'll receive a confirmation email shortly.
                    </p>

                    {/* Order Summary Section */}
                    <div className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg shadow-inner mb-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Order Number:</p>
                                <p className="font-semibold text-gray-800">{orderId}</p>
                            </div>
                            <div className="flex  gap-4">
                                <p className="text-gray-600">Total Amount:</p>
                                <p className="font-semibold text-gray-800">{Number(total) + 40}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Estimated Delivery:</p>
                                <p className="font-semibold text-gray-800">3-5 Business Days</p>
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="text-gray-600">Shipping Address:</p>
                                <p className="font-semibold text-gray-800">{user?.ShippingInfo?.address},{user?.ShippingInfo?.city},{user?.ShippingInfo?.state}</p>
                                <p className="font-semibold text-gray-800">{user?.ShippingInfo?.phoneNo},{user?.ShippingInfo?.pinCode}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={handleContinueShopping}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            Continue Shopping
                        </button>
                        <Link to={"/myorder"} className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg shadow-md transition-transform transform hover:scale-105">
                            View All Order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Successpaymentorder;
