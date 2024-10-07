import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import dbConnection from "./config/dbConnection.js"
import userRoute from "./route/user.route.js"
import cartRout from "./route/cart.js"
import orderRoute from "./route/order.route.js"
import paymentRoute from "./route/Payment.js"
import productandalluserRoute from "./route/userAndproduct.js"
import bodyParser from "body-parser"
import path from "path"

dotenv.config()
process.on("uncaughtException", err=>{
    console.log(err.message)
    process.exit(1)
})

const app = express()
const PORT = process.env.PORT || 3000

const _dirname = path.resolve();

dbConnection()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.options('*', cors()); 
app.use("/api/user", userRoute)
app.use("/api/all", productandalluserRoute)
app.use("/api/cart", cartRout)
app.use("/api/order", orderRoute)
app.use("/api/payment", paymentRoute)

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`)
})
