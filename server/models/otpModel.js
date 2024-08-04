const mongoose =require('mongoose')

const otpScheme = new mongoose.Schema({
    userId:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt:Date,
    expiresAt:{
        type:Date
    }
})

const otp = mongoose.model("otp",otpScheme)

module.exports =otp