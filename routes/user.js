const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Register user route
router.get('/register', (req, res) => {
    res.render('user/register', {user: new User()})
})

// User's profile route
router.get('/profile', (req, res) => {
    res.render('user/profile')
})

// Create profile route
router.post('/', async (req, res) => {

})

module.exports = router