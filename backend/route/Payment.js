import express from "express"
import userProtected from "../middlewares/userProtected.js"
import Razorpay from "razorpay"
import dotenv from "dotenv"
import crypto from "crypto"


const route = express.Router()
dotenv.config()


route.post("/order", userProtected, async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.YOUR_KEY_ID,
            key_secret: process.env.key_secret,
        });

        const option = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "any unique id for every order",
            payment_capture: 1
        }

        const order = await instance.orders.create(option)
        return res.status(200).json({ success: true, key: process.env.YOUR_KEY_ID, order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

route.post("/paymentVerification", userProtected, async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    
        const body = razorpay_order_id + "|" + razorpay_payment_id
    
        const generated_signature = crypto.createHmac("sha256", process.env.key_secret).update(body.toString()).digest("hex")
    
        if (generated_signature == razorpay_signature) {
            res.redirect(`${process.env.FRONTEND_URL}/success-payment-order/${razorpay_payment_id}`)
        } else {
            return res.status(400).json({success : false, message : "Something wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

})


export default route