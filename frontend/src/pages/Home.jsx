import React from 'react'
import Allcatagory from '../components/Allcatagory'
import Banner from '../components/Banner'
import ShowProduct from '../components/ShowProduct'

function Home() {
  return (
    <div className='w-full'>
      <div className='container mx-auto lg:my-4 my-0 px-2'>
        <Allcatagory />

        <Banner />

        <h1 className='lg:text-2xl text-sm font-bold my-4'>Hot products</h1>
        <div className='flex gap-2'>
          <div className='flex gap-2'>
            <ShowProduct catagory={"mobile"} />
            <ShowProduct catagory={"laptop"} />
            <div className='hidden sm:block bg-white rounded-r-md shadow-lg'>
              <ShowProduct catagory={"airpodes"} />
            </div>
          </div>
          <div className='h-32 2xl:h-64 xl:h-64 lg:h-56 md:h-48 sm:h-36 w-full sm:w-3/4'>
            <img src='/seal 2.jpg' alt="" className='h-full w-full object-cover object-center rounded-xl shadow-xl' />
          </div>
        </div>

        <h1 className='lg:text-2xl text-sm font-bold my-4'>Trending products</h1>

        <div className='flex gap-2 my-4 overflow-x-scroll noScroll-bar'>
          <ShowProduct catagory={"airpodes"} />
          <ShowProduct catagory={"camera"} />
          <ShowProduct catagory={"earphones"} />
          <ShowProduct catagory={"laptop"} />
          <ShowProduct catagory={"mobile"} />
          <ShowProduct catagory={"mouse"} />
          <ShowProduct catagory={"printers"} />
          <ShowProduct catagory={"processer"} />
          <ShowProduct catagory={"refrigerator"} />
          <ShowProduct catagory={"speakers"} />
          <ShowProduct catagory={"trimmers"} />
          <ShowProduct catagory={"tv"} />
          <ShowProduct catagory={"watches"} />
        </div>
        <h1 className='lg:text-2xl text-sm font-bold my-4'>For you</h1>
        <div className='flex gap-2'>
          <div className='flex gap-2'>
            <ShowProduct catagory={"watches"} />
            <ShowProduct catagory={"mobile"} />
            <div className='hidden sm:block bg-white rounded-r-md shadow-lg'>
              <ShowProduct catagory={"speakers"} />
            </div>
          </div>
          <div className='h-32 2xl:h-64 xl:h-64 lg:h-56 md:h-48 sm:h-36 w-full sm:w-3/4'>
            <img src='/sale 1.avif' alt="" className='h-full w-full object-cover object-center rounded-xl shadow-xl' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
