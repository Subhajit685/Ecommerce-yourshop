import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../context/storeContext'
import { FaUserEdit } from "react-icons/fa";
import moment from "moment"
import { TiTick } from "react-icons/ti";
import { toast } from "react-hot-toast"
import { GiHamburgerMenu } from "react-icons/gi";

function AllUser() {
    const { url, setopen } = useContext(StoreContext)
    const [edit, setsdit] = useState("")

    const [users, setusers] = useState([])

    const [roll, setroll] = useState("")
    const [loading, setloading] = useState(true)


    const hendleChenge = (e) => {
        setroll(e.target.value)
        console.log(e.target.value)
    }


    const getAlluser = async () => {
        setloading(true)
        try {
            const res = await fetch(`${url}/api/all/user`, {
                method: "get",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json()
            setloading(false)
            setusers(data.users)
        } catch (error) {
            console.log("fetch all user", error)
        }
    }

    const hendleClick = async (id) => {
        setsdit("")
        const res = await fetch(`${url}/api/all/roll`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, roll })
        })

        const data = await res.json()
        if (data.success) {
            getAlluser()
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }

    }

    useEffect(() => {
        getAlluser()
    }, [])
    return (
        <div >
            {
                loading ? (<div className='lg:text-2xl text-base font-bold animate-pulse flex items-center justify-center gap-8 space-x-4 mt-16'>


                    Please wait User loading.......
                </div>) : (

                    <div className='overflow-x-scroll'>
                        <div className='bg-white shadow-md flex items-center justify-between px-3 fixed top-20 md:left-10 left-2 md:right-10 right-2 z-40'>
                            <div className='md:text-4xl text-xl cursor-pointer' onClick={() => setopen(pre => !pre)}>
                                <GiHamburgerMenu />
                            </div>
                            <h1 className='md:text-2xl text-sm font-bold p-3'>All Users. Total user : {users?.length}</h1>
                            <div>

                            </div>
                        </div>
                        <table className='w-full table bsm sm:bsm md:text-xs lg:text-xs xl:text-sm mt-16'>
                            <thead>
                                <tr className='bg-black text-white'>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Roll</th>
                                    <th>Created At</th>
                                    <th className='sm:block hidden'>User Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    users?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                {edit === item._id ?
                                                    <select name="roll" id="roll" value={roll} onChange={hendleChenge}>
                                                        <option value="Select">Select</option>
                                                        <option value="GENERAL">GENERAL</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                    : <p>{item.roll}</p>
                                                }
                                            </td>
                                            <td>{moment(item.createdAt).format('LL')}</td>
                                            <td onChange={hendleChenge} value={item._id} className='sm:block hidden'>{item._id}</td>
                                            <td>
                                                {edit === item._id ?
                                                    <button className='md:text-2xl text-xs' onClick={() => hendleClick(item._id)}><TiTick /></button>
                                                    :
                                                    <button className='md:text-2xl text-xs' onClick={() => setsdit(item._id)}><FaUserEdit /></button>
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>

    )
}

export default AllUser
