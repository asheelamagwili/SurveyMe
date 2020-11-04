const express = require('express')
const router = express.Router()
const Questions = require('../models/question')


// Getting current questions
router.get('/', async(req, res) => {
    console.log('Inside GET request for questions to survey')
    console.log(req.body);

    // Find all questions belonging to current survey
    const all_questions = await Questions.find({survey_id: req.body.id})
    console.log('FOUND THE FOLLOWING QUESTIONS: ');
    console.log(all_questions);
    res.json(all_questions);
})

// Adding questions to survey
router.post('/', async(req,res) => {
    console.log('Inside POST request for adding questions to survey')
    console.log(req.body);

    try {
        // Save new question to DB
        const new_question = new Questions({
            survey_id: req.body.survey_id,
            survey_title: req.body.survey_title,
            question: req.body.question,
            answer: req.body.answer
        });
        await new_question.save();

        console.log('Created new Question: ');
        console.log(new_question);

        // Return updated questions

        // Find all questions belonging to current survey
        const all_questions = await Questions.find({survey_id: req.body.id});
        res.json(all_questions);

    } catch(error) {
        console.log("Error: " + error);
    }
})

module.exports = router