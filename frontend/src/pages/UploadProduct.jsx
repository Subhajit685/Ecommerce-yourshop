import React, { useContext, useState } from 'react'
import { FaCircleXmark } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../helper/uploadImage';
import catagory from "../../helper/Catagory"
import { IoCloseCircleSharp } from "react-icons/io5";
import StoreContext from '../context/storeContext';
import { toast } from "react-hot-toast";


function UploadProduct({ setopenUpload , getProducts}) {

    const {url} = useContext(StoreContext)

    const [uploadProductImage, setuploadProductImage] = useState(false)
    const [loading, setloading] = useState(false)

    const [data, setdata] = useState({
        productname: "",
        brandname: "",
        catagory: "",
        productImage: [],
        description: "",
        price: "",
        selling: "",
        stock : "",
    })

    const hendleChenge = (e) => {
        const { name, value } = e.target
        setdata((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const hendleUploadProduct = async (e) => {
        const file = e.target.files[0]
        setuploadProductImage(file.name)

        const clodunaryImage = await uploadImage(file)

        setdata((pre) => {
            return {
                ...pre,
                productImage: [...pre.productImage, clodunaryImage.url]
            }
        })

    }

    const hendledelete = (index) =>{
       const newuploadimage = [...data.productImage]
       newuploadimage.splice(index,1)

       setdata((pre)=>{
        return{
            ...pre,
            productImage : [...newuploadimage]
        }
       })

    }


    const hendleSubmit = async (e) =>{
        e.preventDefault()
        setloading(true)
        const res = await fetch(`${url}/api/all/add-product`,{
            method:"POST",
            credentials: "include",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const adddata = await res.json()
        if(adddata.success){
            setloading(false)
            toast.success(adddata.message)
            console.log(adddata)
            setopenUpload(false)
            getProducts()
        }else{
            toast.error(adddata.message)
        }
    }



    return (
        <div className='w-full h-full bg-slate-300 fixed top-12 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-80'>
            <div className='bg-white max-w-2xl w-full h-full max-h-[80%] p-4 shadow-md rounded-md overflow-y-scroll'>
                <div className='flex items-center justify-between mx-6'>
                    <h1 className='md:text-xl text-sm font-bold'>Upload product</h1>
                    <div className='md:text-2xl text-xl cursor-pointer hover:text-orange-400' onClick={() => setopenUpload(pre => !pre)}>
                        <FaCircleXmark />
                    </div>
                </div>

                <form onSubmit={hendleSubmit}>

                    <div className="grid m-4">
                        <label htmlFor="productname" className='md:text-base text-sm'>Product Name</label>
                        <input type="text" name='productname' required value={data.productname} onChange={hendleChenge} placeholder='product name' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' />
                    </div>

                    <div className="grid m-4">
                        <label htmlFor="brandname" className='md:text-base text-sm'>Brand Name</label>
                        <input type="text" name='brandname' required value={data.brandname} onChange={hendleChenge} placeholder='brand name' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' />
                    </div>

                    <div className="grid m-4">
                        <label htmlFor="catagory" className='md:text-base text-sm'>Catagory</label>
                        <select name="catagory" id="catagory" required value={data.catagory} onChange={hendleChenge} className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm'>
                        <option value="">Select catagory</option>
                            {
                                catagory.map((ele, index) => {
                                    return <option key={index} value={ele.catagory}>{ele.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="grid m-4">
                        <label className='mb-4 md:text-base text-sm' >Product Image</label>
                        <label htmlFor="productImage">
                            <div className='border w-full lg:h-40 h-24 flex justify-center items-center flex-col cursor-pointer'>
                                <div className='text-6xl text-slate-600'>
                                    <FaCloudUploadAlt />
                                </div>
                                <p className='md:text-base text-sm'>Upload Image</p>
                                <input type="file" id='productImage' name='productImage' hidden onChange={hendleUploadProduct} />
                            </div>
                        </label>
                        <div className='w-full h-20 border my-4 flex items-center gap-2 bg-slate-100'>
                            {data?.productImage[0] ? (
                                data.productImage.map((ele, index) => {
                                    return <div key={index} className='relative group'>
                                        <div className='h-20 w-20'>
                                        <img src={ele} alt="" className='h-20 w-20 object-scale-down object-center rounded border' />
                                        </div>
                                        <div className='absolute top-0 left-0 hidden group-hover:block group-hover:text-red-400 text-xl cursor-pointer' onClick={()=> hendledelete(index)}>
                                            <IoCloseCircleSharp />
                                        </div>
                                    </div>
                                })
                            )

                                : <p className='mx-10 md:text-base text-sm'>No image uploader</p>}

                        </div>
                    </div>

                    <div className="grid m-4">
                        <label htmlFor="brandname" className='md:text-base text-sm'>Description</label>
                        <textarea type="textaera" required name='description' value={data.description} onChange={hendleChenge} placeholder='Descripe here...' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' rows={6}/>
                    </div>

                    <div className="grid m-4">
                        <label htmlFor="brandname" className='md:text-base text-sm'>Price</label>
                        <input type="number" required name='price' value={data.price} onChange={hendleChenge} placeholder='price' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' />
                    </div>

                    <div className="grid m-4">
                        <label htmlFor="brandname" className='md:text-base text-sm'>Selling price</label>
                        <input type="number" name='selling' required value={data.selling} onChange={hendleChenge} placeholder='selling price' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' />
                    </div>
                    <div className="grid m-4">
                        <label htmlFor="stock" className='md:text-base text-sm'>Stock</label>
                        <input type="number" name='stock' required value={data.stock} onChange={hendleChenge} placeholder='total stock' className='border p-1 rounded-md px-4 mt-2 md:text-base text-sm' />
                    </div>

                            {
                                loading ? (<button type="button" className="w-full p-2 bg-orange-400 rounded-sm text-white" disabled>
                                    Processing...
                                  </button>) : (<button className='w-full p-2 bg-orange-400 rounded-sm hover:bg-orange-500 hover:text-white'>Upload product</button>)
                            }
                    
                </form>
            </div>

        </div>
    )
}

export default UploadProduct
