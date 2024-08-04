import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Edit from '../components/Edit'
import { deletePost, getPosts, getUser, likeAndUnlike } from '../services/allApis';
import SlideBar from './SlideBar'
import { Col, Row } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import base_url from '../services/server_url';
import { refreshContext } from '../contextApi/Refresh';
import { userContext } from '../contextApi/UserDetails';
import EditProfile from '../components/EditProfile';
import Comments from '../components/Comments';
import Followers from '../components/Followers';
import Following from '../components/Following';



function Profile() {
    const { userDetails } = useContext(userContext)
    const { refresh, setRefresh } = useContext(refreshContext)
    const [data, setData] = useState([])
    const [user, setUser] = useState("")



    useEffect(() => {
        getData()
    }, [refresh])
    const getData = async () => {
        const header = {
            "Authorization": sessionStorage.getItem("token"),
            "content-type": "application/json"

        }

        const result = await getPosts(header)
        if (result.status == 200) {
            const list = result.data
            const sortedList = list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            setData(sortedList);
        }
        else {
            console.log(result.response.data);
        }

        const userdata = await getUser(header)
        if (userdata.status == 200) {
            setUser(userdata.data);

        }
        else {
            console.log(result.response.data);
        }
    }
    const handleDelete = async (id) => {
        const header = {
            "Authorization": sessionStorage.getItem("token"),
            "content-type": "application/json"

        }
        const result = await deletePost(id, header)
        if (result.status == 200) {
            getData()
        }
        else {
            console.log(result.response.data);
        }
    }
    const handleliked = async (id) => {
        const header = {
            "authorization": sessionStorage.getItem('token'),
            "content-type": "multipart/application-json"
        }
        const result = await likeAndUnlike(id, header)
        if (result.status == 200) {
            setRefresh(result)

        }
    }

    return (
        <>
            <Navbar />
            <Row className='row-app'>

                <Col md={2} xs={2} className='position-fixed'>
                    <SlideBar />
                </Col>
                <Col md={10} xs={10} className='contents position-relative'>

                    <div className='d-flex justify-content-center pt-5' style={{ width: "100%" }}>

                        <div className="card border border-0" style={{ width: "90%" }}>
                            <div className="row no-gutters">
                                <div className="col-6 col-lg-2">
                                    <img src={user.image ? `${base_url}/uploads/${user.image}` : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"150px"} height={"150px"} className='rounded-circle  float-end' />
                                </div>
                                <div className="col-6">
                                    <div className="card-body">
                                        <div className='row'>
                                            <h4 className="card-title col-md-8"> {user.username}</h4>
                                            <EditProfile user={user} />


                                        </div>
                                        <div className='row pt-3 '>
                                            <h6 className="col col-sm-4">
                                                <div className='mx-4'>{data.length}</div>
                                                <div>
                                                    Posts
                                                </div>
                                            </h6>
                                            {/* <h6 className="col col-sm-4">
                                                <div className='mx-4'>{followers.length}</div>
                                                <div>
                                                    Followers
                                                </div>
                                            </h6> */}
                                            <Followers />
                                            <Following />
                                            {/* <h6 className="col col-sm-4">
                                                <div className='mx-4'>{following.length}</div>
                                                <div>
                                                    Following
                                                </div>
                                            </h6> */}


                                        </div>

                                        <p className="card-text">{user?.bio}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='pt-3 row mx-5 '>
                        {
                            data.length > 0 ?
                                data.map((item) => (

                                    <Card style={{ width: '18rem' }} className=' border border-0 col-6 ' key={item._id} >

                                        <Card.Body className='p-0'>
                                            <Card.Img variant="top" src={`${base_url}/uploads/${item.image}`} style={{ height: "200px" }} />

                                        <div className='ms-3 mt-1 row'>
                                            <div className='col-9 '> {item.caption}</div>
                                            <div className='col-3 p-0'>
                                                <Edit item={item} />
                                                <button className='btn p-1' onClick={() => { handleDelete(item._id) }}><i className='fa-solid fa-trash fa-xs '></i></button>
                                            </div>
                                        </div>

                                            <div className='d-flex justify-content-between p-2' >

                                                {/* <Button variant='' onClick={()=>{handleliked(item._id)}}>
                                                    <i className="fa-regular fa-heart"></i> like</Button> */}
                                                <Button variant='' onClick={() => { handleliked(item._id) }}>
                                                    {
                                                        !item.like.includes(userDetails._id) &&
                                                        <i className="fa-regular fa-heart" ></i>
                                                    }
                                                    {
                                                        item.like.includes(userDetails._id) &&
                                                        <i className="fa-solid fa-heart" ></i>
                                                    }
                                                    &nbsp;<span>{item.like.length}</span> like</Button>
                                                <Comments postId={item._id} />

                                            </div>
                                            Posted on : {item.time}

                                        </Card.Body>
                                        <hr />
                                    </Card>
                                )) :
                                <p>no posts</p>
                        }

                    </div>
                </Col>

            </Row>

        </>
    )
}

export default Profile