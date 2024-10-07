import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email  : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : [8, "Password should be greater then 8 characters"]
    },
    profileImage : {
        type : String
    },
    roll : {
        type : String,
        required : true,
        default : "GENERAL"
    },
    searchHistory : {
        type : Array  
    },
    cart : {
        type : Array,
        default : []
    },
    ShippingInfo: {
        address : String,
        city : String,
        country : String, 
        phoneNo : String,
        pinCode : String, 
        state : String,
    },
    forgetPasswordToken : String,
    forgetPasswordDate : Date,
}, {
    timestamps : true
})

const User = mongoose.model("User", userSchema)

export default User