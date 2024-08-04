import React from 'react'
import Navbar from '../components/Navbar'
import { Col, Row } from 'react-bootstrap'
import SlideBar from './SlideBar'

function Settings() {
  return (
    <div>
         <Navbar />
      <Row className='row-app'>

        <Col md={2} xs={2} className='position-fixed'>
          <SlideBar />
        </Col>
        <Col md={10} xs={10} className='contents position-relative'>
          <div className='row'>
            
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default Settings