const express = require('express')
const router = express.Router()
const User = require('../models/user');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// Display profile page
router.get('/profile', async (req, res) => {
    const user_email = req.email
    const user = await User.find(user_email)
    res.render('user/profile', {
        user: user
    })
})

module.exports = router