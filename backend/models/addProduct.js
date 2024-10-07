import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    userID: String,
    productname: String,
    brandname: String,
    catagory: String,
    productImage: [],
    description: String,
    price: Number,
    selling: Number,
    rating: {
        type: Number,
        default : 0
    },
    stock: {
        type: Number,
        default: 1
    },
    review: [
        {
            name: {
                type: String,
                required: true
            },
            image: String,
            rating: {
                type: Number,
                min: 0,
                max: 5,
                default : 0
                 // If you want to ensure a rating is always present
            },
            comment: {
                type: String
            },
            time: {
                type: Date
            }
        }
    ]
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product