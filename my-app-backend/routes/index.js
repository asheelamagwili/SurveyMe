// Routes Controller

const express = require('express')
const router = express.Router()

// Root of application
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router