
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    ShippingInfo: {
        address : String,
        city : String,
        country : String, 
        phoneNo : String,
        pinCode : String, 
        state : String,
    },
    orderItems : {
        type : Array,
        default : []
    },
    userEmail: {
        type: String
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema)

export default Order
