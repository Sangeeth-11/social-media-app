import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/allApis'
import { Link } from 'react-router-dom'
import base_url from '../services/server_url'

function ChatList() {
    const [data, setData] = useState("")
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const header = {
            "authorization": sessionStorage.getItem("token"),
            "content-type": "application/json"
        }

        const result = await getUsers(header)
        if (result) {
            setData(result.data)

        } else {
            console.log((result.response.data));
        }
    }
    return (
        <>
            <div className='col-3 p-3 overflow-auto border-end' style={{ height: "85vh" }}>
                <h4 className='p-3 d-flex'>
                    <Link to={'/messages'}>
                        <i className='fa-regular fa-paper-plane'></i>

                    </Link>
                    <span className='d-none d-sm-block px-3'> <b><i> Messages</i></b></span>
                </h4>

                {
                    data.length > 0 ?
                        data.map((item) => (
                            <div className='row ps-3 mt-2 ' key={item._id}>
                                <Link to={`/messages/${item._id}`} className='p-2 col-12 d-flex text-dark text-decoration-none'>
                                    <img src={item.image ? `${base_url}/uploads/${item.image}` : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"30px"} height={"30px"} className='rounded-circle' />
                                    <span className='d-none d-sm-block px-3'> <b><i> {item.username}</i></b></span>
                                </Link>
                            </div>
                        )) :
                        <div>no users</div>
                }
            </div>
        </>
    )
}

export default ChatList