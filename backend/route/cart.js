import express from "express"
import userProtected from "../middlewares/userProtected.js"
import User from "../models/user.modle.js"
import Product from "../models/addProduct.js"
import mongoose from "mongoose"

const route = express.Router()

// add cart 

route.post("/add-cart", userProtected, async (req, res) => {
    try {

        const { productID } = req.body
        const objproductID = new mongoose.Types.ObjectId(productID);
        const product = await Product.findById(productID)

        const checkuser = await User.findOne({
            _id: req.user._id,
            "cart._id": objproductID
        });

        if (checkuser) {

            return res.status(200).json({ success: true, message: "Product all ready in your cart", })
        }

        const user = await User.findByIdAndUpdate(req.user._id, {
            $push: {
                cart: {
                    _id: product?._id,
                    productname: product?.productname,
                    brandname: product?.brandname,
                    catagory: product?.catagory,
                    productImage: product?.productImage[0],
                    description: product?.description,
                    price: product?.price,
                    selling: product?.selling,
                    count: 1,
                }
            }

        })

        return res.status(200).json({ success: true, message: "Add cart successfully", user: user })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// show cart data 

route.get("/allcart", userProtected, async (req, res) => {
    try {
        const user = await User.findById(req?.user?._id)
        return res.status(200).json({ success: true, cart: user?.cart })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// incrise valu from  cart

route.post("/incrise-cart", userProtected, async (req, res) => {
    try {
        const { productID, count } = req.body;
        // Convert productID to ObjectId using 'new'
        const productObjectId = new mongoose.Types.ObjectId(productID);

        const product = await Product.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product?.stock < count) {
            return res.status(200).json({ success: false, message: "No more stock at this time" });
        }
        // console.log("stock",product.stock, "count", count)
        // Find the user and check if the product exists in their cart
        const user = await User.findOne({
            _id: req.user._id,
            "cart._id": productObjectId
        });


        if (!user) {
            return res.status(404).json({ success: false, message: "Product not found in the cart" });
        }

        // If the product exists in the cart, increment the count
        await User.updateOne(
            { _id: req.user._id, "cart._id": productObjectId },  // Find the user and product in the cart
            { $inc: { "cart.$.count": 1 } }  // Increment the count
        );

        // Return success response
        return res.status(200).json({ success: true, message: "Product quantity updated in the cart" });



    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// decrement valu 

route.post("/decrement-cart", userProtected, async (req, res) => {
    try {
        const { productID } = req.body;

        // Convert productID to ObjectId using 'new'
        const productObjectId = new mongoose.Types.ObjectId(productID);

        const product = await Product.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find the user and check if the product exists in their cart
        const user = await User.findOne({
            _id: req.user._id,
            "cart._id": productObjectId
        });


        if (!user) {
            return res.status(404).json({ success: false, message: "Product not found in the cart" });
        }

        const result = await User.updateOne(
            { _id: req.user._id, "cart._id": productObjectId, "cart.count": { $gt: 1 } }, // Ensure the count is greater than 1
            { $inc: { "cart.$.count": -1 } }  // Decrement the count by 1
        );

        if (result.nModified === 0) {
            return res.status(400).json({ success: false, message: "Cannot decrement, count is already at 1" });
        }

        // Return success response
        return res.status(200).json({ success: true, message: "Product quantity updated in the cart" });



    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// delete item from cart

route.delete("/delete-cart", userProtected, async (req, res) => {
    try {
        const { productId } = req.body
        const productObjectId = new mongoose.Types.ObjectId(productId);
        const product = await Product.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        await User.updateOne(
            { _id: req.user._id },  // Find the user by their ID
            { $pull: { cart: { _id: productObjectId } } }  // Remove the product from the cart array
        );

        return res.status(200).json({ success: true, message: "Delete fron cart" })

    } catch (error) {
        console.log("delete cart : " + error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})
export default route