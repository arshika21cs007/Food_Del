import React, { useState } from 'react'
// navbar component created by ,navbar +enter
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
// Home component created by ,Home +enter
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {
  // To display,loginPopup create 1 state variable and initialize with false
  const [showLogin,setShowLogin] = useState(false)
  return (
    // To insert the navbar component in App.jsx
    // Returning 2 elements [div,footer] cause error. So use fragment i.e <></> which will return 1 element
    <>
    {/* If showLogin is true i.e if user clicked then it will show LoginPopup. If not means return the fragment */}
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      {/* Pass showLogin as props in navbar to convert into true or false */}
    <Navbar setShowLogin={setShowLogin}/>
    {/* set up the routes */}
    <Routes>
      {/* create roue for home page i.e whenever we open / path,we will get home page*/}
      < Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>


    </Routes>
  </div>
  {/* Insert Footer component */}
  <Footer/>
  </>
    
  )
}

export default App
