const mongoose=require('mongoose')

const postScheme = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    caption:{
        type:String
    },
    image:{
        type:String
    },
    like:{
        type:Array,
        default:[]
    },
    time:{
        type:String
    }
},{timestamps:true})

const posts=mongoose.model("posts",postScheme)

module.exports = posts