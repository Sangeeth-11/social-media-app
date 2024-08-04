import React, { useEffect, useState, useRef, useContext } from 'react'

import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getMessages, getSpecificUser, sendMessage } from '../services/allApis';
import base_url from '../services/server_url';
import { toast } from 'react-toastify';
import { io } from "socket.io-client";
import { userContext } from '../contextApi/UserDetails';

function ChatMessage() {
    const { id } = useParams()
    const last = useRef()
    const [user, setUser] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [socketmessage, setSocketMessage] = useState('')
    const socket = useRef();
    const { userDetails } = useContext(userContext)
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const header = {
        "authorization": sessionStorage.getItem('token'),
        "content-type": "application/json"
    }
    useEffect(() => {
        getData()

    }, [id])
    useEffect(() => {
        setTimeout(() => {
            last.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])
    useEffect(() => {

        socket.current = io("http://localhost:8800");


        socket.current.emit("new-user-add", userDetails._id);

        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });



    }, [userDetails]);
    useEffect(() => {
        if (socketmessage !== null) {
            socket.current.emit("send-message", socketmessage);
            setSocketMessage(null);
           
        }
    }, [socketmessage]);

useEffect(()=>{
    socket.current.on("receive-message", (data) => {
        if (data!="") {
            setReceivedMessage(data);
        }
    });
})



    useEffect(() => {
        console.log("Message Arrived:",receivedMessage)
        if (receivedMessage) {
            getData()
        }

    }, [receivedMessage])

    const getData = async () => {
        const result = await getSpecificUser(id)
        if (result.status == 200) {
            setUser(result.data);
        }
        const msg = await getMessages(id, header)
        if (msg.status == 200) {
            setMessages(msg.data)
        }
    }
    const send = async () => {
        if (message == "") {
            toast.warning("message cannot be empty")
        }
        else {
            const data = { message }
            const data1 = { message, receiverId: id }
            const result = await sendMessage(id, data, header)
            if (result.status == 200) {
                setSocketMessage(data1)
                setMessage("")
                getData()
            }
        }
    }
    return (
        <>
            <div className='col-9'>

                <div className="d-flex flex-column justify-content-between ">

                    <div style={{ width: "100%", height: "75vh", borderRadius: "15px" }}>
                        <div
                            className="d-flex justify-content-between align-items-center p-3 border-bottom-0"
                        >
                            <p className="mb-0 fw-bold">
                                <img src={user.image ? `${base_url}/uploads/${user.image}` : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"30px"} height={"30px"} className='rounded-circle me-3' />
                                {user.username}
                            </p>
                            <button className='btn'><i className='fa-solid fa-close'></i></button>
                        </div>
                        <div className='overflow-auto' style={{ height: "470px" }}>
                            {
                                messages.length > 0 ?
                                    messages.map((item) => (
                                        <div ref={last} key={item._id}>
                                            {item.senderId == id &&
                                                <div className="d-flex flex-row justify-content-start mb-1">
                                                    <div
                                                        className="p-2 ms-3"
                                                        style={{
                                                            borderRadius: "5px",
                                                            backgroundColor: "rgba(57, 192, 237,.2)",
                                                        }}
                                                    >
                                                        <p className="small mb-0">
                                                            {item.message}
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                            {item.senderId != id &&
                                                <div className="d-flex flex-row justify-content-end mb-1">
                                                    <div
                                                        className="p-2 me-3 border"
                                                        style={{ borderRadius: "5px", backgroundColor: "#fbfbfb" }}
                                                    >
                                                        <p className="small mb-0">
                                                            {item.message}
                                                        </p>
                                                    </div>

                                                </div>
                                            }
                                        </div>

                                    )) :
                                    <div className='text-center m-5 display-6 py-5'>Send a message to start conversation</div>
                            }
                        </div>
                    </div>
                    <div className='d-flex mb-3'>
                        <Form.Control size="lg" type="text" placeholder="Type Message" onChange={(e) => { setMessage(e.target.value) }} value={message} />
                        <button className='btn border border-1' title='send' onClick={send}><i className='fa-solid fa-paper-plane'></i></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ChatMessage