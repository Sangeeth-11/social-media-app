import React from 'react'
import { Link } from 'react-router-dom'
import './slidebar.css'

import Search from '../components/Search';
import Create from '../components/Create';
import { useNavigate } from 'react-router-dom';

function SlideBar() {
  const navigate = useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className='slidebar bg-light'>
      <Link to={'/home'} className='link ' title='home'>
        <i className="fa-solid fa-house fa-lg "></i>
        <span className='slider-text d-none d-lg-block'>Home</span>
      </Link>

      <div>
        <Search />
      </div>



      
    

      <Link to={'/messages'} className='link'>
        <div className="fa-solid fa-message fa-lg" ></div>
        <span className='slider-text d-none d-lg-block'>Messages</span></Link>

      <div>
        <Create/>
      </div>
      

      

      <Link to={'/profile'} className='link'>
        <div className="fa-solid fa-circle-user fa-lg" ></div>
        <span className='slider-text d-none d-lg-block'>Profile</span></Link>


      {/* <Link to={'/Settings'} className='link'>
        <div className="fa-solid fa-gear fa-lg" ></div>
        <span className='slider-text d-none d-md-block'>Settings</span></Link> */}

      <div className='link' onClick={logout} style={{cursor:"pointer"}}>
        <div className="fa-solid fa-right-from-bracket fa-lg" ></div>
        <div className='slider-text d-none d-lg-block'>Logout</div></div>



     
    </div>
  )
}

export default SlideBar