import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// using brower router to wrap the app component. so import it from react-router-dom package
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  // To get react router support in app component
  <BrowserRouter>
  {/* To add support of context in this project,do this */}
    <StoreContextProvider>
        <App />
     </StoreContextProvider>
    
  </BrowserRouter>
)
