import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Refresh from './contextApi/Refresh.jsx'
import UserDetails from './contextApi/UserDetails.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Refresh>
        <UserDetails>
        
            <App />
         
        </UserDetails>
      </Refresh>

      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
