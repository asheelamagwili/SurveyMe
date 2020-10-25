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
        //searchOptions.name = 'Survey';
    }

    try {
        // Gets all the results of the search
        //const surveys = await Survey.find(searchOptions)
        const surveys = await Survey.find({})
        console.log('First survey from GET call: ' + surveys[0].title);
        res.json(surveys);
        console.log('After attempting to find survey')
    } catch (err) {
        res.send(err);
        //res.redirect('/')
    }
})

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
        console.log('Saved new survey: ' + newSurvey.title);
    } catch (err) {
        console.log("Error: " + err);
    }
})

// Getting current questions
router.get('/questions', async(req, res) => {
    console.log('Inside GET request for questions to survey')

    const questions = [];

    //const curSurvey = Survey.findById(req.body)
})

// Adding questions to survey
router.post('/questions', async(req,res) => {
    console.log('Inside POST request for adding questions to survey')

    const cur_survey = await Survey.findById(req.body.id);
    //res.json('Hey from the backend! (:')
})

module.exports = router