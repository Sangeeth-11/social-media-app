const jwt = require('jsonwebtoken')

const jwtmiddle = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        if (token) {
            const result = jwt.verify(token,process.env.secretKey)
            req.payload = result.userId
            req.username = result.username
            next()
        } else {
            res.status(406).json("invalid token")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = jwtmiddle