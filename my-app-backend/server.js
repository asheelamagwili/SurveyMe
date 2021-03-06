const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
//const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Import routes
const indexRouter = require('./routes/index')
const surveysRouter = require('./routes/surveys')
const userRouter = require('./routes/user')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const questionRouter = require('./routes/questions')
const takeRouter = require('./routes/take')

dotenv.config();

//app.set('view engine', 'ejs')
//app.set('views', __dirname + '/views')
//app.set('/views/auth', __dirname + '/auth')
//app.set('layout', 'layouts/layout')
//app.use(expressLayouts)
//app.use(express.static('public'))
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

// Route Middlewares - use routes
app.use('/', indexRouter)
app.use('/questions', questionRouter)
app.use('/surveys', surveysRouter)
app.use('/user', userRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/take', takeRouter)

// For development default to port 3000
app.listen(process.env.PORT)
