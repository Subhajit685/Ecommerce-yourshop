import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../context/storeContext'
import { Link } from "react-router-dom"

function Allcatagory() {

  const { url } = useContext(StoreContext)

  const [products, setproducts] = useState([])
  const [shimmer, setshimmer] = useState(true)

  const getproductbyCatagory = async () => {
    setshimmer(true)
    const res = await fetch(`${url}/api/all/allcatagory`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await res.json()
    if (data.success) {
      setshimmer(false)
      setproducts(data.catagory)
    }
  }

  useEffect(() => {
    getproductbyCatagory()
  }, [])
  return (
    <div className='container flex 2xl:gap-5 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 gap-4 p-3 sm:p-0 overflow-x-scroll noScroll-bar scroll-smooth'>
      {
        shimmer ? (
          <div className='animate-pulse flex gap-8 space-x-4'>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
            <div className="rounded-full bg-slate-200 md:h-20 md:w-20 w-8 h-8"></div>
          </div>
        ) : (
          products?.map((item, index) => {
            return <Link to={`/catagory/${item?.catagory}`} className='2xl:min-w-24 xl:min-w-20 md:min-w-12 sm:min-w-12 min-w-10 cursor-pointer flex flex-col justify-center items-center group' key={index}>
              <img src={item?.productImage[0]} alt="" className='xl:h-16 2xl:h-20 xl:w-16 2xl:w-20 lg:h-16 lg:w-16 md:h-12 md:w-12 sm:h-10 sm:w-10 h-8 w-8 object-scale-down object-center rounded-full border border-orange-400 group-hover:scale-110 transition-all' />
              <p className='small sm:text-xs lg:text-sm text-center capitalize'>{item?.catagory}</p>
            </Link>
          }))

      }
    </div>
  )
}

export default Allcatagory
