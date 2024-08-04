import React from 'react'
import Navbar from '../components/Navbar'
import { Col, Row } from 'react-bootstrap'
import SlideBar from './SlideBar'
import ChatList from '../components/ChatList'
import ChatMessage from '../components/ChatMessage'

function Messages() {
  return (
    <div>
         <Navbar />
      <Row className='row-app'>

        <Col md={2} xs={2} className='position-fixed'>
          <SlideBar />
        </Col>
        <Col md={10} xs={10} className='contents position-relative'>
          <div className='row'>
            <ChatList/>
            
            <div className='col-9 d-flex align-items-center'>
               <h3 className='ps-5'> Tap a user to start conversation </h3>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default Messages