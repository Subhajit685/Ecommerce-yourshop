import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../context/storeContext'
import { LuIndianRupee } from "react-icons/lu";
import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"


export default function Cart() {

  const { cartdata, url, cartvalu, setcartvalu, calculateTotal, total, settotal } = useContext(StoreContext)

  const [loadingcart, setloadingcart] = useState(false)

  const incresValu = async (id, count) => {
    const res = await fetch(`${url}/api/cart/incrise-cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID: id, count: count + 1 })
    })

    const data = await res.json()

    if (!data.success) {
      toast.error(data.message)
    }

  }

  const decriseValu = async (id) => {
    const res = await fetch(`${url}/api/cart/decrement-cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID: id })
    })

  }
  const cartcall = async () => {
    const cart = await cartdata()
    setcartvalu(cart.cart)
  }

  const hendleDelete = async (id) => {
    const res = await fetch(`${url}/api/cart/delete-cart`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId: id })
    })

    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
    }
  }

  useEffect(() => {
    cartcall()
  }, [cartcall])

  useEffect(() => {
    calculateTotal() // Calculate total when cart items change
  }, [cartvalu])


  return (
    <div>
      {
        cartvalu ? (


          <div className='container mx-auto flex md:flex-row flex-col justify-around w-full'>
            <div className='mx-4'>
              <h1 className='text-xm lg:text-2xl font-bold'>Your cart</h1>
              {
                cartvalu?.map((item, index) => {
                  return <div className='w-full shadow-lg rounded-md my-2 p-4 bg-white relative sm:flex md:items-end' key={index}>
                    <div className='flex w-full gap-4 mb-0 sm:mb-4'>
                      <img src={item?.productImage} alt="" className='lg:h-44 h-20 lg:w-44 w-20 object-scale-down object-center' />
                      <div>
                        <p className='bg-red-300 md:px-4 px-0 text-center md:text-base text-sm md:py-0.5 py-0 border border-red-600 rounded-2xl md:max-w-28 max-w-16'>{item?.brandname}</p>
                        <p className='text-sm lg:text-2xl font-bold'>{item?.productname}</p>
                        <p className='text-sm'>{item?.catagory}</p>
                        <div className='flex items-center my-2'>
                          <span className='flex items-center line-through lg:text-base text-sm'><LuIndianRupee />{item?.price}</span><span className='mx-4 flex items-center font-bold lg:text-base text-sm'><LuIndianRupee />{item?.selling}</span>
                        </div>
                        <div className='flex gap-2'>
                          <button className='text-center px-4 bg-red-100 border hover:bg-red-400 border-red-600 rounded-md ' onClick={() => decriseValu(item?._id)}>-</button>
                          <span>{item?.count}</span>
                          <button className='text-center px-4 bg-red-100 hover:bg-red-400 border border-red-600 rounded-md' onClick={() => incresValu(item?._id, item?.count)}>+</button>
                        </div>
                      </div>
                      <div className='md:text-2xl text-xl absolute top-2 right-2' onClick={() => hendleDelete(item?._id)}>
                        <MdDelete />
                      </div>
                    </div>


                    <div className='w-60 pt-2 flex justify-center items-center md:text-xl text-sm text-start'>
                      <span className='font-bold'>Total : </span><span><LuIndianRupee /></span><span>{item?.selling * item?.count}</span>
                    </div>

                  </div>
                })
              }
            </div>

            <div className='bg-white md:w-96 md:h-52 h-40 shadow-lg rounded-md my-4 mx-4 md:my-10'>
              <div className='md:text-xl font-bold text-sm text-clip mx-auto rounded-t-md bg-orange-400 text-center py-2'>
                Total
              </div>

              <div className='flex justify-around items-center font-bold md:text-base text-sm m-2 md:py-4 py-2'>
                <span>Grand total amount : </span>
                <div className='flex justify-start items-center'>
                  <span><LuIndianRupee /></span>
                  <span>{total}</span>
                </div>
              </div>

              <div className='w-full flex px-2 justify-end border-red-400'>
                <Link to={"/shipping"} className='w-60 py-2 rounded-sm bg-blue-600 text-white text-center'>Check out</Link>
              </div>
            </div>
          </div>) : (<div className='lg:text-2xl text-base font-bold animate-pulse flex items-center justify-center gap-8 space-x-4 mt-16'>


            Please wait Your Cart loading.......
          </div>)
      }
    </div>

  )
}
