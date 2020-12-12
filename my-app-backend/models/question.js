const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    survey_id: String,
    survey_title: String,
    question: String,
    answers: [{
        user_id: String,
        user_answer: String
    }]
})

module.exports = mongoose.model('Question', questionSchema)