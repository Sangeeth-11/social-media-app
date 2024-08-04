import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { createComment, getComments } from '../services/allApis';
import { refreshContext } from '../contextApi/Refresh';
import { toast } from 'react-toastify';
import base_url from '../services/server_url';

function Comments({ postId }) {
    const { refresh, setRefresh } = useContext(refreshContext)

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState('');
    const [create, setCreate] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getData()
    }, [refresh, show])
    const getData = async () => {
        const result = await getComments(postId)
        if (result.status == 200) {
            const list = result.data
            const sortedList = list.reverse()
            setComments(sortedList)
        }
    }
    const handleCreate = async () => {
        const header = {
            "authorization": sessionStorage.getItem('token'),
            "content-type": "application/json"
        }
        if (!create) {
            toast.error("empty message")
        } else {

            const result = await createComment({ postId, message: create }, header)
            if (result.status == 200) {
                setCreate('')
                setRefresh(result)
            }
        }
    }
    return (
        <>
            <Button variant='' onClick={handleShow} ><i className="fa-regular fa-comments"></i> {comments?.length} comment</Button>

            <Offcanvas show={show} onHide={handleClose} placement='bottom' style={{ height: "75vh" }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Type the comment"

                            onChange={(e) => { setCreate(e.target.value) }} value={create} />
                        <Button variant="outline-secondary" onClick={handleCreate} >
                            submit
                        </Button>
                    </InputGroup>

                    {
                        comments.length > 0 ?
                            comments.map((item) => (
                                <div key={item._id}>
                                    <div>
                                        <img src={item.userId.image ? `${base_url}/uploads/${item.userId.image}` : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} style={{ width: "35px", height: "35px" }} className='rounded-circle' />
                                        {item.userId.username}
                                    </div>
                                    <div>
                                        <p className="small mb-0 px-5">
                                            {item.message}
                                        </p>
                                    </div>
                                    <hr/>
                                </div>
                            )) :
                            <p>No comments</p>
                    }

                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

export default Comments