import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'; // If you're using toast for notifications
import StoreContext from '../context/storeContext';

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const { url } = useContext(StoreContext);

    // Fetch user's orders
    const myOrder = async () => {
        const res = await fetch(`${url}/api/order/my-orders`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        setOrders(data?.orders);
    };

    const cancelOrder = async (orderID) => {
        try {
            const response = await fetch(`${url}/api/order/${orderID}`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "Canceled" }),
            });
            const updatedOrder = await response.json();
      
            toast.success(`Order ${orderID} has been cancelled`);
            // Update the orders list locally with the new status
            setOrders(
              orders.map((order) =>
                order._id === orderID
                  ? { ...order, orderStatus: updatedOrder?.orderStatus }
                  : order
              )
            );
          } catch (error) {
            console.error("Error updating order status:", error);
          }

        // Show success message using toast or any other notification
    };
    useEffect(() => {
        // Fetch orders on component mount
        myOrder();
    }, [cancelOrder]);

    // Handle Cancel Order

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="lg:text-3xl text-xl font-bold text-gray-800 mb-8 text-center">My Orders</h1>

                <div className="space-y-8">
                    {orders?.map((order, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Order Details */}
                                <div className="col-span-1 md:col-span-3">
                                    <h2 className="text-lg font-bold text-gray-800">Order ID: {order?._id}</h2>
                                    <p className="text-gray-600">Total Price: {order.totalPrice}</p>
                                    <p className={`text-sm font-semibold ${order.orderStatus === 'Delivered' ? 'text-green-600' : order.orderStatus === 'Canceled' ? 'text-red-600' : 'text-yellow-500'}`}>
                                        Status: {order?.orderStatus}
                                    </p>

                                    {/* Cancel Order Button - Only show if the order is not delivered or already cancelled */}
                                    {order.orderStatus !== 'Canceled' && (
                                        <button
                                            onClick={() => cancelOrder(order?._id)}
                                            className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>

                                {/* Items */}
                                <div className="col-span-1 flex flex-col space-y-4">
                                    {order?.orderItems?.map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-4">
                                            <img src={item?.productImage} alt={item?.productname} className="w-16 h-16 object-scale-down rounded-lg" />
                                            <div className="flex flex-col">
                                                <p className="text-gray-700">{item?.productname}</p>
                                                <p className="text-gray-500">Quantity: {item?.count}</p> {/* Display quantity */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyOrder;
