import { useContext, useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { editUser } from '../services/allApis';
import { refreshContext } from '../contextApi/Refresh';
import { toast } from 'react-toastify';


function EditProfile({ user }) {
    const {refresh,setRefresh}=useContext(refreshContext)
    const [show, setShow] = useState(false);
    const [imagePreview, setImagePreview] = useState("")
    const [imageStatus, setImageStatus] = useState(true)
    const [userData,setUserData]=useState("")
   
    useEffect(()=>{
        setUserData({"bio":user.bio,"image":user.image,"username":user.username})
    },[show,refresh])
    // console.log(userData);
    // console.log(user);
    useEffect(()=>{
        if (userData.image) {
            // console.log(userData.image.type);
            if (userData.image.type=="image/jpg" || userData.image.type=="image/jpeg" || userData.image.type=="image/png") {
               setImageStatus(true)
                setImagePreview(URL.createObjectURL(userData.image))
            } else {
             
              setImagePreview("")
              setImageStatus(false)
            }
        }
      },[userData.image])
    const handleClose = () => {
        setShow(false)
        setImagePreview("")
        setUserData("")
        setImageStatus(true)
        
    }
    const handleShow = () => {
        setShow(true)
    }


    const handleUpdate=async()=>{
        const {username,bio,image} =userData
        if (!username) {
            toast.error("username cannot be empty")
        } else {
            const formData = new FormData()
            formData.append("username",username)
            formData.append("bio",bio)
            formData.append("image",image)
            const header={
                "authorization":sessionStorage.getItem('token'),
                "content-type":"multipart/form-data"
            }
            const result=await editUser(formData,header)
            if (result.status==200) {
                setRefresh(result)
                handleClose()
            }
            
        }
        

    }

    return (
        <>
            <div className='btn btn-light py-0 col-md-4' style={{ height: "25px" }} onClick={() => { handleShow() }} >
                Edit Profile
            </div>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header>
                    <Offcanvas.Title>Edit Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                    <FloatingLabel controlId="floatingPassword" label="username" className='mb-3'>
                        <Form.Control type="text" placeholder="username" value={userData.username}  onChange={(e)=>{setUserData({...userData,username:e.target.value})}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Bio" >
                        <Form.Control type="text" placeholder="Bio" value={userData.bio}  onChange={(e)=>{setUserData({...userData,bio:e.target.value})}}/>
                    </FloatingLabel>

                    <div className='p-3 h-auto d-flex justify-content-center align-items-center'>

                        <label className='btn btn-primary' htmlFor="image">
                            <div>select photo from your device</div>
                            <input type="file" id="image" hidden onChange={(e) => { setUserData({ ...userData, image: e.target.files[0] }) }} style={{ height: "300px" }} />
                        </label>

                    </div>
                    {
                        !imageStatus && <p className="text-danger">Invalid image format,supported formats are jpg,png,jpeg</p>
                    }
                     {
                    imagePreview &&
                    <img src={ imagePreview} alt="" width={"100%"} height={"200px"}/>
                     }
                       
                    <div className='d-flex justify-content-evenly mt-3'>
                        <button className='btn btn-success px-5' onClick={handleUpdate}>update</button>
                        <button className='btn btn-danger px-5' onClick={handleClose}>Close</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default EditProfile