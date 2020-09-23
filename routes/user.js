const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const user = require('../models/user');

// Display register page
router.get('/register', (req, res) => {
    res.render('user/register')
})

// Display profile page
/*router.get('/profile', (req, res) => {
    res.render('user/profile')
})*/

// Send register information to DB
router.post('/', async (req, res) => {
    console.log('Post Name: ' + req.body.name)
    console.log('Post Email: ' + req.body.email)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        console.log('Inside try{}')
        const newUser = await user.save()
        res.redirect('user/profile')
    } catch {
        console.log(newUser)
        console.log('Inside catch{}')
        res.render('user/register')
    }
    //res.redirect('profile')
})

// Test to see if names and emails saved to DB
router.get('/profile', async (req, res) => {
    console.log('Get Name: ' + req.body.name)
    console.log('Get Email: ' + req.body.email)
    const user_names = req.body.name
    const user_emails = req.body.email
    const users = await User.find(user_names, user_emails)
    res.render('user/profile', {
        users: users
    })
})

module.exports = router