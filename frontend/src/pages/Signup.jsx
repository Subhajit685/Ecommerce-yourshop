import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";
import { toast } from 'react-hot-toast';
import StoreContext from '../context/storeContext';
import imageTobase64 from '../../helper/imageBase64';
import loginIcons from "../assets/signin.gif"

function Signup() {

    const { url, userData } = useContext(StoreContext)
    const [showpassword, setshowpassword] = useState(false)
    const [showcpassword, setcshowpassword] = useState(false)
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        profileImage: ""
    })


    const navigate = useNavigate()

    const hendleimage = async (e) => {

        const imagefile = e.target.files[0]
        const image = await imageTobase64(imagefile)
        setdata((preve) => {
            return {
                ...preve,
                profileImage: image
            }
        })
    }

    const hendleChenge = (e) => {
        const { name, value } = e.target
        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const hendlesubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        const res = await fetch(`${url}/api/user/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const dataapi = await res.json()

        if (dataapi.success) {
            setloading(false)
            toast.success(dataapi.message)
            navigate("/")
            userData()
        } else {
            toast.error(dataapi.message)
            setloading(false)
        }
    }


    return (
        <div className='container w-full max-w-sm mx-auto mt-10'>
            <div className='w-full mx-auto shadow-orange-400 shadow-2xl rounded-lg py-4'>


                <div className='w-24 my-4 mx-auto relative overflow-hidden cursor-pointer'>
                    <img src={data.profileImage || loginIcons} alt="" className='w-full h-24 object-cover object-center rounded-full' />
                    <form>
                        <label>
                            <div className='text-xs bg-slate-200 bg-opacity-80 pt-3 absolute w-full text-center bottom-0 h-12 rounded-b-full hover:font-bold'>
                                Upload image
                            </div>
                            <input type="file" className='hidden' onChange={hendleimage} />
                        </label>
                    </form>
                </div>




                <form onSubmit={hendlesubmit}>

                    {/* name  */}
                    <div className='grid mx-4 gap-2'>
                        <label htmlFor="name">Name</label>
                        <div>
                            <input type="text" name='name' placeholder='Jhon Deo' className='bg-transparent outline-none focus-within:ring rounded-md p-1 border px-2 w-full h-full' required value={data.name} onChange={hendleChenge} />
                        </div>
                    </div>

                    {/* email  */}

                    <div className='grid mx-4 gap-2 mt-4'>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input type="email" name='email' placeholder='example@gmail.com' className='bg-transparent outline-none focus-within:ring rounded-md p-1 border px-2 w-full h-full' required value={data.email} onChange={hendleChenge} />
                        </div>
                    </div>

                    {/* password  */}

                    <div className='grid mx-4 gap-2 mt-4'>
                        <label htmlFor="password">Password</label>
                        <div className='flex border focus-within:ring rounded-md items-center'>
                            <input type={showpassword ? "text" : "password"} placeholder='********' name='password' className='bg-transparent outline-none p-1 px-2 w-full h-full' autoComplete='on' required value={data.password} onChange={hendleChenge} />
                            <div className='mx-2 text-xl cursor-pointer' onClick={(() => setshowpassword((prev) => !prev))}>
                                <span>{showpassword ?
                                    <ImEye />
                                    :
                                    <ImEyeBlocked />
                                }</span>
                            </div>
                        </div>
                    </div>

                    {/* confirm password  */}

                    <div className='grid mx-4 gap-2 mt-4'>
                        <label htmlFor="cpassword">Confirm Password</label>

                        <div className='flex border focus-within:ring rounded-md items-center'>
                            <input type={showcpassword ? "text" : "password"} placeholder='********' name='cpassword' className='bg-transparent outline-none p-1 px-2 w-full h-full' autoComplete='on' required value={data.cpassword} onChange={hendleChenge} />
                            <div className='mx-2 text-xl cursor-pointer' onClick={(() => setcshowpassword((prev) => !prev))}>
                                <span>{showcpassword ?
                                    <ImEye />
                                    :
                                    <ImEyeBlocked />
                                }</span>
                            </div>
                        </div>
                    </div>


                    <div className='grid bg-orange-400 mx-4 my-4 rounded-lg hover:bg-orange-500'>
                        {
                            loading ? (<button type="button" className="w-full p-2 bg-orange-400 rounded-lg text-white" disabled>
                                Processing...
                            </button>) : (<button className='h-8'>Sign up</button>)
                        }

                    </div>
                </form>
                <div className='my-4'>
                    <p className='mx-4 text-sm'>Allready have account ? <Link to={"/login"} className='text-orange-400 hover:underline'>Login</Link></p>
                </div>
            </div>
        </div >
    )
}

export default Signup
