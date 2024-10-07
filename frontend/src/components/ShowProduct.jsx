import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../context/storeContext'
import { Link } from 'react-router-dom'

function ShowProduct({ catagory }) {

    const { url } = useContext(StoreContext)
    const [loading, setloading] = useState(true)

    const payload = {
        catagory: catagory
    }

    const [products, setproducts] = useState(null)


    const getproductbyCatagory = async () => {
        setloading(true)
        const res = await fetch(`${url}/api/all/catagory`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (data.success) {
            setloading(false)
            setproducts(data.product)
        }
    }


    useEffect(() => {
        getproductbyCatagory()
    }, [])

    return (

        <Link to={`/produte/${products?._id}`} className='bg-white w-20 2xl:w-52 xl:w-52 lg:w-40 md:w-28 sm:w-24 h-32 2xl:h-64 xl:h-64 lg:h-56 md:h-48 sm:h-36 rounded-r-md shadow-lg cursor-pointer'>

            {
                loading ? (<div className='animate-pulse flex gap-8 space-x-4'>
                    <div className='w-20 2xl:w-52 xl:w-52 lg:w-40 md:w-28 sm:w-24 h-20 2xl:h-52 xl:h-52 lg:h-40 md:h-28 sm:h-24 pt-2 sm:pt-4'>
                        <div className="bg-slate-300 h-5/6 w-5/6 mx-auto rounded-lg"></div>
                        <div className="h-4 w-5/6 mx-auto mt-4 rounded-lg bg-slate-200"></div>
                        <div className="h-4 w-5/6 mx-auto mt-4 rounded-lg bg-slate-200"></div>
                        <div className=""></div>
                    </div>
                </div>

                ) : (

                    <div className='h-full w-full'>
                        <div className='w-20 2xl:w-52 xl:w-52 lg:w-40 md:w-28 sm:w-24 h-20 2xl:h-52 xl:h-52 lg:h-40 md:h-28 sm:h-24 pt-2 sm:pt-4 overflow-hidden'>
                            <img src={products?.productImage[0]} alt="" className='h-full w-full object-contain object-center  hover:scale-105 transition-all' />
                        </div>
                        <p className='text-center text-xs md:text-base line-clamp-1 px-0.5 mt-1'>{products?.productname}</p>
                        <div className='text-center small md:text-sm pb-0.5'><span className='mx-2 line-through text-gray-800'>{products?.price}</span><span className='font-bold'>{products?.selling}</span></div>
                    </div>

                )
            }



        </Link>
    )
}

export default ShowProduct
