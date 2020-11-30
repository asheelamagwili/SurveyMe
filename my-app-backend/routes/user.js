const express = require('express');
const user = require('../models/user');
const router = express.Router()
const User = require('../models/user');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');

// Display profile page
router.get('/profile', verify, (req, res) => {
    console.log('Inside GET for profile page');
    // Send and verify the user's tokens
    //res.send(req.user);
    //const current_user = User.findOne({_id: req.user});

    //console.log(current_user);
    // If user is verified - render profile page
    //if(current_user) {
    //    res.render('user/profile', {
    //        user:user
    //    })
    //}
    /*
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authorized) => {
        if(err) {
            console.log('Error');
            res.sendStatus(403);
        } else {
            res.render('user/profile', {
                user:user
            })
        }
    })
    */
})

module.exports = router