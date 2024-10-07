import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../context/storeContext";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminOrdersPage = () => {
  const { url, setopen } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders when the component mounts
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/order/allorders`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setOrders(data?.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  // Handle manual status update by admin
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${url}/api/order/${orderId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedOrder = await response.json();

      // Update the orders list locally with the new status
      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: updatedOrder?.orderStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Auto-update when a user cancels an order
  useEffect(() => {
    fetchOrders();
  }, [handleStatusChange]);

  if (loading) {
    return <p className="lg:text-2xl text-base font-bold animate-pulse flex items-center justify-center gap-8 space-x-4 mt-16">Loading orders...</p>;
  }

  return (
    <div className="lg:p-8 p-2">
      <div className="bg-white shadow-md flex items-center justify-between px-3 fixed top-20 md:left-10 left-2 md:right-10 right-2 z-40">
        <div
          className="md:text-4xl text-xl cursor-pointer"
          onClick={() => setopen((pre) => !pre)}
        >
          <GiHamburgerMenu />
        </div>
        <h1 className="md:text-2xl text-sm font-bold p-3">All Orders</h1>
        <div></div>
      </div>

      <div className="overflow-x-auto mt-12">
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Order ID</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">User</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Total Price</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Items</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Delivery Address</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Status</th>
              <th className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border border-gray-300">
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">{order._id}</td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">{order.userEmail}</td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">{order.totalPrice}</td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">
                  {/* Display the names of the items */}
                  {order.orderItems?.map((item) => (
                    <p key={item._id} className="text-nowrap">&#40;{item.productname}&#41; x {item.count}</p>
                  ))}
                </td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">{order?.ShippingInfo?.address},{order?.ShippingInfo?.city},{order?.ShippingInfo?.phoneNo}</td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">{order.orderStatus}</td>
                <td className="lg:text-base text-xs text-center border border-gray-300 lg:px-4 px-2 lg:py-2 py-0">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
