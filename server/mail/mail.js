const mailer = require('nodemailer')
const otpVerification = require('../models/otpModel')

const transporter = mailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:456,
    secure:true,
    auth:{
        user:process.env.email,
        pass:process.env.emailpass
    }
})

const sendOtpEmail = async(data,res)=>{
    try {
        const otpCode = `${Math.floor(Math.random()*10000)}`
        console.log(otpCode);
        const {_id,email}=data

        const mailoptions={
            from:process.env.email,
            to:email,
            subject:"Email verification",
            text:`This is your otp ${otpCode}`
        }
        const new_otp=new otpVerification({
            userId:_id,
            otp:otpCode,
            createdAt:Date.now(),
            expiresAt:Date.now()+(60*1000*5)
        })
        await new_otp.save()
        await transporter.sendMail(mailoptions)
        res.status(200).json({"message":
            "otp sent to email for verification","value":data})
    } catch (error) {
        console.log(error);
    }
}

module.exports =sendOtpEmail