const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');

// Display register page
/*router.get('/', (req, res) => {
    console.log('Rendering auth/register')
    res.render('auth/register')
})*/

// Post register information to DB
router.post('/', async (req, res) => {
    console.log('Posting register information')
    // Validate user data before creating user
    const {error} = registerValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    console.log('Passes register validation')

    // Check if user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists)
        return res.status(400).send('Email already exists');
    console.log('Passes user pre-existence check')

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user and insert to DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    console.log('Created new user:' + user)
    const newUser = user;

    try {
        newUser = await user.save();
        console.log('New user created and saved')
        //res.render('user/profile', {user:newUser})
    } catch (err) {
        res.send(err);
        //res.status(400).send(err);
        //res.render('/register')
    }
})

module.exports = router