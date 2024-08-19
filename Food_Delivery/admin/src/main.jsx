import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// using brower router to wrap the app component. so import it from react-router-dom package
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  //There will be react router  support in project
  <BrowserRouter>
    <App />
  </BrowserRouter>
   
  
)
