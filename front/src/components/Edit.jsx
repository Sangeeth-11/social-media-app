import React, { useContext, useEffect, useState } from 'react'
import { FloatingLabel, Form, Offcanvas } from 'react-bootstrap';
import { toast } from 'react-toastify';
import base_url from '../services/server_url';
import { editPost } from '../services/allApis';
import { refreshContext } from '../contextApi/Refresh';

function Edit({item}) {
    const {setRefresh} =useContext(refreshContext)
    const [data, SetData] = useState({caption:item.caption,image:""})
    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState("")
    const [imageStatus, setImageStatus] = useState(true)

    const handleClose = () => {
        setShow(false)
        SetData({caption:data.caption,image:""})
        setImagePreview("")
    }
    const handleShow = () => {
        setShow(true)
    }
    useEffect(() => {
        if (data.image) {
            if (data.image.type == "image/jpg" || data.image.type == "image/png" || data.image.type == "image/jpeg") {
                setImageStatus(true)
                setImagePreview(URL.createObjectURL(data.image))
            }

            else {
                setImageStatus(false)
                setImagePreview('')
            }
        }
    }, [data.image])
    const handleUpdate=async()=>{
        const {caption,image} = data
        if (!caption) {
            console.log("caption empty");
        } else {
            const formdata=new FormData()
            formdata.append("caption",caption)
            formdata.append("image",image?image:item.image)
            const header={
                "authorization":sessionStorage.getItem('token'),
                "content-type":data.image?"multipart/form-data":"application/json"
            }
            const result = await editPost(item._id,formdata,header)
            if (result.status == 200) {
                
                setRefresh(result)
                handleClose()
            } else {
                console.log(result.response.data);
                handleClose()

            }
        }
    }
  return (
    <>
        <button className='btn p-1' onClick={handleShow}><i className='fa-solid fa-pen fa-xs'></i></button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Post</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Caption"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Leave a comment here" value={data.caption} onChange={(e) => { SetData({ ...data, caption: e.target.value }) }} />
                    </FloatingLabel>


                    <div className='p-3 h-auto d-flex justify-content-center align-items-center'>

                        <label className='btn btn-primary' htmlFor="image">
                            <div>select photo from your device</div>
                            <input type="file" id="image" hidden onChange={(e) => { SetData({ ...data, image: e.target.files[0] }) }} style={{height:"300px"}} />
                        </label>

                    </div>
                    {
                        !imageStatus && <p className="text-danger">Invalid image format,supported formats are jpg,png,jpeg</p>
                    }
                        <img src={!imagePreview?`${base_url}/uploads/${item.image}`:imagePreview} alt="" width={"100%"}/>
                    <div className='d-flex justify-content-evenly mt-3'>
                        <button className='btn btn-success px-5' onClick={handleUpdate}>update</button>
                        <button className='btn btn-danger px-5' onClick={handleClose}>Close</button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
    </>
  )
}

export default Edit