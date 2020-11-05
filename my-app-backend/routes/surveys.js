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

router.put('/', async(req, res) => {
    console.log('-----> PUT: Update survey status to open')
    console.log(req.body.id);

    if(req.body.action == 'open') {
        // Changes the status of the survey to open
        Survey.findByIdAndUpdate(
            {_id: req.body.id}, 
            {isOpen: true},
            function (error, result) {
                if(error) {
                    res.send(error);
                }
                else {
                    res.json(result);
                }
            }
        );
    }

    else {
        // Changes the status of the survey to close
        Survey.findByIdAndUpdate(
            {_id: req.body.id}, 
            {isOpen: false},
            function (error, result) {
                if(error) {
                    res.send(error);
                }
                else {
                    res.json(result);
                }
            }
        );
    }

    // Check if isOpen was updated
    console.log('Found survey: ');
    const cur_survey = Survey.findById(
        req.body.id,
        function (error, result) {
            if(error)
                console.log(error);
            else
                console.log(result);
        }
    );
})

/*
// Getting current questions
router.get('/questions', async(req, res) => {
    console.log('Inside GET request for questions to survey')
    console.log(req.body);

    // Find all questions belonging to current survey
    const all_questions = await Questions.find({survey_id: req.body.id})
    console.log('FOUND THE FOLLOWING QUESTIONS: ');
    console.log(all_questions);
    res.json(all_questions);
})

// Adding questions to survey
router.post('/questions', async(req,res) => {
    console.log('Inside POST request for adding questions to survey')
    console.log(req.body);

    try {
        // Find the survey to edit
        const cur_survey = await Survey.findById(req.body.survey_id);

        // Save new question to DB
        const new_question = new Questions({
            survey_id: req.body.survey_id,
            survey_title: req.body.survey_title,
            question: req.body.question,
            answer: req.body.answer
        });
        await new_question.save();

        // Return updated questions

        // Find all questions belonging to current survey
        const all_questions = await Questions.find({survey_id: req.body.id});
        res.json(all_questions);

    } catch(error) {
        console.log("Error: " + error);
    }
})
*/
module.exports = router