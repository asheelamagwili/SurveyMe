// Routes Controller

const express = require('express')
const router = express.Router()

// Root of application
router.get('/', (req, res) => {
    console.log('Getting index')
    //res.render('index')
})

module.exports = router