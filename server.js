// Make sure that dev environment only loads in dev environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// Import routes
const indexRouter = require('./routes/index')
const surveysRouter = require('./routes/surveys')
const userRouter = require('./routes/user')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

// Use routes/
app.use('/', indexRouter)
app.use('/surveys', surveysRouter)
app.use('/user', userRouter)

// For development default to port 3000
app.listen(process.env.PORT || 3000)