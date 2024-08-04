import React from 'react'
import Navbar from '../components/Navbar'
import { Col, Row } from 'react-bootstrap'
import SlideBar from './SlideBar'
import ChatList from '../components/ChatList'
import ChatMessage from '../components/ChatMessage'

function SpecificMessage() {
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
            <ChatMessage/>
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default SpecificMessage