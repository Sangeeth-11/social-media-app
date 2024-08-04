import React, { useContext, useEffect, useState } from 'react'
import { followAndUn, getUsers } from '../services/allApis'
import { refreshContext } from '../contextApi/Refresh'
import { Link } from 'react-router-dom'
import { userContext } from '../contextApi/UserDetails'
import base_url from '../services/server_url'


function ViewUsers() {
   
    const {setRefresh}= useContext(refreshContext)
    const {userDetails} = useContext(userContext)
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
           setRefresh(result.data);
            setData(result.data)

        } else {
            console.log((result.response.data));
        }
    }
    const handleFollowAndUnfollow=async(id)=>{
        const header = {
            "authorization": sessionStorage.getItem("token"),
            "content-type": "application/json"
        }
        const result = await followAndUn({_id:id},header)
        if (result) {
                getData()
        } else {
            console.log((result.response.data));
        }
    }
    
   
    return (
        <div>
            <div className=' w-100'>
                <h2 className='mb-3'> Suggested Users</h2>
                {
                    data.length > 0 ?
                        data.map((item) => (
                            <div className='row mt-2' key={item._id}>
                                <Link to={`/specificUser/${item._id}`} className='p-2 col-6 float-start text-dark text-decoration-none'>  
                                  <img src={item.image?`${base_url}/uploads/${item.image}`:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" srcSet="" width={"30px"} height={"30px"} className='rounded-circle' />
                                <b><i> {item.username}</i></b>
                                </Link>
                                <div className='col-6 p-2'>
                                    {
                                        item?.followers.includes(userDetails?._id)&&
                                    <button className='btn btn-primary' onClick={()=>{handleFollowAndUnfollow(item._id)}}>unfollow</button>
                                    }
                                    {
                                        !item?.followers.includes(userDetails?._id)&&
                                    <button className='btn btn-primary' onClick={()=>{handleFollowAndUnfollow(item._id)}}>follow</button>
                                    }
                                </div>
                            </div>
                        )) :
                        <div>no users</div>
                }
            </div> 
        </div>
    )
}

export default ViewUsers