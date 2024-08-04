const comments = require('../models/commentModel')
const users =require('../models/userModel')

exports.createComment=async(req,res)=>{
   const userId=req.payload
   const user = await users.findOne({_id:userId})
   const {postId,message}=req.body
   const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const dateTime= now.toLocaleString('en-IN', options);
   try {
    
       const result = new comments({postId,userId,username:user.username,message,time:dateTime})
       await result.save()
       res.status(200).json(result)
   } catch (error) {
        res.status(404).json(error)
   }

}

exports.getComments=async(req,res)=>{
    const {id} = req.params
    try {
        const comment= await comments.find({postId:id}).populate('userId')
       
        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json(error)
    }
}