import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import StoreContext from '../context/storeContext';
import { toast } from 'react-hot-toast';
import { createUser } from '../store/userSlice';

function Navbar() {

    const { url, cartlength, setopen, setpage,userData } = useContext(StoreContext)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const navigate = useNavigate()
    const [show1, setshow1] = useState(false)
    const [search, setsearch] = useState("")

    const hendleClick = async () => {
        const res = await fetch(`${url}/api/user/logout`, {
            method: "get",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await res.json()

        if (data.success) {
            dispatch(createUser(null))
            navigate("/")
            toast.success(data.message)
        }
    }

    const hendleSearchClick = (e) => {
        setopen(true)
        setpage(1)
        setshow1(false)
    }
    const hendlesubmit = (e) => {
        e.preventDefault()
        setsearch("")
    }

    useEffect(()=>{
        userData()
    }, [])


    return (
        <header className='w-full h-16 shadow-md bg-white fixed top-0 z-50'>
            <div className='container h-full flex items-center relative justify-between px-4 mx-auto'>
                <div className={`z-50 absolute top-20 w-4/5 h-8 ${show1 ? "block" : "hidden"} block lg:hidden`}>
                    <form onSubmit={hendlesubmit} className='flex items-center'>
                        <input type="text" placeholder='Search here...' className='w-full h-full border px-4 py-1.5 shadow-lg rounded-s-md' value={search} onChange={(e) => setsearch(e.target.value)} />
                        <Link to={`/search/${search}`} type='submit' className='w-16 h-8 bg-orange-400 hover:bg-orange-500 flex justify-center items-center rounded-r-md' onClick={hendleSearchClick}><IoSearch /></Link>
                    </form>
                </div>
                <div onClick={() => setopen(true)}>
                    <Link to={"/"} className='flex gap-4'>
                        <img src="/Untitled.png" alt="" className='h-12' />
                        <img src="/Screenshot 2024-09-19 092745.png" alt="" className='hidden md:block h-12' />
                    </Link>
                </div>


                <form onSubmit={hendlesubmit}>
                    <div className='hidden lg:flex items-center justify-between w-full max-w-sm'>
                        <input type="text" placeholder='Search here...' className='w-full border outline-none focus-within:shadow-lg p-1 rounded-l-full px-3' value={search} onChange={(e) => setsearch(e.target.value)} />
                        <Link to={`/search/${search}`} type='submit' className='text-xl h-8 w-16 bg-orange-400 hover:bg-orange-500 flex justify-center items-center p-1 rounded-r-full' onClick={hendleSearchClick}><IoSearch /></Link>
                    </div>
                </form>



                <div className='flex md:gap-7 gap-5 items-center'>

                    {!show1 &&
                        <div className='block lg:hidden sm:text-3xl text-2xl cursor-pointer' onClick={() => setshow1(pre => !pre)}>
                            <IoSearch />
                        </div>
                    }
                    {user && (
                        <Link to={"/cart"} className='sm:text-3xl text-2xl relative cursor-pointer' onClick={() => setopen(true)}>
                            <FaShoppingCart />
                            <div className='absolute -top-2 -right-1 sm:h-5 h-4 sm:w-6 w-4 bg-orange-400 flex items-center justify-center rounded-full'>
                                <span className='sm:text-sm text-xs'>{cartlength}</span>
                            </div>
                        </Link>
                    )}

                    <div className='relative flex justify-center'>
                        {user && (
                            <div className='sm:text-3xl text-xl cursor-pointer' onClick={() => setshow(pre => !pre)}>
                                {
                                    user?.profileImage ?
                                        <img src={user?.profileImage} alt="profile image" className='sm:h-10 h-6 object-cover object-center w-6 sm:w-10 rounded-full ring-2 ring-orange-400' /> :

                                        <FaRegUserCircle />
                                }
                            </div>
                        )}
                        {show && (
                            <div className='absolute bottom-0 top-12 bg-white h-fit p-2 shadow-xl shadow-orange-400 rounded-md flex flex-col' onClick={() => setopen(true)}>
                                {
                                    user?.roll === "ADMIN" && (<Link to={"/admin-panel"} onClick={() => setshow(pre => !pre)} className='whitespace-nowrap p-2 m-1 hover:bg-orange-300 transition-all rounded-md' >Admin panal</Link>)
                                }
                                

                                <Link to={"/profile"} onClick={() => setshow(pre => !pre)} className='whitespace-nowrap p-2 m-1 hover:bg-orange-300 transition-all rounded-md' >Profile</Link>
                            </div>
                        )}
                    </div>

                    <div className='lg:h-10 h-8 w-15 lg:w-20 text-xs lg:text-lg text-center hover:bg-orange-500 bg-orange-400 p-2 rounded-full' onClick={() => setopen(true)}>
                        {user ?
                            <button onClick={hendleClick} className='flex items-center justify-center mx-auto'>Logout</button>
                            :
                            <Link to={"/login"} className='flex items-center justify-center mx-auto'>Login</Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
