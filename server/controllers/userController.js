
const users = require('../models/userModel')
const otpVerification = require('../models/otpModel')
const bcrypt = require('bcrypt')
const sendOtpEmail = require('../mail/mail')
const jwt = require('jsonwebtoken')
const posts = require('../models/postModel')


exports.userRegister = async (req, res) => {
    const { username, email, password } = req.body
    const userExists = await users.findOne({ email })
    if (userExists) {
        res.status(406).json("email already registered")
    } else {
        // console.log(username, email, password);
        const hashedPassword = bcrypt.hashSync(password, 10)
        if (username && email && hashedPassword) {
            try {
                const user = new users({ username, password: hashedPassword, email, verified: false })

                const result = await user.save()
                sendOtpEmail(result, res)
            } catch (error) {
                res.status(406).json(error)
            }
        }
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExists = await users.findOne({ email })
        // console.log(userExists);
        if (userExists) {
            if (userExists.verified=="false") {
                sendOtpEmail({email,_id:userExists._id})
                res.status(202).json({user:userExists})
            } else {
                const hashedPassword = bcrypt.compareSync(password, userExists.password)
                if (hashedPassword) {
                    const token = jwt.sign({userId:userExists._id},process.env.secretKey)
                    res.status(200).json({token,userDetails:userExists})
                } else {
                    res.status(406).json("Invaild Password")
                }
            }
        } else {
            res.status(404).json("User Not Found")
        }
    }
    catch (err) {
        res.status(406).json(err)
    }
}



exports.verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body
       
        if (!userId || !otp) {
            res.status(406).json("empty otp")
        }
        else {
            const result = await otpVerification.findOne({ userId })
            console.log(result);
            if (result) {
                const { expiresAt } = result
                const date = new Date()

                if (expiresAt < date) {
                    await otpVerification.deleteMany({ userId })
                    res.status(406).json("code expired")
                } else {
                    const code = await otpVerification.findOne({ otp })
                    if (code) {
                        await users.updateOne({ _id: userId }, { verified: true })
                        await otpVerification.deleteMany({ userId })
                        res.status(200).json("Email verified")
                    } else {
                        res.status(402).json("incorrect otp")

                    }
                }
            } else {
                res.status(406).json("account doesnot exist.plz register")

            }
        }
    } catch (error) {
        res.json({
            status: "failed",
            message: error
        })
    }
}

exports.resendOTP = async (req, res) => {
    const { userId, email } = req.body
    try {
        if (!userId || !email) {
            res.status(406).json("empty email")

        } else {
            await otpVerification.deleteMany({ userId })
            sendOtpEmail({ _id: userId, email }, res)
        }
    } catch (error) {
        res.json({
            status: "failed",
            message: error
        })
    }
}

exports.followAndUnfollow = async (req, res) => {
    try {
        const loggedInUser = req.payload
        const user = req.body._id
        const logUser = await users.findById({ _id: loggedInUser })
        const User = await users.findById({ _id: user })
        if (logUser.following.includes(user)) {
            await users.findOneAndUpdate({ _id: user }, { $pull: { followers: loggedInUser } })
            await users.findOneAndUpdate({ _id: loggedInUser }, { $pull: { following: user } })
            res.json(`you unfollowed ${User.username}`)
        } else {
            await users.findOneAndUpdate({ _id: user }, { $push: { followers: loggedInUser } })
            await users.findOneAndUpdate({ _id: loggedInUser }, { $push: { following: user } })
            res.json(`you started following ${User.username}`)
        }
    } catch (error) {
        console.log(error);
    }
}



exports.getUser = async(req,res)=>{
    const userId =req.payload
    try {
        const result = await users.findOne({_id:userId})
        if (result) {
            console.log(result);
            res.status(200).json(result)
        } else {
            res.status(406).json("no user")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getSpecificUser = async(req,res)=>{
    const {id} =req.params
    
    try {
        const result = await users.findOne({_id:id})
        if (result) {
            
            res.status(200).json(result)
        } else {
            res.status(406).json("no user")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}


exports.getUsers=async(req,res)=>{
    const userId=req.payload
    try {
        
        const result = await users.find({_id:{$ne:userId}})
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(406).json("no user")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.editUser=async(req,res)=>{
    const userId =req.payload
    const username= req.body.username
    const bio=req.body.bio?req.body.bio:""
    const image = req.file ? req.file.filename : req.body.image
    try {
        const result =await users.findByIdAndUpdate({_id:userId},{$set:{bio,image,username}},{new:true})
       
        if (result) {
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(200).json(error)
    }
}
exports.searchUser =async(req,res)=>{
    const {search}=req.params
    try {
        const query = {
            username:{$regex:search,$options:"i"}
        }
        const result = await users.find(query)
        if (result) {
            res.status(200).json(result)
        } else {
            result.status(401).json("no users")
        }
    } catch (error) {
        
    }
}

exports.getFollowers=async(req,res)=>{
    const userId = req.payload
    try {
        const user = await users.findOne({_id:userId})
        const result = await Promise.all(user.followers.map((otherId)=>(
            users.findOne({_id:otherId})
        )))
       
        res.status(200).json(result)
        
    } catch (error) {
        res.status(404).json(error) 
    }
}

exports.getFollowing=async(req,res)=>{
    const userId = req.payload
    try {
        const user = await users.findOne({_id:userId})
        const result = await Promise.all(user.following.map((otherId)=>(
            users.findOne({_id:otherId})
        )))
        res.status(200).json(result)
        
    } catch (error) {
        res.status(404).json(error) 
    }
}