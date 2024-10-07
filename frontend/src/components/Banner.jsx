import React, { useEffect, useState } from 'react'
import img1 from "../assets/banner/img1.webp"
import img2 from "../assets/banner/img2.webp"
import img3 from "../assets/banner/img3.jpg"
import img4 from "../assets/banner/img4.jpg"
import img5 from "../assets/banner/img5.webp"


import img_1 from "../assets/banner/img1_mobile.jpg"
import img_2 from "../assets/banner/img2_mobile.webp"
import img_3 from "../assets/banner/img3_mobile.jpg"
import img_4 from "../assets/banner/img4_mobile.jpg"
import img_5 from "../assets/banner/img5_mobile.png"

import { IoIosArrowDropleftCircle } from "react-icons/io";

import { IoIosArrowDroprightCircle } from "react-icons/io";




function Banner() {

    const [image, setimage] = useState(0)
    const desktop = [
        img1,
        img2,
        img3,
        img4,
        img5,
    ]

    const mobile = [
        img_1,
        img_2,
        img_3,
        img_4,
        img_5,
    ]

    const next = () =>{
        if(desktop.length - 1> image){
            setimage(pre => pre +1)
        }else{
            setimage(0)
        }
    }
    const prev = () =>{       
        if(image !== 0){
            setimage(pre => pre - 1)
        }else{
            setimage(4)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
                next()
        }, 5000)

        return ()=> clearInterval(interval)
    })
   
  return (
    <div className='2xl:h-96 xl:h-80 lg:h-72 md:h-60 sm:h-52 h-52 sm:w-full w-fit bg-slate-200 sm:my-8 my-4 mx-auto'>
      <div className='w-full h-full hidden sm:flex relative  overflow-hidden'>
            <button className='absolute z-50 t left-1 cursor-pointer text-5xl' onClick={prev}><IoIosArrowDropleftCircle/></button>
            <button className='absolute z-50 t right-1 cursor-pointer text-5xl' onClick={next}><IoIosArrowDroprightCircle/></button>

        {
            desktop?.map((deskimage, index)=>{
                return <div className='h-full w-full min-h-full min-w-full -z-9 transition-all' key={index} style={{transform: `translateX(-${image * 100}%)`}}>
                    <img src={deskimage} alt="banner image" className='h-full w-full'/>
                </div>
            })
        }
      </div>

      <div className='w-full h-full min-h-full min-w-full sm:hidden flex  overflow-hidden'>

        {
            mobile?.map((deskimage, index)=>{
                return <div className='h-full w-full min-h-full min-w-full -z-9 transition-all' key={index} style={{transform: `translateX(-${image * 100}%)`}}>
                    <img src={deskimage} alt="banner image" className='h-full w-full object-cover object-center'/>
                </div>
            })
        }
      </div>
    </div>
  )
}

export default Banner
