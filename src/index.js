const express=require('express')
const app=express()
app.use(express.json());

const mongoose = require("mongoose");
       
    mongoose.connect("mongodb+srv://Bhagaban:L2vSe5ZRZjoVfhOA@cluster0.ojbuh.mongodb.net/Instagram-Clone",{
        useNewUrlParser: true,
    })
    .then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err);
    })


const port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})