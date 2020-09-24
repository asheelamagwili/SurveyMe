const express = require('express')
const router = express.Router()
const User = require('../models/user');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// Display profile page
router.get('/profile', async (req, res) => {
    const user_names = req.body.name
    const user_emails = req.body.email
    const users = await User.find(user_names, user_emails)
    res.render('user/profile', {
        users: users
    })
})

module.exports = router