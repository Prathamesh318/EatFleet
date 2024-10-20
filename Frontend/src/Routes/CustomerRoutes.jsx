import React from 'react'
import Navbar from '../component/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import Reset from '../component/Auth/Reset'
import PaymentSuccess from '../component/PaymentSuccess/PaymentSuccess'

const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/reset'element={<Reset/>}/>
        <Route path='/account/:register' element={<Home />} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />
        <Route path='/payment/success/:id' element={<PaymentSuccess />} />
        
      </Routes>
      <Auth />
    </div>
  )
}

export default CustomerRoutes