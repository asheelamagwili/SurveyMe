const jwt = require('jsonwebtoken');
const user = require('../models/user');

// This middleware function can be added to any route we want.
// Checks if user has the required token when the user logs in.
module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //const user_cookie = req.cookies

    console.log('Inside verify tokens')
    if(token == null)
        return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}