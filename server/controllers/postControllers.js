const posts = require('../models/postModel')
const users = require('../models/userModel')

exports.createPost = async (req, res) => {
    const { caption } = req.body
    const image = req.file.filename
    const userId = req.payload
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const dateTime= now.toLocaleString('en-IN', options);
    if (!caption || !image) {
        res.status(406).json("empty")
    } else {
        const newPost = new posts({ userId, caption, image,time:dateTime })
        await newPost.save()
        res.status(200).json("success")

    }

}

exports.getUserPosts = async (req, res) => {
    try {
        
        const userId = req.payload
        const result = await posts.find({ userId: userId }).populate('userId')
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(406).json("no post")

        }
    } catch (error) {
        res.status(404).json(error)
    }
}
exports.getSpecificUserPosts = async (req, res) => {
    try {
        
        const {id} = req.params
        const result = await posts.find({ userId: id })
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(406).json("no post")

        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.editPost = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    // const username = req.username
    const { caption } = req.body
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const dateTime= now.toLocaleString('en-IN', options);
    const image = req.file ? req.file.filename : req.body.image
    try {

        const result = await posts.findByIdAndUpdate({ _id: id }, { caption, image, userId,time:dateTime }, { new: true })
        if (result) {
            res.status(200).json("updated")
        }
        else {
            res.status(406).json("failed")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
exports.deletePost = async (req, res) => {
    const { id } = req.params
    try {

        const result = await posts.findByIdAndDelete({ _id: id })
        if (result) {
            res.status(200).json("deleted")
        }
        else {
            res.status(406).json("failed")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const result = await posts.find()
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(406).json("NO posts")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getFollowingPosts = async (req, res) => {
    try {
        const userId = req.payload
        const loggedInUser = await users.findOne({ _id: userId })
        const loggedInUserPosts = await posts.find({ userId }).populate('userId')
        const FollowingUsers = await Promise.all(loggedInUser.following.map((otherUserId) => (
            posts.find({ userId: otherUserId }).populate('userId')
        )))
        res.status(200).json({ posts: loggedInUserPosts.concat(...FollowingUsers) })
    } catch (error) {
        res.status(404).json(error)
    }

}

exports.likeAndUnlike = async (req, res) => {
    try {
        const userId = req.payload
        const {id} = req.params
        const specificPost = await posts.findById({ _id: id })
        if (specificPost.like.includes(userId)) {
            const result=await posts.findOneAndUpdate({ _id: id }, { $pull: { like: userId } })
            res.status(200).json(result)
        } else {
           const result= await posts.findOneAndUpdate({ _id: id }, { $push: { like: userId } })
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(404).json(error)
    }

}