const mongoose =require('mongoose')
const connectionString = process.env.Database

mongoose.connect(connectionString).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(err);
    console.log("connection failed");
})