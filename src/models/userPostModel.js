const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    text: {
        type: String
    },
    video: {
        type: String
    },
    image: {
        type: String
    },
    HashTags: Array,
    friendTags: Array,
    like: Array,
    comment: Array
}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema);