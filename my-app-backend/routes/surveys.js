const express = require('express')
const router = express.Router()
const Survey = require('../models/survey')

// All surveys route
router.get('/', async (req, res) => {
    console.log('Inside the surveys GET request');
    console.log('Searching for: ' + req.query);
    let searchOptions = {}
    // Check if the name given from the search is not null & not empty
    if(req.query.title !== '' && req.query.title != null) {
        // Set as a regex
        // i - case insensitive flag
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        // Gets all the results of the search
        //const surveys = await Survey.find(searchOptions)
        const surveys = await Survey.find({})
        res.json(surveys);
        console.log('After attempting to find survey')
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
router.post('/new', async (req,res) => {
    console.log('Inside POST request for creating new survey');
    const survey = new Survey({
        title: req.body.title,
        description: req.body.description,
        isOpen: req.body.isOpen,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    const newSurvey = survey;

    try {
        // Wait for survey.save() to finish then populate newSurvey
        await newSurvey.save();
        console.log('Saved new survey');
    } catch (err) {
        /*res.render('surveys/new', {
            survey: survey,
            errorMessage: 'Error creating Survey'
        })*/
    }
})

module.exports = router