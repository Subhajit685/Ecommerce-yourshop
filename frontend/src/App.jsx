import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Forget from './pages/Forget'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux'
import StoreContext from './context/storeContext'
import { createUser } from './store/userSlice'
import Adminpnal from './pages/Adminpnal'
import AllUser from './pages/AllUser'
import Allproduct from './pages/Allproduct'
import UploadProduct from './pages/UploadProduct'
import Catagory from './pages/Catagory'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast';
import Search from './pages/Search'
import Shipping from './pages/Shipping'
import ConfirmOrder from './pages/ConfirmOrder'
import Successpaymentorder from './pages/Successpaymentorder'
import MyOrder from './pages/MyOrder'
import Profile from "./pages/Profile"
import AdminOrdersPage from './pages/AdminOrdersPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'

function App() {

  const dispatch = useDispatch()
  const [open, setopen] = useState(true)
  const [page, setpage] = useState(1)
  const [total, settotal] = useState(0)
  const [shippingInfo, setshippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  })

  const [cartvalu, setcartvalu] = useState([])

  const calculateTotal = () => {
    const totalAmount = cartvalu.reduce((acc, item) => acc + item.selling * item.count, 0)
    settotal(totalAmount)
  }

  const [cartlength, setcartlength] = useState(0)

  const url = "http://localhost:3000"
  const user = useSelector((state) => state.user.user)

  const cartdata = async () => {
    const res = await fetch(`${url}/api/cart/allcart`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    setcartlength(data?.cart?.length)
    return data
  }

  const userData = async () => {
    const res = await fetch(`${url}/api/user/user-data`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    if (data.success) {
      dispatch(createUser(data.user))
      cartdata()
    }
  }



  useEffect(() => {
    userData()
  }, [])

  return (
    <>
      <StoreContext.Provider value={{
        userData,
        url,
        cartlength,
        cartdata,
        open, setopen, page, setpage, shippingInfo, setshippingInfo, cartvalu, setcartvalu, calculateTotal, total, settotal,
      }}>
        <div className='bg-slate-100'>
          <Navbar />
          <main className='min-h-[95vh] pt-20'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to={"/"} />} />
              <Route path='/forget-password' element={<Forget />} />
              <Route path='/search/:keyword' element={<Search />} />
              <Route path='/catagory/:keyword' element={<Catagory />} />
              <Route path='/produte/:id' element={<ProductPage />} />
              <Route path='/admin-panel' element={user ? <Adminpnal /> : <Navigate to={"/"} />}>
                <Route path='all-user' element={user ? <AllUser /> : <Navigate to={"/"} />} />
                <Route path='all-order' element={user ? <AdminOrdersPage/> : <Navigate to={"/"} />} />
                <Route path='all-product' element={user ? <Allproduct /> : <Navigate to={"/"} />}>
                  <Route path='upload-product' element={<UploadProduct />} />
                </Route>
              </Route>
              <Route path='/profile' element={user ? <Profile/> : <Navigate to={"/"} />}>
              </Route>
              <Route path='/cart' element={user ? <Cart /> : <Navigate to={"/login"} />} />
              <Route path='/shipping' element={user ? <Shipping /> : <Navigate to={"/login"} />} />
              <Route path='/myorder' element={user ? <MyOrder /> : <Navigate to={"/login"} />} />
              <Route path='/user-profile' element={user ? <ProfilePage/> : <Navigate to={"/login"} />} />
              <Route path='/confirmOrder' element={user ? <ConfirmOrder /> : <Navigate to={"/login"} />} />
              <Route path='/Success-payment-order/:paymentID' element={<Successpaymentorder />} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </main>
          <div className='z-50'>
            <Footer />
          </div>
          <Toaster />
        </div>
      </StoreContext.Provider>
    </>
  )
}

export default App
