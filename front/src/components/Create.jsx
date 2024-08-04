import React, { useContext, useEffect, useState } from 'react'
import '../pages/slidebar.css'
import { FloatingLabel, Form, Offcanvas } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createPost } from '../services/allApis';
import { refreshContext } from '../contextApi/Refresh';


function Create() {
    const {setRefresh} =useContext(refreshContext)
    const [data, SetData] = useState({"caption":"","image":""})
    const [imagePreview, setImagePreview] = useState("")
    const [imageStatus, setImageStatus] = useState(true)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        SetData({"caption":"","image":""})
        setImagePreview("")
    }
    const handleShow = () => {
        setShow(true)
    }
    
    useEffect(() => {
        if (data.image) {
            if (data.image.type == "image/jpg" || data.image.type == "image/png" || data.image.type == "image/jpeg") {

                setImagePreview(URL.createObjectURL(data.image))
                setImageStatus(true)
            }

            else {
                setImagePreview("")
                setImageStatus(false)
            }
        }
    }, [data.image])

    const handleAdd = async () => {
        const { caption, image } = data
        console.log(image);
        if (!caption || !image) {
           toast.error("some field missing")
        } else {
            const formdata = new FormData()
            formdata.append("caption", caption)
            formdata.append("image", image)

            const header = {
                "authorization": sessionStorage.getItem("token"),
                "content-type": "multipart/form-data"
            }
            const result = await createPost(formdata, header)
            if (result.status == 200) {
                console.log(result.data);
                toast.success("post created")
                SetData({"caption":"","image":""})
                handleClose()
                setRefresh(result)
            } else {
                toast.error(result.response.data);
                SetData({"caption":"","image":""})
                handleClose()

            }
        }
    }

    return (
        <>
            <div className='link' onClick={handleShow} style={{cursor:"pointer"}}>
                <div className="fa-solid fa-circle-plus fa-lg" ></div>
                <span className='slider-text d-none d-lg-block'>create</span></div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Create Post</Offcanvas.Title>

                </Offcanvas.Header>
                <Offcanvas.Body>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Caption"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e) => { SetData({ ...data, caption: e.target.value }) }} />
                    </FloatingLabel>


                    <div className='p-3 h-auto d-flex justify-content-center align-items-center'>

                        <label className='btn btn-primary' htmlFor="image">
                            <div>select photo from your device</div>
                            <input type="file" id="image" hidden onChange={(e) => { SetData({ ...data, image: e.target.files[0] }) }} />
                        </label>
                    </div>
                    {
                        !imageStatus && <p className="text-danger">Invalid image format,supported formats are jpg,png,jpeg</p>
                    }
                    {
                        imagePreview&&
                    <img src={imagePreview} alt="" width={"100%"} height={"300px"}/>
                    }
                    <div className='d-flex justify-content-evenly mt-3'>
                        <button className='btn btn-success px-5' onClick={handleAdd}>Add</button>
                        <button className='btn btn-danger px-5' onClick={handleClose}>Close</button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Create