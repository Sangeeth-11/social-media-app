import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Col, Row } from 'react-bootstrap'
import SlideBar from './SlideBar'
import { useParams } from 'react-router-dom'
import { followAndUn, getSpecificUser, getSpecificUserPosts, getUser, likeAndUnlike } from '../services/allApis'
import { refreshContext } from '../contextApi/Refresh'
import Card from 'react-bootstrap/Card';
import base_url from '../services/server_url'
import Comments from '../components/Comments'

function SpecificUser() {
    const {refresh,setRefresh} = useContext(refreshContext)
    const [user,setUser]=useState('')
    const [userPosts,setUserPosts]=useState('')
    const [loggedInUser,SetLoggedInUser]= useState('')
    const {id}=useParams()
    useEffect(()=>{
        getData(id)
    },[refresh,id])
    console.log(loggedInUser);
    const getData=async(id)=>{
        const result= await getSpecificUser(id)
        if (result.status==200) {
            console.log(result.data,"xss");
            setUser(result.data);
        } 
        const header={
            "authorization":sessionStorage.getItem("token"),
            "content-type":"application/json"
        }
        const loggedUser =await getUser(header)
        if (loggedUser.status==200) {
            SetLoggedInUser(loggedUser.data)
        }
        const userPosts=await getSpecificUserPosts(id)
        
        if (userPosts.status==200) {
            const list=userPosts.data
            const sortedList = list.sort((a, b) => new Date(b.time) - new Date(a.time));
            setUserPosts(sortedList)
        }
    }
    const handleFollowAndUnfollow=async()=>{
        const header={
            "authorization":sessionStorage.getItem('token'),
            "content-type":"application/json"
        }
        const result = await followAndUn({_id:id},header)
        if (result.status===200) {
            setRefresh(result)
            console.log(result.data);
            
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
        <div>
            <Navbar />
            <Row className='row-app'>

                <Col md={2} xs={2} className='position-fixed'>
                    <SlideBar />
                </Col>
                <Col md={10} xs={10} className='contents position-relative'>
                    <div className='row'>
                        <div className='d-flex justify-content-center py-5' style={{ width: "100%" }}>

                            <div className="card border border-0" style={{ width: "90%" }}>
                                <div className="row no-gutters">
                                    <div className="col-5">
                                    <img src={user.image?`${base_url}/uploads/${user.image}`:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"200px"} height={"150px"} className='rounded-circle  float-end' />
                                    </div>
                                    <div className="col-7">
                                        <div className="card-body">
                                            <div className='row'>
                                                <h4 className="card-title col-md-8">{user.username} </h4>
                                                {
                                                    loggedInUser._id!=id && 
                                                    <>
                                                       {
                                                    !loggedInUser?.following?.includes(id)&&
                                                <button className='btn btn-primary py-0 col-md-4' style={{ height: "25px" }} onClick={handleFollowAndUnfollow}>
                                                    follow
                                                </button>
                                                }
                                                {
                                                    loggedInUser?.following?.includes(id)&&
                                                <button className='btn btn-primary py-0 col-md-4' style={{ height: "25px" }} onClick={handleFollowAndUnfollow} >
                                                    unfollow
                                                </button>
                                                } 
                                                    </>
                                                }
                                                


                                            </div>
                                            <div className='row pt-3 '>
                                                <h6 className="col col-sm-4">
                                                    <div className='mx-4'></div>
                                                    <div className='mx-4'>{}</div>
                                                    <div className='mx-4'>{userPosts?.length}</div>
                                                    <div>
                                                        Posts
                                                    </div>
                                                </h6>
                                                <h6 className="col col-sm-4">
                                                    <div className='mx-4'>{user?.followers?.length}</div>
                                                    <div>
                                                        Followers
                                                    </div>
                                                </h6>
                                                <h6 className="col col-sm-4">
                                                    <div className='mx-4'>{user?.following?.length}</div>
                                                    <div>
                                                        Following
                                                    </div>
                                                </h6>


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
                            userPosts.length > 0 ?
                                userPosts.map((item) => (

                                    <Card style={{ width: '18rem' }} className=' border border-0 col-6' key={item._id} >

                                        <Card.Body className='p-0'>
                                            <Card.Img variant="top" src={`${base_url}/uploads/${item.image}`} style={{ height: "200px" }} />

                                            <Card.Title className='px-3 mt-3 d-flex justify-content-between'>
                                                <div>{item.username}</div>
                            
                                            </Card.Title>
                                            <div className='mx-3'>
                                                {item.caption}
                                            </div>
                                            <div className='d-flex justify-content-between p-2' >

                                                {/* <Button variant='' onClick={()=>{handleliked(item._id)}}>
                                                    <i className="fa-regular fa-heart"></i> like</Button> */}
                                                <Button variant='' onClick={() => { handleliked(item._id) }}>
                                                    {
                                                        !item.like.includes(loggedInUser._id) &&
                                                        <i className="fa-regular fa-heart" ></i>
                                                    }
                                                    {
                                                        item.like.includes(loggedInUser._id) &&
                                                        <i className="fa-solid fa-heart" ></i>
                                                    }
                                                    &nbsp;<span>{item?.like?.length}</span> like</Button>
                                                <Comments postId={item._id}/>

                                            </div>
                                           <small>Posted on</small> {item.time}
                                        </Card.Body>
                                        <hr />
                                    </Card>
                                )) :
                                <p>no posts</p>
                        }

                    </div>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default SpecificUser