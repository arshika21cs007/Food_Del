import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  //Define URL at common place i.e here to access from anywhere
  const url="http://localhost:4000"
  return (
    <div>
      {/* Insert Toast Container to get notification that the product added successfully in Database */}
      <ToastContainer/>
      {/* Insert navbar component */}
      <Navbar />
      <hr />
      <div className="app-content">
        {/* Insert sidebar component */}
        <Sidebar/>
        {/* Create Routes tag*/}
        <Routes>
          {/* Create multiple routes */}
          {/* In element,insert the Add,list,orders components */}
          {/* pass url as props */}
          <Route path="/add" element={<Add  url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
          <Route path="/" element={<Orders />} />

        </Routes>
      </div>
    </div>
  )
}

export default App
