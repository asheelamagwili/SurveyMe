const express = require('express');
const router = express.Router()
const User = require('../models/user');

// Display register page
router.get('/register', (req, res) => {
    res.render('auth/register')
})

// Post register information to DB
router.post('/', async (req, res) => {
    try {
        User.create
        res.redirect('user/profile')
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

// Post user credentials and validate
router.post('/', (req, res) => {
    console.log('Validating user information against DB')
    User.authenticate
    const status = User.authenticate.status
    console.log(status.message)

    if(status == 'error') {
        res.redirect('auth/login', {message: status.message})
    } else {
        res.redirect('surveys/index')
    }
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
    },

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