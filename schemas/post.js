const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);