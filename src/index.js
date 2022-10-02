const express=require('express')
const route=require('./routers/route')
const app=express()
app.use(express.json());
const { AppConfig } = require('aws-sdk');
const multer=require('multer')
app.use(multer().any())


const mongoose = require("mongoose");
       
    mongoose.connect("mongodb+srv://Bhagaban:L2vSe5ZRZjoVfhOA@cluster0.ojbuh.mongodb.net/Instagram-Clone",{
        useNewUrlParser: true,
    })
    .then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err);
    })

app.use('/',route)
const port=process.env.PORT||8080;
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})