const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    isOpen: Boolean,
    authorID: String,
    startDate: Date,
    endDate: Date,
    survey_pass: String
})

module.exports = mongoose.model('Survey', surveySchema)