const mongoose = require('mongoose')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Import routes
const indexRouter = require('./routes/index')
const surveysRouter = require('./routes/surveys')
const userRouter = require('./routes/user')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

dotenv.config();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
//app.set('/views/auth', __dirname + '/auth')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

// Connect to DB
//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
);
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

// Middleware
app.use(express.json());

// Route Middlewares - use routes
app.use('/', indexRouter)
app.use('/surveys', surveysRouter)
app.use('/user', userRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)

// For development default to port 3000
app.listen(process.env.PORT || 3000)