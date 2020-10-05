const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation} = require('../validation');
require('dotenv').config();

// Displays the login page
/*router.get('/', (req, res) => {
    console.log('Getting login page');
    const message = null;
    //res.render('auth/login', {message: message});
})*/

// Post login information to DB
router.post('/', async (req, res) => {
    console.log('Posting login information')

    // Validate user data before creating user
    const {error} = loginValidation(req.body);
    console.log('After loginValidation');
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user)
        return res.status(400).send('Email doesn\'t exists');
    console.log('User doesnt exist')
    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
        return res.status(400).send('Invalid password');

    // Create and assign a token - can be used to determine if user is logged in
    const token = jwt.sign(
        {_id: user._id},
        process.env.TOKEN_SECRET,
        {expiresIn: "7d"}
    );
    console.log('Finished authenticating user')

    //res.json({accessToken: token});

    //res.header('auth-token', token).redirect('user/profile');
    //res.redirect('user/profile');
    //console.log(res.getHeaders());
    //return res.send(token);
    //res.setHeader('auth-token', token);
    //console.log(res.getHeaders());

    //res.cookie('token', token, {httpOnly: true});

    // Render profile after authentication
    //res.redirect('user/profile');
})

module.exports = router;