require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/routes')
require('./database/db')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use('/uploads',express.static('./uploads'))
app.get('/',(req,res)=>{
    res.send("hi")
})
app.listen(3000,()=>{
    console.log("running at port 3000");
})