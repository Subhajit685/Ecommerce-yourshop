import express from "express"
import userProtected from "../middlewares/userProtected.js"
import User from "../models/user.modle.js"
import checkAdmin from "../middlewares/checkAdmin.js"
import Product from "../models/addProduct.js"
import ApiFeatures from "../utils/apiFeatures.js"
import ApiCatagory from "../utils/apiCatagory.js"
import mongoose from "mongoose"
const route = express.Router()

// all user 

route.get("/user", userProtected, async (req, res) => {
    try {
        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }
        const users = await User.find({})
        return res.status(200).json({ success: true, message: "All user", users: users })
    } catch (error) {
        console.log("all user", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// update roll 

route.post("/roll", userProtected, async (req, res) => {
    try {
        const { id, roll } = req.body

        const valid = await User.findById(id)

        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }

        if (!valid) {
            return res.status(500).json({ success: false, message: "User not available" })
        }

        await User.findByIdAndUpdate(id, { roll: roll })

        return res.status(200).json({ success: true, message: "Roll update successfully" })

    } catch (error) {
        console.log("all user", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// add product 

route.post("/add-product", userProtected, async (req, res) => {
    try {

        const { productname, brandname, catagory, productImage, description, price, selling, stock } = req.body

        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }

        const newproduct = await Product({
            userID: req.user._id,
            productname,
            brandname,
            catagory,
            productImage,
            description,
            price,
            selling,
            stock
        })

        await newproduct.save()

        return res.status(200).json({ success: true, message: "Add product successfully", product: newproduct })

    } catch (error) {
        console.log("add product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

//delete product

route.delete("/delete", userProtected, async (req, res) => {
    try {
        const { productId } = req.body
        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        await Product.findByIdAndDelete(productId)
        return res.status(200).json({ success: false, message: "Product remove successfully" })
    } catch (error) {
        console.log("add product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// all pproduct

route.get("/product", userProtected, async (req, res) => {
    try {
        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(401).json({ success: false, message: "You can't add product" })
        }
        const produtes = await Product.find({}).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, produtes: produtes })
    } catch (error) {
        console.log("all product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

//get all product by query

route.get("/searchQuery", async (req, res) => {
    try {
        const resultPerPage = 5;
        const productCount = await Product.countDocuments();
        
        // Initialize apiFeatures after declaring it
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter();

        let products = await apiFeatures.query; // Execute the query initially to get the filtered count
        let filteredProductsCount = products.length;

        // Apply pagination and clone the query for execution
        apiFeatures.pagination(resultPerPage);
        products = await apiFeatures.query.clone(); // Clone the query to execute it again

        return res.status(200).json({ 
            success: true, 
            resultPerPage, 
            productCount, 
            filteredProductsCount, 
            products 
        });

    } catch (error) {
        console.log("all product", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error!" 
        });
    }
});



// edit product 

route.post("/edit-product", userProtected, async (req, res) => {
    try {
        const admin = await checkAdmin(req.user._id)
        if (!admin) {
            return res.status(500).json({ success: false, message: "You can't edit product" })
        }

        const { id, ...resbody } = req.body

        const product = await Product.findByIdAndUpdate(id, resbody)
        return res.status(200).json({ success: true, message: "Edit product successfully", product: product })

    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})


// all catagory 

route.get("/allcatagory", async (req, res) => {
    try {
        const allcatagory = await Product.find().distinct("catagory")

        const allproduct = []

        for (const catagory of allcatagory) {
            const data = await Product.findOne({ catagory })
            allproduct.push(data)
        }

        return res.status(200).json({ success: true, catagory: allproduct })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// fetch by catagory random one 

route.post("/catagory", async (req, res) => {
    try {
        const { catagory } = req.body

        const allcatagory = await Product.find({ catagory })

        const rand = Math.floor(Math.random() * allcatagory.length)

        return res.status(200).json({ success: true, product: allcatagory[rand] })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// product detiles 

route.post("/product-detiles", async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)

        return res.status(200).json({ success: true, product: product })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// all catagory product with filter

route.get("/allcatagory-product", async (req, res) => {
    try {
        const resultPrePage = 5
        const allcatagory = new ApiCatagory(Product.find(), req.query).search().filter()
        let products = await allcatagory.query
        const productLength = products.length

        allcatagory.pagination(resultPrePage)
        products = await allcatagory.query.clone()

        return res.status(200).json({ success: true,productLength,resultPrePage, product: products })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// product by  catagory

route.post("/productBycatagory", async (req, res) => {
    try {
        const {catagory} = req.body
        console.log*catagory
        const allcatagory = await Product.find({catagory})

        return res.status(200).json({ success: true,product: allcatagory })
    } catch (error) {
        console.log("edit product", error)
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }
})

// review

route.post("/review", userProtected, async (req, res) => {
    try {
        const { productID, comment, rating } = req.body;

        const productObjectId = new mongoose.Types.ObjectId(productID);
        const product = await Product.findById(productObjectId);
        const user = await User.findById(req?.user?._id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await Product.findByIdAndUpdate(productID, {
            $push: {
                review: {
                    name: user?.name,
                    image: user?.profileImage,
                    rating: rating,
                    comment: comment,
                    time: new Date()
                }
            }
        });

        let sum = 0

        product.review.forEach((item) => sum += item?.rating);
        let avg = Math.floor(sum / product.review.length)
        product.rating = avg;

        await product.save();

        return res.status(200).json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        console.log("edit product", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
});




export default route