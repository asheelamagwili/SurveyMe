const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

// Display register page
router.get('/register', (req, res) => {
    res.render('auth/register')
})

// Post register information to DB
router.post('/', async (req, res) => {
    // Validate user data before creating user
    const {error} = registerValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists)
        return res.status(400).send('Email already exists');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user and insert to DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.render('user/profile', {user:newUser})
    } catch (err) {
        res.status(400).send(err);
        res.render('auth/register')
    }
})

// Displays the login page
router.get('/login', (req, res) => {
    console.log('Getting login page')
    const message = null
    res.render('auth/login', {message: message})
})

// Post login information to DB
router.post('/', async (req, res) => {
    // Validate user data before creating user
    const {error} = loginValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    // Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user)
        return res.status(400).send('Email doesn\'t exists');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
        return res.status(400).send('Invalid password');

    res.send('Logged in');
})

module.exports = router