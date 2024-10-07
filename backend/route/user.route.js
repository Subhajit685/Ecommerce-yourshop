import express from "express";
import User from "../models/user.modle.js";
import validator from "validator";
import bcryptjs from "bcryptjs";
import getToken from "../utils/getToken.js";
import userProtected from "../middlewares/userProtected.js";
import sendMail from "../utils/sendMail.js";

const route = express.Router()

route.post("/signup", async (req, res) => {
    try {
        const { email, password, cpassword } = req.body

        const valid = validator.isEmail(email)
        if (!valid) {
            return res.status(400).json({ success: false, message: "Please enter correct email" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User allready exit" })
        }

        if (password !== cpassword) {
            return res.status(400).json({ success: false, message: "Confirm password not match" })
        }

        const salt = await bcryptjs.genSalt(10)
        const haspassword = await bcryptjs.hash(password, salt)

        const payload = {
            ...req.body,
            password: haspassword
        }

        const newuser = await User(payload)
        await newuser.save()
        const token = getToken(newuser._id, res)

        return res.status(200).json({
            success: true, user: {
                ...newuser._doc,
                password: undefined
            },
            token: token,
            message: "Account created successfully"
        })


    } catch (error) {
        console.log("sign up", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const comp = await bcryptjs.compare(password, user.password)

        if (!comp) {
            return res.status(400).json({ success: false, message: "Invalid credential" })
        }

        const token = getToken(user._id, res)

        return res.status(200).json({
            success: true, message: "Loging successfully",
            token: token,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Login", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

route.get("/user-data", userProtected, async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "User data", user: req.user })
    } catch (error) {
        console.log("Login", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

route.get("/logout", (req, res) => {
    try {
        const option = {
            httpOnly: true,
            sameSite: "None", // prevents CSRF
            secure: true, // use HTTPS in production
        }
        res.clearCookie("token", option)
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log("all user", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

route.post("/forget", async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }

        const randomToken = Math.floor(Math.random() * 10000000)

        user.forgetPasswordToken = randomToken
        user.forgetPasswordDate = Date.now() + 10 * 60 * 1000;

        await user.save()

        const url = `${req.protocol}://${req.get("host")}/api/user/forget/${randomToken}`

        const message = `To reset your password tap this link =>\n\n ${url}\n\nThis link will not work after 15 minites.\n\nIf this email not for you than ignore..\n\nThank you`

        await sendMail({
            email: email,
            subject: "Reset mail from Yourshop",
            message,
        })

        return res.status(200).json({ success: true, message: "Email send successfully" })

    } catch (error) {
        console.log("all user", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

route.post("/shipping", userProtected, async (req, res) => {
    try {
        const { shippingInfo } = req.body
        const user = await User.findById(req?.user?._id)
        user.ShippingInfo = shippingInfo
        await user.save()

        return res.status(200).json({ success: true, message: "Address update" })
    } catch (error) {
        console.log("all user", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})


export default route
