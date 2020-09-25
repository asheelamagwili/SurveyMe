const express = require('express');
const user = require('../models/user');
const router = express.Router()
const User = require('../models/user');

// Display register page
router.get('/register', (req, res) => {
    res.render('auth/register')
})

// Post register information to DB
router.post('/', async (req, res) => {
    console.log('Post Email:' + req.body.email)
    console.log('Post Name: ' + req.body.name)
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try {
        console.log('in try{}')
        const newUser = await new User({name, email, password})
        newUser.save()
        console.log('Redirecting...')
        res.render('user/profile', {user:newUser})
    } catch {
        res.render('auth/register')
    }
})

// Displays the login page
router.get('/login', (req, res) => {
    console.log('Getting login page')
    const message = null
    res.render('auth/login', {message: message})
})

// Validate user registration
module.exports = {
    create: function (req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
        function (err, result) {
            if(err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "User added successfully",
                    data: null
                });
        });
    }
}

module.exports = router