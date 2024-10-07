import express from "express"
import userProtected from "../middlewares/userProtected.js"
import Order from "../models/order.js"
import Product from "../models/addProduct.js"
import User from "../models/user.modle.js"
import mongoose from "mongoose"
import checkAdmin from "../middlewares/checkAdmin.js"
const route = express.Router()



// add new order


route.post("/new-order",userProtected, async(req, res)=>{
    try {
        const {shippingInfo,orderItems,paymentInfo,itemsPrice, shippingPrice, totalPrice, paidAt} = req.body
        const user = await User.findById(req?.user?._id)

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ success: false, message: "No items in the order" });
        }

        const newOrder = await Order({
            ShippingInfo : shippingInfo, orderItems,paymentInfo,itemsPrice, shippingPrice, totalPrice,paidAt ,userEmail: user?.email
        })

        await User.findByIdAndUpdate(req?.user?._id, {cart : []})

        await newOrder.save()
        return res.status(200).json({success : true, message : "Place order successfully", newOrder : newOrder})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})



route.get("/my-orders", userProtected, async(req,res)=>{
    try {
    
        const user = await User.findById(req?.user?._id)
        const orders = await Order.find({userEmail : user?.email}).sort({ createdAt: -1 })


        return res.status(200).json({success : true, orders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})
route.get("/allorders",userProtected, async(req,res)=>{
    try {
        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }
        const orders = await Order.find({}).sort({ createdAt: -1 })

        let totalamount = 0

        orders.forEach((item)=>totalamount += item?.totalPrice)

        return res.status(200).json({success : true, totalamount, orders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})


route.post('/:id',userProtected, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      if(order.orderStatus === "Delivered"){
        return res.status(400).json({success : false, message : "Order already delivered"})
    }

    if(status === "Canceled"){
        order.orderStatus = status;
        order?.orderItems?.forEach(async(item)=> {
            const product = await Product.findById(item?._id)
            product.stock+=item?.count
            await product.save()
        })
        await order.save();
        return res.status(200).json({success : true, message : "Order Canceled"});
    }

    order?.orderItems?.forEach(async(item)=> {
        const product = await Product.findById(item?._id)
        product.stock-=item?.count
        await product.save()
    })


  
      order.orderStatus = status;
      if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }
      await order.save();
  
      return res.status(200).json({success : true, order});
    } catch (error) {
      res.status(500).json({ error: 'Error updating order status' });
    }
  });

route.post("/updateOrder/:id", userProtected, async(req, res)=>{
    try {
        const order = await Order.findById(req?.params?.id)

        if(!order){
            return res.status(404).json({success : false, message : "Order not found"})
        }
        if(order.orderStatus === "Delivered"){
            return res.status(400).json({success : false, message : "Order already delivered"})
        }

        order.orderItems.forEach(async(item)=> {
            const product = await Product.findById(item?.id)
            product.stock-=item?.count
            await product.save()
        })

        order.orderStatus = req.body.status
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now()
        }

        await order.save()
        return res.status(200).json({success : true, order}) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})




export default route