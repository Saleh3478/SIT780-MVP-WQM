var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var readingRouter = require('./routes/reading');
var collectRouter = require('./routes/collect');
var chartRouter = require('./routes/chartviewer');

var mongo = require('mongodb');

//var url = 'mongodb://mongo:27017/wqmdb'
var url = 'mongodb://admin:admin@172.21.0.2:27017/wqmdb'
//var url = 'mongodb://admin:admin@localhost:27017/wqmdb'
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, client) {
    const db = client.db("wqmdb")
    db.listCollections().toArray(function(err, items) {
           //console.log(items);
           //and u can loop over items to fetch the names
           client.close();
   });
}); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post(function(req, res, next){
  next();
});

app.use('/', indexRouter);
app.use('/showreadings', readingRouter);
app.use('/collectreadings', collectRouter);
app.use('/showcharts', chartRouter);
app.use('/users', usersRouter);
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

module.exports = app;
