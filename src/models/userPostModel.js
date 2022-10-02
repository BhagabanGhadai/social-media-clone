const mongoose = require('mongoose');


const { Schema } = mongoose;

const PostSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    text: {
        type: String,
        required:true
    },
    video: {
        type: String
    },
    image: {
        type: String
    },
    HashTags: Array,
    friendTags: Array,
    likes: Array,
    comment: 
        [{
            userId:mongoose.Schema.Types.ObjectId,
            commentBody:String
        }]
    ,
    isDeleted:{
        type:Boolean,
        default:false
    },
    isPublic:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema);