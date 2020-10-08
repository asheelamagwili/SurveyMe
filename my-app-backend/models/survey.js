const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    isOpen: Boolean,
    startDate: Date,
    endDate: Date
})

module.exports = mongoose.model('Survey', surveySchema)