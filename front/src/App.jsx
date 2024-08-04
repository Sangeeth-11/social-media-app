import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'

import VerifyOtp from './components/VerifyOtp'
import 'react-toastify/dist/ReactToastify.css';
import Settings from './pages/Settings'
import Messages from './pages/Messages'
import SpecificUser from './pages/SpecificUser'
import SpecificMessage from './pages/SpecificMessage'
import Auth from './pages/Auth'


function App() {
 
  
  return (
    <>
      
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/verifyOTP' element={<VerifyOtp />} />
            <Route path='/home' element={<Home />} />
           <Route path='/profile' element={<Profile />} />
           <Route path='/settings' element={<Settings />} />
           <Route path='/messages' element={<Messages />} />
           <Route path='/messages/:id' element={<SpecificMessage />} />
           <Route path='/specificUser/:id' element={<SpecificUser />} />
          </Routes> 
          
      
      
    </>
  )
}

export default App
