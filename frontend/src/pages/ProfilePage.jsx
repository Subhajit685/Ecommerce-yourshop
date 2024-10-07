import React, { useContext } from "react"; // Assuming you have a context with user info
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const user = useSelector((state) => state.user.user) // Assume user data comes from StoreContext

    return (
        <div className="min-h-screen flex justify-center items-center p-4">

            <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-lg transform transition-all duration-500 hover:scale-105">
                {/* User Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={user?.profileImage || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-md object-cover ring-4 ring-pink-300"
                    />
                </div>

                {/* User Name */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2">{user?.name}</h2>

                {/* User Bio */}
                <p className="text-center text-gray-600 italic mb-6">{user?.bio || "This is a short bio about the user."}</p>

                {/* User Details */}
                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="text-gray-900">{user?.email}</span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start justify-between border-b pb-3">
                        <span className="text-gray-600 font-medium">Address:</span>
                        <span className="text-gray-900">{user?.ShippingInfo?.address || "No Address Provided"}, {user?.ShippingInfo?.city}, {user?.ShippingInfo?.state}, {user?.ShippingInfo?.country}</span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-600 font-medium">Phone:</span>
                        <span className="text-gray-900">{user?.ShippingInfo?.phoneNo || "Not Available"}</span>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <span className="text-gray-600 font-medium">Date of Birth:</span>
                        <span className="text-gray-900">{user?.dob || "Not Provided"}</span>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold text-lg hover:from-pink-500 hover:to-purple-600 focus:outline-none shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
