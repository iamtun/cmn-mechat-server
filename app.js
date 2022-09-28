const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const userRoute = require('./routes/userRouter');
const conversationRouter = require('./routes/conversationRouter')
const acountRoute = require('./routes/acountRouter')
const friendRequestRouter = require('./routes/friendRequestRouter')
const friendRouter = require('./routes/friendRouter')
const messageRouter = require('./routes/messageRouter')

const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();


app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/messages', messageRouter);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;