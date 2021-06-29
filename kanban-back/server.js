require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const boardRouter = require('./api/routes/board');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', indexRouter)
app.use('/board', boardRouter)


app.listen(PORT, console.log(`Server started on port ${PORT}`))


/*const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const Board = require('./api/models/boardModel');

const boardRouter = require('./api/routes/board');

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/boards', boardRouter)

app.listen(PORT, console.log(`Server started on port ${PORT}`))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/