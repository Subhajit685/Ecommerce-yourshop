import User from "../models/user.modle.js"


const checkAdmin = async(id)=>{
    try {
        const user = await User.findById(id)
        const roll = user.roll
        if(roll !== "ADMIN"){
            return false
        }

        return true
    } catch (error) {
        console.log("check admin", error)
        return res.status(500).json({ success: false, message: "User not available" })
    }
}

export default checkAdmin