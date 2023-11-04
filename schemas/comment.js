
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Comment', commentSchema);