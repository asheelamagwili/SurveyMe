const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true // Depreciated
    },
    password: {
        type: String,
        //required: true,
        //minlength: 8,
        maxlength: 30
    }

})

module.exports = mongoose.model('User', userSchema)