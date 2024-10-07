import React, { useContext } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import StoreContext from '../context/storeContext'
import { RxCross2 } from "react-icons/rx";


function Adminpnal() {

    const {open, setopen} = useContext(StoreContext)

    const user = useSelector((state) => state.user.user)
    return (
        <div className='min-h-[85vh] flex transition-all overflow-hidden'>
            <aside className={`bg-white min-h-[95vh] w-full md:max-w-60 max-w-24 shadow-md transition-all fixed z-50 ${open ? "block" : "hidden"} transition-all`}>
                <div className='h-44 flex justify-center items-center flex-col relative'>
                    <div className='md:text-2xl text-xl absolute top-1 right-1 cursor-pointer' onClick={()=>setopen(pre=>!pre)}>
                    <RxCross2/>
                    </div>
                    <div className='md:text-6xl text-2xl cursor-pointer my-4'>
                        {
                            user?.profileImage ?
                                <img src={user?.profileImage} alt="profile image" className='md:h-20 h-10 object-cover object-center md:w-20 w-10 rounded-full ring-2 ring-orange-400' /> :

                                <FaRegUserCircle />
                        }
                    </div>
                    <p className='md:text-lg sm:text-xs small'>{user?.name}</p>
                    <p>{user?.roll}</p>
                </div>

                <div className='my-5 md:my-10'>
                    <nav className='grid gap-1 md:mx-8 mx-2'>
                        <Link to={"all-user"} className='hover:bg-orange-300 transition-all p-2 rounded-sm text-xs md:text-lg'>All user</Link>
                        <Link to={"all-product"} className='hover:bg-orange-300 transition-all p-2 rounded-sm text-xs md:text-lg'>All product</Link>
                        <Link to={"all-order"} className='hover:bg-orange-300 transition-all p-2 rounded-sm text-xs md:text-lg'>All Order</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full sm:m-4 m-1 overflow-y-scroll'>
                <Outlet/>
            </main>
        </div>
    )
}

export default Adminpnal
