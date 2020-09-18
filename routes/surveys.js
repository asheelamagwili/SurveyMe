const express = require('express')
const survey = require('../models/survey')
const router = express.Router()
const Survey = require('../models/survey')

// All surveys route
router.get('/', (req, res) => {
    res.render('surveys/index')
})

// New survey route
router.get('/new', (req,res) => {
    // Creates new Survey object to manipulate the data base
    res.render('surveys/new', {survey: new Survey()})
})

// Create survey route
router.post('/', (req,res) => {
    const survey = new Survey({
        name: req.body.name
    })
    survey.save((err, newSurvey) => {
        if(err) {
            res.render('surveys/new', {
                survey: survey,
                errorMessage: 'Error creating survey'
            })
        }
        else {
            //res.redirect(`surveys/${newSurvey.id}`)
            res.redirect(`surveys`)
        }
    })
})

module.exports = router