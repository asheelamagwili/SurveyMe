const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        //minlength: 5,
    },
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
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)