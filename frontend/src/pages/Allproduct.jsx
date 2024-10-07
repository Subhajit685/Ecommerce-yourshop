import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UploadProduct from './UploadProduct'
import StoreContext from '../context/storeContext'
import ProductCard from './ProductCard'
import { GiHamburgerMenu } from "react-icons/gi";


function Allproduct() {

  const { url, setopen } = useContext(StoreContext)
  const [openUpload, setopenUpload] = useState(false)
  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(true)

  const getProducts = async () => {
    setloading(true)
    const res = await fetch(`${url}/api/all/product`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()

    if (data.success) {
      setloading(false)
      setproducts(data.produtes)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      {
        loading ? (<div className='lg:text-2xl text-base font-bold text-center animate-pulse flex gap-8 space-x-4 mt-16'>


          Please wait Products loading.......
        </div>) : (<div className='h-full w-full container mx-auto relative'>
          <div className='bg-white shadow-md flex items-center justify-between px-3 fixed top-20 md:left-10 left-2 md:right-10 right-2 z-40'>
            <div className='md:text-4xl text-xl cursor-pointer' onClick={() => setopen(pre => !pre)}>
              <GiHamburgerMenu />
            </div>
            <h1 className='md:text-2xl text-sm font-bold p-3'>All Product. Total : {products?.length}</h1>
            <button className='md:text-base text-xs border-2 border-orange-400 bg-orange-400 sm:p-2 p-0.5 rounded-3xl hover:bg-orange-500 hover:text-white' onClick={() => setopenUpload(true)}>Upload Product</button>
          </div>

          <div className='flex flex-wrap mx-auto mt-12'>
            {
              products?.map((product, index) => {
                return <ProductCard product={product} getProducts={getProducts} key={index} />
              })
            }
          </div>
          {
            openUpload && (
              <UploadProduct setopenUpload={setopenUpload} getProducts={getProducts} />
            )
          }
        </div>)
      }
    </div>


  )
}

export default Allproduct
