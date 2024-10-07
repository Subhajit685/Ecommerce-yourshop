import React, { useContext, useState } from 'react'
import { FaUserLock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";
import { toast } from 'react-hot-toast';
import StoreContext from '../context/storeContext';

function Login() {

    const { url, userData } = useContext(StoreContext)
    const [showpassword, setshowpassword] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const hendlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${url}/api/user/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (data.success) {
            setLoading(false)
            toast.success(data.message)
            navigate("/")
            userData()
        } else {
            toast.error(data.message)
            setLoading(false)
        }

    }
    return (
        <div className='container  w-full max-w-sm mx-auto mt-10'>
            <div className='w-full mx-auto shadow-orange-400 shadow-2xl rounded-lg py-4'>
                <div className='text-8xl flex justify-center my-4 mt-4'>
                    <FaUserLock />
                </div>
                <form onSubmit={hendlesubmit}>
                    <div className='grid mx-4 gap-2'>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input type="email" name='email' placeholder='example@gmail.com' className='bg-transparent outline-none focus-within:ring rounded-md p-1 border px-2 w-full h-full' required value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                    </div>

                    <div className='grid mx-4 gap-2 mt-4'>
                        <label htmlFor="password">Password</label>
                        <div className='flex border focus-within:ring rounded-md items-center'>
                            <input type={showpassword ? "text" : "password"} placeholder='********' name='password' className='bg-transparent outline-none p-1 px-2 w-full h-full' autoComplete='on' required value={password} onChange={(e) => setpassword(e.target.value)} />
                            <div className='mx-2 text-xl cursor-pointer' onClick={(() => setshowpassword((prev) => !prev))}>
                                <span>{showpassword ?
                                    <ImEye />
                                    :
                                    <ImEyeBlocked />
                                }</span>
                            </div>
                        </div>
                    </div>

                    <div className='text-end mx-4 my-2'>
                        <Link to={"/forget-password"} className='text-sm hover:underline hover:text-orange-400 cursor-pointer'>Forget password</Link>
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
                    <p className='mx-4 text-sm'>Don't have account ? <Link to={"/signup"} className='text-orange-400 hover:underline'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
