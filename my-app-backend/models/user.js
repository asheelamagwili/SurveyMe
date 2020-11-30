const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        //minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        //minlength: 8,
        maxlength: 1024
    },
    name: {
        type: String,
        //minlength: 5,
    },
    role: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)