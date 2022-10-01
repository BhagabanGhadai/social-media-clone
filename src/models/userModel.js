const mongoose=require('mongoose')
const autoIncrement=require('mongoose-auto-increment')
 
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
    minlength:8,
    maxlength:15
},
email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
},
User_name:{
    type:String,
    unique:true,
    required:true
},
Gender:{
    type:String,
    enum:['male','female','other']
},
mobile:{
    type:Number,
    unique:true
},
isPublic:{
    type:Boolean,
    default:true
},
posts: Array,
followers: Array,
following: Array,
BlockUser:Array

},{timestamps:true})
userSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'user_id',startAt: 1000,incrementBy: 1 })
module.exports=mongoose.model('user',userSchema)