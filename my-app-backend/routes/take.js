const express = require('express')
const router = express.Router()
const Survey = require('../models/survey')

router.get('/', async (req, res) => {
    console.log('Inside the takes GET request');
})

module.exports = router;