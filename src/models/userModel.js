const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    mobile: {
        type: Number,
        unique: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    posts: Array,
    followers: Array,
    following: Array,
    blockuser: Array

}, { timestamps: true })
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {model:'user',field:'userId'});

module.exports = mongoose.model('user', userSchema)