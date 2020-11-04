const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    survey_id: mongoose.Types.ObjectId,
    survey_title: String,
    question: String,
    answer: String
})

module.exports = mongoose.model('Question', questionSchema)