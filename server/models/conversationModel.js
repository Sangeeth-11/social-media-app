const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages',
        default:[]
    }]
},{timestamps:true})

const conversations = mongoose.model('conversations',conversationSchema)

module.exports = conversations