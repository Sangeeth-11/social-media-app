import React, { useEffect, useState } from 'react'
import { Form, Offcanvas } from 'react-bootstrap'
import '../pages/slidebar.css'
import { searchUser } from '../services/allApis';
import { Link } from 'react-router-dom';

function Search() {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState("")

  const handleClose = () => {
    setShow(false)
    setSearch('')
  }
  const handleShow = () => setShow(true);
  useEffect(()=>{
    getData()
  },[search])

  const getData=async(req,res)=>{
    if (search!="") {
      
      const result=await searchUser(search)
    if (result.status==200) {
      setUsers(result.data)
    }
    }
  }
  return (
    <>
        <div onClick={handleShow} className='link' style={{cursor:"pointer"}}>

        <i className="fa-solid fa-magnifying-glass fa-lg"/>
        <span className='slider-text d-none d-lg-block'>Search</span>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className='d-flex justify-content-between'>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
         <div onClick={handleClose}>
          <i className='fa-solid fa-close'></i>
          </div> 
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form.Control type="text" placeholder="Search Users by username" onChange={(e)=>{setSearch(e.target.value)}}/>
        { search &&
          users.length>0?
          users.map((item)=>(
          <Link to={`/specificUser/${item._id}`} className='text-dark text-decoration-none d-block m-2' onClick={handleClose}>
           <b><i>{item.username}</i></b>
          </Link>
          )):
          <div className=''>No user</div>
        }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Search