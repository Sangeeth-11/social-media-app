const mongoose =require('mongoose')


const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const messages = mongoose.model('messages',messageSchema)

module.exports = messages