const conversations = require('../models/conversationModel')
const messages = require('../models/messageModel')

exports.sendMessage = async (req, res) => {
    const senderId = req.payload
    const receiverId = req.params.id
    const { message } = req.body
    
    try {
        let conversation = await conversations.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = new conversations({ participants: [senderId, receiverId] })
        }
        const newMessage = new messages({
            senderId, receiverId, message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([newMessage.save(), conversation.save()])
        res.status(200).json("Messages Created successfully")
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getMessages = async (req, res) => {
    const senderId = req.payload
    const receiverId = req.params.id
   
    try {
        let conversation = await conversations.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages')
        if (!conversation) {
          return res.status(200).json([])
        }
        res.status(200).json(conversation.messages)
        
    } catch (error) {
        res.status(404).json(error)
    }
}