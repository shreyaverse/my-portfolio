const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    author: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
        required: true,
        unique: true
    },

    file: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Posts', PostSchema);
