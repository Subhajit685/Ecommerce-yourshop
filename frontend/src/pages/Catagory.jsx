import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StoreContext from '../context/storeContext';
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import ReactStars from "react-rating-stars-component";

function Catagory() {
  const { url, page, setpage } = useContext(StoreContext);
  const params = useParams();
  const [resulrperpage, setresulrperpage] = useState(0);
  const [range, setrange] = useState([0, 150000]);
  const [productcount, setproductcount] = useState(0);
  const [product, setproduct] = useState([]);

  const handleChange1 = (e, newPrice) => {
    setrange(newPrice);
  };

  const getproduct = async () => {
    const res = await fetch(`${url}/api/all/allcatagory-product?keyword=${params.keyword.trim()}&page=${page}&price[gte]=${range[0]}&price[lte]=${range[1]}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();
    if (data.success) {
      setproduct(data?.product);
      setresulrperpage(data?.resultPrePage);
      setproductcount(data?.productLength);
    }
  };

  const setCurrentPageNo = (e) => {
    setpage(e);
  };

  useEffect(() => {
    getproduct();
  }, [params, page, range]);

  return (
    <Fragment>
      {/* Filter Section */}
      <div className="container mx-auto px-4 lg:px-16 pb-4">
        <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6">
          <h1 className='text-lg lg:text-2xl font-bold mb-4 text-gray-700'>Filter Products</h1>

          {/* Price Range Slider */}
          <div className="flex flex-col">
            <p className="text-sm lg:text-base font-medium text-gray-600">Price Range: {range[0]} - {range[1]}</p>
            <Slider
              value={range}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={150000}
              className="text-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='bg-gray-400 h-px container mx-auto'></div>

      {/* Product Grid */}

      {
        product[0] ? (

          <div className='container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4 lg:px-16 mt-8'>
            {
              product?.map((item, index) => (
                <Link to={`/produte/${item?._id}`} className='bg-white rounded-lg shadow-lg transition-transform hover:scale-105' key={index}>
                  <div className='h-full flex flex-col'>
                    <div className='relative w-full h-40 sm:h-48 md:h-52 p-2'>
                      <img src={item?.productImage[0]} alt={item?.productname} className='w-full h-full object-scale-down rounded-t-lg' />
                    </div>

                    <div className='p-4 flex flex-col justify-center items-center'>

                      <div className='flex flex-col items-center'>

                        <div className='flex items-center space-x-2'>

                          <ReactStars
                            edit={false}
                            count={5}
                            size={20}
                            value={item?.rating || 0}
                            isHalf={true}
                            activeColor="#ffd700"
                          />
                        </div>
                        <span className='text-xs lg:text-sm text-gray-600 whitespace-nowrap'>&#40;{item?.numberOfReview} reviews&#41;</span>
                      </div>
                      <p className='text-center text-xs md:text-base font-medium line-clamp-1'>{item?.productname}</p>
                      <div className='mt-2 text-center'>
                        <span className='line-through text-gray-500 text-sm'>{item?.price}</span>
                        <span className='ml-2 font-bold text-lg text-red-600'>{item?.selling}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>) : (<div className='lg:text-2xl text-base font-bold animate-pulse flex items-center justify-center gap-8 space-x-4 mt-16'>


            Please wait Products loading.......
          </div>)
      }


      {/* Pagination */}
      <div className='my-12 flex justify-center'>
        <Pagination
          activePage={page}
          itemsCountPerPage={resulrperpage}
          totalItemsCount={productcount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="inline-block mx-0.5 md:mx-1 px-2 md:px-3 py-1 text-sm md:text-base text-gray-700 bg-white border rounded hover:bg-orange-400"
          linkClass="text-decoration-none"
          activeClass='bg-orange-500 text-white'
          activeLinkClass='activeLinkClass'
        />
      </div>
    </Fragment>
  );
}

export default Catagory;
