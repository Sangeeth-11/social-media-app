import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getFollowingPosts, likeAndUnlike } from '../services/allApis'
import base_url from '../services/server_url';
import { refreshContext } from '../contextApi/Refresh';
import { userContext } from '../contextApi/UserDetails';
import { Link } from 'react-router-dom';
import Comments from './Comments';

function List() {
  const { userDetails } = useContext(userContext)
  const { refresh, setRefresh } = useContext(refreshContext)
  const [data, setData] = useState('')


  useEffect(() => {
    getData()
  }, [refresh])
  const getData = async () => {
    const header = {
      "authorization": sessionStorage.getItem('token'),
      "content-type": "multipart/form-data"
    }
    const result = await getFollowingPosts(header)
    if (result.status == 200) {
      const list = result.data.posts
     
      const sortedList = list.sort((a, b) => new Date(b.time) - new Date(a.time));
      console.log(sortedList);
      setData(sortedList)
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
    <div className='row px-lg-5'>
      {
        data.length > 0 ?
          data.map((item,index) => (

            <Card style={{ width: '100%' }} className='col-12 border border-0' key={index}>
              
              <Card.Body >
                <div>
                <img src={item.image?`${base_url}/uploads/${item.userId.image}`:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"30px"} height={"25px"} className='rounded-circle' />
                <Link to={`/specificUser/${item.userId._id}`} className=' text-dark text-decoration-none p-2'>
                 <b> {item.userId.username}</b>
                </Link><br/>
                 {item.caption}
                </div>
                <Card.Img variant="top" src={`${base_url}/uploads/${item.image}`} style={{ height: "400px" }} />
                <div className='d-flex justify-content-between px-2' >

                  <Button variant='' onClick={() => { handleliked(item._id) }}>
                    {
                      !item.like.includes(userDetails?._id) &&
                      <i className="fa-regular fa-heart" ></i>
                    }
                    {
                      item.like.includes(userDetails?._id) &&
                      <i className="fa-solid fa-heart" ></i>
                    }
                    &nbsp;<span>{item?.like?.length}</span> like</Button>
                  <Comments postId={item._id}/>

                </div>
                <small>Posted on -{item.time}</small>
              </Card.Body>
              <hr />
            </Card>
          )) :
          <div className='p-5'>Follow somebody to view posts</div>
      }
      
    </div>
  )
}

export default List