const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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

// Hash user password before saving to DB
userSchema.pre('save', (next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})

module.exports = mongoose.model('User', userSchema)