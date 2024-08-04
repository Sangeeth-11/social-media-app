import React, { useEffect } from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getFollowers } from '../services/allApis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import base_url from '../services/server_url';

function Followers() {
    const [data, setData] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const header = {
            "authorization": sessionStorage.getItem('token'),
            "content-type": "application/json"
        }
        const result = await getFollowers(header)
        if (result.status == 200) {
            setData(result.data)
        } else {
            console.log(result.response.data);
        }
    }
    return (
        <>
            <h6 className="col col-sm-4" onClick={handleShow} style={{ cursor: "pointer" }}>
                <div className='mx-4'>{data.length}</div>
                <div>
                    Followers
                </div>
            </h6>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Followers</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        data.length > 0 ?
                            data.map((item) => (
                                <div className='row' key={item._id}>
                                    <Link to={`/specificUser/${item?._id}`} className='p-2 col-6 float-start text-dark text-decoration-none'>
                                        <img src={item.image ? `${base_url}/uploads/${item.image}` : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"30px"} height={"30px"} className='rounded-circle' />
                                        <b><i> {item.username}</i></b>
                                    </Link>
                                </div>
                            )) :
                            <div>No Followers</div>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Followers