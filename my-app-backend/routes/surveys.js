const express = require('express')
const router = express.Router()
const Survey = require('../models/survey')

// All surveys route
router.get('/', async (req, res) => {
    let searchOptions = {}
    // Check if the name given from the search is not null & not empty
    if(req.query.name !== '' && req.query.name != null) {
        // Set as a regex
        // i - case insensitive flag
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        // Gets all the results of the search
        const surveys = await Survey.find(searchOptions)
        /*res.render('surveys/index', {
            surveys: surveys,
            searchOptions: req.query
        })*/
    } catch (err) {
        res.send(err);
        //res.redirect('/')
    }
})

// New survey route
/*router.get('/new', (req,res) => {
    // Creates new Survey object to manipulate the data base
    //res.render('surveys/new', {survey: new Survey()})
})*/

// Create survey route
router.post('/', async (req,res) => {
    const survey = new Survey({
        name: req.body.name
    })

    try {
        // Wait for survey.save() to finish then populate newSurvey
        const newSurvey = await survey.save();
        //res.redirect(`surveys/${newSurvey.id}`)
        //res.redirect(`surveys`)
    } catch (err) {
        /*res.render('surveys/new', {
            survey: survey,
            errorMessage: 'Error creating Survey'
        })*/
    }
})

module.exports = router