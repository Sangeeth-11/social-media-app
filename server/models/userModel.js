

const mongoose = require("mongoose")

const userScheme = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    verified:{
        type:String
    },
    bio:{
        type:String
    },
    following:{
        type:Array
    },
    followers:{
        type:Array
    },
    image:{
        type:String
        
    }
})

const users = mongoose.model('users',userScheme)

module.exports = users