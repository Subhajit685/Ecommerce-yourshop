import JWT from "jsonwebtoken"
import User from "../models/user.modle.js"

const userProtected = async (req, res, next) =>{
    try {
        const token = req.cookies?.token
        if(!token){
            return res.status(401).json({ success: false, message: "Token not found" })
        }

        const decoded = JWT.verify(token,  process.env.SECRET_KEY)

        if(!decoded){
            return res.status(401).json({ success: false, message: "Wrong token" })
        }

        const user = await User.findById(decoded.id).select("-password")

        req.user = user

        next()
    } catch (error) {
        console.log("User protected", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
}

export default userProtected