
import { commonApi } from "./commonApi";
import base_url from "./server_url";

export const userRegister=async(data)=>{
    return await commonApi("POST",`${base_url}/register`,data,"")
}
export const userOtpVerify=async(data)=>{
    return await commonApi("POST",`${base_url}/verifyOTP`,data,"")
}
export const reSendOtp=async(data)=>{
    return await commonApi("POST",`${base_url}/resendOTP`,data,"")
}
export const userLogin=async(data)=>{
    return await commonApi("POST",`${base_url}/login`,data,"")
}

export const getUser=async(header)=>{
    return await commonApi("GET",`${base_url}/getUser`,"",header)
}
export const editUser=async(data,header)=>{
    return await commonApi("PUT",`${base_url}/editUser`,data,header)
}
export const getSpecificUser=async(id)=>{
    return await commonApi("GET",`${base_url}/getSpecificUser/${id}`,"")
}

export const getUsers=async(header)=>{
    return await commonApi("GET",`${base_url}/getUsers`,"",header)
}

export const getPosts = async(header)=>{
    return await commonApi("GET",`${base_url}/getUserPosts`,"",header)
}
export const getSpecificUserPosts = async(id)=>{
    return await commonApi("GET",`${base_url}/getSpecificUserPosts/${id}`,"")
}
export const getFollowingPosts = async(header)=>{
    return await commonApi("GET",`${base_url}/getFollowingPosts`,"",header)
}

export const getAllPosts = async()=>{
    return await commonApi("GET",`${base_url}/getAllPosts`,"")
}
export const deletePost = async(id,header)=>{
    return await commonApi("DELETE",`${base_url}/deletePost/${id}`,{},header)
}

export const followAndUn  =async(data,header)=>{
    return await commonApi("POST",`${base_url}/follow`,data,header)
}

export const createPost =async(data,header)=>{
    return await commonApi("POST",`${base_url}/createPost`,data,header)
}
export const editPost =async(id,data,header)=>{
    return await commonApi("PUT",`${base_url}/editPost/${id}`,data,header)
}

export const likeAndUnlike=async(id,header)=>{
    return await commonApi("POST",`${base_url}/likeAndUnlike/${id}`,"",header)
}

export const createComment = async(data,header)=>{
    return await commonApi("POST",`${base_url}/createComment`,data,header)
}
export const getComments = async(id)=>{
    return await commonApi("GET",`${base_url}/getComments/${id}`,"")
}
export const searchUser = async(search)=>{
    return await commonApi("GET",`${base_url}/search/${search}`,"")
}

export const getFollowers =async(header)=>{
    return await commonApi("GET",`${base_url}/getFollowers`,"",header)
}
export const getFollowing =async(header)=>{
    return await commonApi("GET",`${base_url}/getFollowing`,"",header)
}
export const getMessages =async(id,header)=>{
    return await commonApi("GET",`${base_url}/getMessages/${id}`,"",header)
}
export const sendMessage =async(id,data,header)=>{
    return await commonApi("POST",`${base_url}/sendMessage/${id}`,data,header)
}




