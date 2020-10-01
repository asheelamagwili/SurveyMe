const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {loginValidation} = require('../validation');

// Displays the login page
router.get('/login', (req, res) => {
    console.log('Getting login page')
    const message = null
    res.render('auth/login', {message: message})
})

// Post login information to DB
router.post('/login', async (req, res) => {
    console.log('Posting login information')
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