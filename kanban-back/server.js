require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 8000;
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const boardRouter = require('./api/routes/board');
const listRouter = require('./api/routes/list');
const cardRouter = require('./api/routes/card');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/board/:boardId/lists/:listId', cardRouter)
app.use('/board/:boardId/lists', listRouter)
app.use('/board', boardRouter)
app.use('/', indexRouter)


app.listen(PORT, console.log(`Server started on port ${PORT}`))