import React, { useCallback, useContext, useEffect, useState } from 'react'
import StoreContext from '../context/storeContext'
import { json, Link, useNavigate, useParams } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { FaArrowsToEye, FaIndianRupeeSign } from "react-icons/fa6";
import { toast } from "react-hot-toast"
import ShowProduct from '../components/ShowProduct';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import loginIcons from "../assets/signin.gif"


function ProductPage() {

  const parems = useParams()

  const { url, cartdata } = useContext(StoreContext)
  const [data, stedata] = useState({})
  const [loading, setloading] = useState(true)
  const [activimage, setactivimage] = useState("")
  const [cordenet, setcordenet] = useState({ x: 0, y: 0 })
  const [openZoom, setopenZoom] = useState(false)
  const [productdata, setproductdata] = useState([])
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const [comment, setcomment] = useState("")
  const [rating, setrating] = useState(0)

  const getAllproduct = async (catagory) => {
    const res = await fetch(`${url}/api/all/productBycatagory`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ catagory })
    })

    const data = await res.json()
    if (data.success) {
      setproductdata(data?.product)
    }
  }

  const getproductdetiles = async (proid = null) => {
    setloading(true)
    const id = proid ? proid : parems?.id
    const res = await fetch(`${url}/api/all/product-detiles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })

    const valu = await res.json()

    if (valu.success) {
      setloading(false)
      stedata(valu.product)
      setactivimage(valu?.product?.productImage[0])
      getAllproduct(valu?.product?.catagory)
    }

  }

  const hendlecart = async (id) => {
    if (user !== null) {
      const res = await fetch(`${url}/api/cart/add-cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productID: id })
      })

      const data = await res.json()
      if (data.success) {
        cartdata()
        toast.success(data?.message)
      }
    } else {
      navigate("/login")
    }
  }

  const review = async (productID) => {

    const res = await fetch(`${url}/api/all/review`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID, comment, rating }) // Use valid rating
    });

    const data = await res.json(); // Parse JSON response
    if (data.success) {
      getproductdetiles(); // Refresh product details to update reviews
      setcomment(""); // Clear comment input
      setrating(0); // Reset rating
    } else {
      toast.error(data.message || "Error submitting review"); // Show error message
    }
  };


  const hendlecordenet = useCallback((e) => {
    setopenZoom(true)
    const { left, top, height, width } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setcordenet({
      x,
      y
    })
  }, [cordenet])

  const closeZoom = () => {
    setopenZoom(false)
  }

  const hendlerefrash = (id) => {
    getproductdetiles(id)
    navigate(`/produte/${id}`)
  }


  useEffect(() => {
    getproductdetiles()
  }, [])


  return (
    <div className='container mx-auto my-4'>

      {
        data ? (


          <div className='flex flex-col lg:flex-row gap-4 mx-auto'>
            <div className='flex flex-col-reverse lg:flex-row gap-4'>
              <div className='2xl:h-96 xl:h-96 lg:h-96 md:h-36 sm:h-36 h-28 flex flex-row lg:flex-col gap-1 px-2 overflow-x-scroll mx-auto noScroll-bar'>
                {
                  data?.productImage?.map((image, index) => {
                    return <div className='2xl:h-28 xl:h-28 lg:h-28 md:h-24 sm:h-20 2xl:w-28 xl:w-28 lg:w-28 md:w-24 sm:w-20 h-20 w-20 bg-white mb-2 shadow-md rounded-md cursor-pointer' key={index} onClick={() => setactivimage(image)}>
                      <img src={image} alt="" className='h-full w-full object-scale-down object-center rounded-md p-2' />
                    </div>
                  })
                }
              </div>
              <div className='2xl:h-96 xl:h-96 lg:h-96 md:h-96 sm:h-96 2xl:w-96 xl:w-96 lg:w-96 md:w-96 sm:w-96 h-72 w-72 bg-white cursor-pointer relative mx-auto p-1'>
                <img src={activimage} alt="" className='h-full w-full object-scale-down object-center p-4' onMouseMove={hendlecordenet} onMouseOut={closeZoom} />
                {
                  openZoom && (<div className='hidden lg:block absolute scale-125 bg-white h-full w-full top-12 -right-[450px] z-50'>
                    <div className='min-w-full min-h-full' style={{ backgroundImage: `url(${activimage})`, backgroundRepeat: 'no-repeat', backgroundPosition: `${cordenet.x * 100}% ${cordenet.y * 100}%` }}>

                    </div>
                  </div>)
                }

              </div>
            </div>

            <div className='px-4 pt-2'>
              <p className='lg:h-8 h-8 lg:max-w-36 max-w-28 bg-red-200 texxt-sm lg:text-xl text-center rounded-3xl border border-red-700 text-red-700'>{data?.brandname}</p>
              <p className='text-xl lg:text-4xl mt-2 font-bold'>{data?.productname}</p>
              <p className='text-slate-500'>{data?.catagory}</p>

              <div className='flex items-center gap-2 text-xl text-orange-400'>
                <ReactStars
                  edit={false}
                  count={5}
                  size={24}
                  value={data?.rating}
                  isHalf={true}
                  activeColor="#ffd700"
                />
                <span className='text-sm lg:text-xl cursor-pointer text-black'>&#40;{data?.review?.length} reviews&#41;</span>
              </div>
              {
                data?.stock ? (<div className='flex gap-4 lg:my-8 my-4'>
                  <div className='flex items-center justify-center text-sm lg:text-xl line-through text-slate-600'>
                    <FaIndianRupeeSign />
                    <p className=''>{data?.price}</p>
                  </div>
                  <div className='flex items-center justify-center text-sm lg:text-2xl font-bold'>
                    <FaIndianRupeeSign />
                    <p>{data?.selling}</p>
                  </div>
                </div>) : ("")
              }

              <div className='flex gap-1 mb-4'>
                <p>Status : </p>{data?.stock > 0 ? (<p>In Stock</p>) : (<p>Out Of Stock</p>)}
              </div>
              {
                data?.stock ? (<div className='flex gap-2'>
                  <button className='p-2 lg:w-28 w-20 lg:text-base text-sm bg-red-200 rounded-md border border-red-700 hover:bg-red-600 hover:text-white text-center' onClick={() => hendlecart(data?._id)}>Add cart</button>
                  <Link to={"/cart"} className='p-2 lg:w-28 w-20 lg:text-base text-sm bg-red-200 rounded-md border border-red-700 hover:bg-red-600 hover:text-white text-center' onClick={() => hendlecart(data?._id)}>Buy now</Link>
                </div>) : (<button className='p-2 lg:w-28 w-20 lg:text-base text-sm bg-red-200 rounded-md border border-red-700 hover:bg-red-600 hover:text-white text-center' >Notify me</button>)
              }


              <p className='my-4 lg:text-base text-sm'>{data?.description}</p>
            </div>
          </div>
        ) : (


          <div className='lg:text-2xl text-base font-bold animate-pulse flex items-center justify-center gap-8 space-x-4 mt-16'>
            Wait Loading....
          </div>


        )
      }
      <div className='mt-4 px-4'>
        <h2 className='my-5 lg:text-2xl text-sm font-bold mx-4'>Leave a Review & Rating</h2>
        {/* Rating Input */}

        <div className='flex'>
          <div className='flex  items-center border w-full bg-white rounded-sm shadow-lg'>
            <input type='text' className='p-2 w-full lg:h-12 h-8 border  border-none' placeholder='Write your comment...' onChange={(e) => setcomment(e.target.value)} value={comment} />
            <div className='min-w-28'>
              <ReactStars
                count={5}
                size={24}
                value={rating}
                isHalf={true}
                activeColor="#ffd700"
                onChange={(newRating) => setrating(newRating)} // Update the rating state
              />
            </div>
          </div>

          <button className='bg-orange-400 px-4 py-1 rounded-e-sm hover:bg-orange-600 hover:text-white' onClick={() => review(data?._id)}>Comment</button>
        </div>

      </div>

      <h1 className='mt-5 lg:text-2xl text-sm font-bold mx-4'>All Comments</h1>
      <div className='mt-6 flex gap-4 overflow-x-auto noScroll-bar px-4'>
        {data?.review && data?.review.length > 0 ? (
          data.review.map((item, index) => (
            <div
              key={index}
              className='min-w-[250px] md:min-w-[300px] lg:min-w-[350px] p-4 bg-white shadow-md rounded-md'>
              <div className='flex items-center gap-4'>
                <img
                  src={item?.image || loginIcons}
                  alt=""
                  className='h-12 w-12 rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold text-base lg:text-lg'>{item?.name}</p>
                  <ReactStars
                    edit={false}
                    count={5}
                    size={20}
                    value={item?.rating}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <p className='mt-3 text-sm lg:text-base text-gray-600 line-clamp-2'>
                {item?.comment}
              </p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center w-full'>No reviews yet</p>
        )}
      </div>






      <h1 className='mt-10 lg:text-2xl text-sm font-bold mx-4'>Your interest</h1>

      <div className='flex gap-2 lg:my-4 my-2 overflow-x-scroll noScroll-bar px-4'>
        {
          productdata?.map((item, index) => {
            return <div className='bg-white w-28 2xl:w-52 xl:w-52 lg:w-40 md:w-32 sm:w-28 h-36 2xl:h-64 xl:h-64 lg:h-56 md:h-48 sm:h-36 rounded-r-md shadow-lg cursor-pointer' onClick={() => hendlerefrash(item?._id)} key={index}>
              <div className='h-full w-full'>
                <div className='w-20 2xl:w-52 xl:w-52 lg:w-40 md:w-28 sm:w-24 h-20 2xl:h-52 xl:h-52 lg:h-40 md:h-28 sm:h-24 pt-2 sm:pt-4 overflow-hidden mx-auto'>
                  <img src={item?.productImage[0]} alt="" className='h-full w-full object-contain object-center hover:scale-105 transition-all' />
                </div>
                <p className='text-center text-xs md:text-base line-clamp-1 px-0.5'>{item?.productname}</p>
                <div className='text-center small md:text-base'><span className='mx-2 line-through text-gray-800'>{item?.price}</span><span className='font-bold'>{item?.selling}</span></div>
              </div>
            </div>
          })
        }
      </div>



    </div>
  )
}

export default ProductPage
