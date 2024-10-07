import React, { useContext, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import EditProduct from "./EditProduct"
import { LuIndianRupee } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import StoreContext from '../context/storeContext';


function ProductCard({ product, getProducts }) {
    const [openEdit, setopenEdit] = useState(false)
    const { url } = useContext(StoreContext)
    const hendleDelete = async (id) => {
        const res = await fetch(`${url}/api/all/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: id })
        })
        const data = await res.json()
        console.log(data)
        getProducts()
    }
    return (
        <div className='sm:h-80 h-52 sm:w-48 md:w-60 wa border bg-white m-2 shadow-md p-1 relative'>
            <span className='cursor-pointer sm:text-2xl text-sm absolute left-1 top-1' onClick={() => setopenEdit(true)}><FaEdit /></span>
            <div className='text-sm sm:text-2xl absolute top-1 right-1 cursor-pointer' onClick={() => hendleDelete(product?._id)}>
                 <MdDelete />
            </div>
            <div className='sm:h-32 h-16 sm:w-32 mt-4 w-16 mx-auto'>
                <img src={product?.productImage[0]} alt="" className='sm:h-32 h-16 sm:w-32 w-16 object-scale-down object-center' />
            </div>
            <h1 className='text-center mt-1 line-clamp-1 small sm:text-base'>Name : {product?.productname}</h1>
            <h1 className='text-center mt-1 small sm:text-base'>Catagory : {product?.catagory}</h1>
            <div className='flex items-center justify-center mt-1'>
                <span className='text-center small sm:text-base'>Price :</span><span className='sm:text-base small'> <LuIndianRupee /> </span><span className='sm:text-base small'> {product?.price}</span>
            </div>
            <div className='flex items-center justify-center mt-1'>
                <span className='text-center small sm:text-base'>Selling :</span><span className='sm:text-base small'> <LuIndianRupee /> </span><span className='sm:text-base small'> {product?.selling}</span>
            </div>
            <div className='text-center mt-1'>
                <span className='mx-4 small sm:text-base'>Stock : {product?.stock}</span>
            </div>

            {
                openEdit && (
                    <EditProduct setopenEdit={setopenEdit} product={product} getProducts={getProducts} />
                )
            }
        </div>
    )
}

export default ProductCard
