import React from 'react'
import SlideBar from './SlideBar'
import { Col, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import ViewUsers from '../components/ViewUsers'
import List from '../components/List.jsx'


function Home() {
  
  return (


    <>

      <Navbar />
      <Row className='row-app'>

        <Col md={2} xs={2} className='position-fixed'>
          <SlideBar />
        </Col>
        <Col md={10} xs={10} className='contents position-relative'>
          <div className='row pt-5 ps-5 '>
            <div className='col-lg-8 col-sm-12'>
              <List />
              
            </div>
            
            <div className='col-4 d-none d-sm-block'>
              <ViewUsers />
              
            </div>
          </div>
        </Col>

      </Row>
    </>


  )
}

export default Home