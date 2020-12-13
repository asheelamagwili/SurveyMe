const express = require('express')
const { findByIdAndUpdate } = require('../models/question')
const router = express.Router()
const Questions = require('../models/question')


// Getting current questions
router.get('/', async(req, res) => {
    console.log('Inside GET request for questions to survey')
    console.log(req.body);

    // Find all questions belonging to current survey
    try {
        const all_questions = await Questions.find({})
        console.log('FOUND THE FOLLOWING QUESTIONS: ');
        console.log(all_questions);
        res.json(all_questions);
    } catch(err) {
        console.log('Error: ' + err);
    }
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

// Delete questions from the DB
router.put('/', async (req, res) => {
    console.log('-----> PUT: Deleting a question from the DB');
    console.log(req.body.id);

    Questions.findByIdAndDelete(
        req.body.id,
        function (error, result) {
            if(error)
                console.log('Error: ' + error);
            else
                console.log('Deleted: ' + result);
        }
    );
})

// Add answers to a question
router.put('/answer', async (req, res) => {
    // Takes in an array of objects that contains:
    //      user_id (id of the person who answered the question), 
    //      user_answer (user's answer),
    //      question_id (id of the question to edit)
    console.log('-----> PUT: Adding an answer to a question');
    const new_answers = req.body;

    console.log(new_answers);

    let update_result;
    for(var i = 0;i < new_answers.length;i++) {
        // Find and update the question with the new answer
        Questions.updateOne(
            {_id: new_answers[i].question_id},
            // Add the answer object to the array
            {$push: {
                "answers": {
                    user_id: new_answers[i].user_id, 
                    user_answer: new_answers[i].user_answer
                }
            }},
            // Return the error or the success result
            function(error, result) {
                if(error)
                    res.send(error);
                else {
                    update_result = result;
                }
            }
        );
    }

    res.json(update_result);
})

module.exports = router