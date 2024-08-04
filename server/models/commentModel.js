const mongoose =require('mongoose')

const commentScheme = new mongoose.Schema({
    postId:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    message:{
        type:String
    },
    time:{
        type:String
    }
})

const comments=mongoose.model("comments",commentScheme)

module.exports =comments