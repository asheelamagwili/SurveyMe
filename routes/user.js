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

// Post user credentials and validate
router.post('/', (req, res) => {
    console.log('Validating user information against DB')
    User.authenticate
    const status = User.authenticate.status
    console.log('Status' + status.message)

    if(status == 'error') {
        res.redirect('auth/login', {message: status.message})
    } else {
        res.redirect('surveys/index')
    }
})

module.exports = {
    authenticate: function (req, res, next) {
        User.findOne({email: req.body.email}),
        function(err, userInfo) {
            if (err)
                next(err);
            else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });

                    res.json({status:"success", message: "User Found", data:{user: userInfo, token:token}});
                } else{
                    res.json({status:"error", message: "Invalid password/email", data:null});
                }
            }
        }
    }
}

module.exports = router