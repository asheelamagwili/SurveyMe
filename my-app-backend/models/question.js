const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    survey_id: mongoose.Types.ObjectId,
    question: String,
    answers: [Object]
})

module.exports = mongoose.model('Question', questionSchema)